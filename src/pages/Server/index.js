import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { withSize } from 'react-sizeme';
import PropTypes from 'prop-types';
import Plot from '../../components/Plot';
import Table from '../../components/Table';
import {
  getPartitionsByServer,
  getSizeByServerAndPartitionAndPeriod,
} from '../../services/api';
import { megabytesToSize } from '../../services/math';

function Server({ setTitle, size }) {
  const [period, setPeriod] = useState(6);
  const [plotData, setPlotData] = useState({ x: [], y: [] });
  const [partitions, setPartitions] = useState([]);
  const [selectedPartition, setSelectedPartition] = useState('');
  const { server } = useParams();

  const columns = [
    {
      name: 'server',
      title: 'Server',
    },
    {
      name: 'description',
      title: 'Description',
    },
    {
      name: 'filesystem',
      title: 'Filesystem',
    },
    {
      name: 'mountpoint',
      title: 'Mountpoint',
    },
    {
      name: 'size',
      title: 'Size',
      customElement: row => megabytesToSize(row.size),
    },
    {
      name: 'available',
      title: 'Available',
      customElement: row => megabytesToSize(row.available),
    },
    {
      name: 'use',
      title: 'Used',
      customElement: row => megabytesToSize(row.use),
    },
    {
      name: 'usepercent',
      title: '% Used',
      align: 'center',
    },
  ];

  useEffect(() => {
    setTitle(server);
    setPartitions([]);
  }, [server, setTitle]);

  useEffect(() => {
    // If is the first page load or if the route was changed through the drawer:
    if (partitions.length === 0) {
      getPartitionsByServer(server).then(res => {
        setSelectedPartition(res[0].mountpoint);
        setPartitions(res);
      });
    }
  }, [server, partitions]);

  useEffect(() => {
    let startDate = moment();
    const endDate = moment().format('YYYY-MM-DD');
    let isToday = false;

    if (period === 0) {
      isToday = true;
    } else if (period === 0.25) {
      startDate = startDate.subtract(7, 'days').format('YYYY-MM-DD');
    } else {
      startDate = startDate.subtract(period, 'months').format('YYYY-MM-DD');
    }

    getSizeByServerAndPartitionAndPeriod({
      server,
      partition: selectedPartition,
      startDate,
      endDate,
      isToday,
    }).then(res => {
      if (res.data.length > 0) {
        const xAxis = [];
        const yAxis = [];

        res.data.forEach(row => {
          xAxis.push(row.date);
          yAxis.push(row.use / 1048576);
        });

        setPlotData({
          x: xAxis,
          y: yAxis,
        });
      }
    });
  }, [server, selectedPartition, period]);

  const handlePeriodChange = e => setPeriod(Number(e.target.value));

  const handlePartitionChange = e => setSelectedPartition(e.target.value);

  return (
    <Grid container spacing={3}>
      <Grid item>
        <FormControl>
          <InputLabel>Partition</InputLabel>
          <Select value={selectedPartition} onChange={handlePartitionChange}>
            {partitions.map(partition => (
              <MenuItem key={partition.mountpoint} value={partition.mountpoint}>
                {partition.mountpoint}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel>Period</InputLabel>
          <Select value={period} onChange={handlePeriodChange}>
            <MenuItem value={0}>Today</MenuItem>
            <MenuItem value={0.25}>Last Week</MenuItem>
            <MenuItem value={1}>Last Month</MenuItem>
            <MenuItem value={6}>Last Six Months</MenuItem>
            <MenuItem value={12}>Last Year</MenuItem>
            <MenuItem value={24}>Last Two Years</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Plot data={plotData} width={size.width} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <span>
                {server} - {selectedPartition}
              </span>
            }
          />
          <CardContent>
            <Table
              columns={columns}
              data={partitions.filter(
                partition => partition.mountpoint === selectedPartition
              )}
              totalCount={1}
              remote={false}
              hasSearching={false}
              hasSorting={false}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

Server.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  setTitle: PropTypes.func.isRequired,
};

export default withSize()(Server);
