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
import Plot from '../../components/Plot';
import Table from '../../components/Table';
import { getHistoryByServer, getSizeByServerAndPeriod } from '../../services/api';
import { megabytesToSize } from '../../services/math';

function Server() {
  const [history, setHistory] = useState([]);
  const [defaultExpandedGroups, setDefaultExpandedGroups] = useState([]);
  const [period, setPeriod] = useState(6);
  const [plotData, setPlotData] = useState({ x: [], y: [] });
  const { server } = useParams();

  useEffect(() => {
    getHistoryByServer(server)
      .then((res) => setHistory(res));
  }, [server]);

  useEffect(() => {
    let startDate = moment();

    if (period === 0) {
      startDate = startDate.subtract(7, 'days').format('DD-MM-YYYY');
    } else {
      startDate = startDate.subtract(period, 'months').format('DD-MM-YYYY');
    }

    const endDate = moment().format('DD-MM-YYYY');

    getSizeByServerAndPeriod({ server, startDate, endDate })
      .then((res) => {
        if (res.length > 0) {
          setPlotData({
            x: res.map((row) => row.date),
            y: res.map((row) => row.size),
          });
        }
      });
  }, [period]);

  useEffect(() => {
    if (history.length > 0) {
      const keys = history
        .map((obj) => obj.server)
        .filter((el, i, arr) => arr.indexOf(el) === i);

      setDefaultExpandedGroups(keys);
    }
  }, [history]);

  const columns = [
    {
      name: 'available',
      title: 'Available',
    },
    {
      name: 'date',
      title: 'Date',
      customElement: (row) => (
        <span title={row.date.split(' ')[1]}>
          {row.date.split(' ')[0]}
        </span>
      ),
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
      name: 'server',
      title: 'Server',
    },
    {
      name: 'size',
      title: 'Size',
      customElement: (row) => megabytesToSize(row.size),
    },
    {
      name: 'use',
      title: 'Use',
      customElement: (row) => megabytesToSize(row.use),
    },
    {
      name: 'usepercent',
      title: '% Use',
      align: 'center',
    },
  ];

  const handlePeriodChange = (e) => setPeriod(Number(e.target.value));

  return (
    <Grid container spacing={3} justify="center">
      <Grid item xs={12}>
        <FormControl>
          <InputLabel>Period</InputLabel>
          <Select
            value={period}
            onChange={handlePeriodChange}

          >
            <MenuItem value={0}>Last Week</MenuItem>
            <MenuItem value={1}>Last Month</MenuItem>
            <MenuItem value={6}>Last Six Months</MenuItem>
            <MenuItem value={12}>Last Year</MenuItem>
            <MenuItem value={24}>Last Two Years</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Plot data={[{ ...plotData, type: 'bar' }]} />
      </Grid>
      <Grid item xs={12}>
        {defaultExpandedGroups.length > 0 ? (
          <Card>
            <CardHeader
              title={(
                <span>{server}</span>
            )}
            />
            <CardContent>
              <Table
                columns={columns}
                data={history}
                totalCount={history.length}
                hasSearching={false}
                remote={false}
              />
            </CardContent>
          </Card>
        ) : null}
      </Grid>
    </Grid>
  );
}

export default Server;
