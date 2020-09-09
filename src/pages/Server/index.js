// eslint-disable-file react-hooks/exhaustive-dep
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
  IconButton,
  Button,
  Fade,
  CircularProgress,
} from '@material-ui/core';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import LinePlot from '../../components/Plot/LinePlot';
// import LinePlotDiff from '../../components/Plot/LinePlotDiff';
import Table from '../../components/Table';
import {
  getServerHistoryByName,
  getPartitionsByServer,
  getHistoryByServerAndPartitionAndPeriod,
} from '../../services/api';
import { megabytesToSize, megabytesToTerabytesGraph, remainderPercentage } from '../../services/math';
import BarChartIcon from '@material-ui/icons/BarChart';
import DucDialog from '../Duc/dialog';
import styles from './styles';

function Server({ setTitle }) {
  const classes = styles();
  const [loading, setLoading] = React.useState(true);
  const [period, setPeriod] = useState(1);
  const [plotDataDisk, setPlotDataDisk] = useState({ x: [], y: [] });
  const [plotData, setPlotData] = useState({ x: [], y: [] });
  const [partitions, setPartitions] = useState([]);
  const [selectedPartition, setSelectedPartition] = useState('all');
  const { server } = useParams();
  const [open, setOpen] = useState(false);
  const [currentPartition, setCurrentPartition] = useState('');
  const [dateRange, setDateRange] = useState([ null, null]);

  const rowDucGraph = (row) => {
    if (server !== 'desdb4' && server !== 'desdb6') {
      return (
        <IconButton
          color="inherit"
          aria-label="Detailed version"
          component="span"
          onClick={()=>{
            setOpen(true);
            setCurrentPartition(row);
          }}
        >
          <BarChartIcon />
        </IconButton>
      )
    } else {
      return '-'
    }
  }

  const mountpointCustom = (row) => {
    return (
      <Button
        color="secondary"
        variant="text"
        onClick={()=>{
          setSelectedPartition(row.mountpoint)
        }}>
          {row.mountpoint}
      </Button>
    )
  }

  const columns = [
    {
      name: 'description',
      title: 'Description',
      width: '200px',
    },
    {
      name: 'mountpoint',
      title: 'Mountpoint',
      customElement: row => mountpointCustom(row),
      width: '200px',
    },
    {
      name: 'size',
      title: 'Size',
      customElement: row => megabytesToSize(row.size),
      width: '70px',
    },
    {
      name: 'use',
      title: 'Used',
      customElement: row => megabytesToSize(row.use),
      width: '70px',
    },
    {
      name: 'available',
      title: 'Available',
      customElement: row => megabytesToSize(row.available),
      width: '70px',
    },
    {
      name: 'usepercent',
      title: '% Used',
      align: 'center',
      width: '70px',
    },
    {
      name: 'availablepercent',
      title: '% Available',
      align: 'center',
      width: '70px',
    },
    // {
    //   name: 'server',
    //   title: 'Detailed version',
    //   customElement: row => rowDucGraph(row),
    //   width: '70px',
    //   sortingEnable: false,
    //   align: 'center,'
    // },
  ];

  const completeDatePartition = (serverName, partitions) => {
    let all = {
      description: serverName,
      mountpoint: 'all',
      filesystem: serverName,
      server: serverName,
      size: 0,
      available: 0,
      use: 0,
    }
    partitions.map((partition, index) =>{
      console.log(partition); 
      all.size += parseInt(partition.size);
      all.use += parseInt(partition.use);
      if (partitions.length === index+1) {
        all.available = all.size - all.use;
        let usepercent = (all.use/all.size * 100).toFixed(0) +'%';
        all.usepercent = usepercent;
        all.availablepercent = remainderPercentage(usepercent);
        console.log(all);
      }
    })
    return all;
  }

  useEffect(() => {
    setLoading(true);
    setPartitions([]);
    setPlotDataDisk({ x: [], y: [] });
    setPlotData({ x: [], y: [] });

    setTitle(server);
    getPartitionsByServer(server).then(res => {
      let partitionAll = completeDatePartition(server, res);
      setLoading(false);
      setSelectedPartition('all');
      console.log(partitionAll);
      setPartitions([partitionAll].concat(res.map(function(row) {
        row.availablepercent = remainderPercentage(row.usepercent);
        return row;
      })));
    });
    setPeriod(1);
  }, [server, setTitle]);

  useEffect(() =>{
    let startDate = moment();
    let endDate = moment().format('YYYY-MM-DD HH:mm:ss');
    if (period < 0.1) {
      setPeriod(0);
      startDate = moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss');
      endDate = moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss');
    } else if (period === 0.25) {
      startDate = startDate.subtract(7, 'days').format('YYYY-MM-DD');
    } else {
      startDate = startDate.subtract(period, 'months').format('YYYY-MM-DD');
    }
    setDateRange([ new Date(startDate), new Date(endDate) ]);
  },[period])


  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      const startDate = moment(dateRange[0]).format('YYYY-MM-DD');
      const endDate = moment(dateRange[1]).format('YYYY-MM-DD');

      getHistoryByServerAndPartitionAndPeriod({
          server,
          partition: selectedPartition,
          startDate: startDate,
          endDate: endDate,
        }).then(res => {
          let xAxis = [];
          let yAxis = [];
          res.data.forEach(row => {
            xAxis.push(row.date);
            yAxis.push(megabytesToTerabytesGraph(parseInt(row.total_use) || row.use));
            if(res.data.length === 1) {
              xAxis.push(startDate);
              yAxis.push(megabytesToTerabytesGraph(parseInt(row.total_use) || row.use));
            }
          });
          setPlotData({
            x: xAxis,
            y: yAxis,
          });
            let sizeDisk = 0;
            // If there's no partition selected, set the total server size:
            if(selectedPartition === 'all') {
              sizeDisk = res.data.length > 0 ? megabytesToTerabytesGraph(res.data[0].total_size) : 0;
              // If there's a partition selected, then set the selected partition size:
            } else {
              // Filter the selected partition to get its size:
              const selectedPartitionSize = partitions.filter(p => p.mountpoint === selectedPartition)[0].size || 0;
              sizeDisk = megabytesToTerabytesGraph(parseInt(selectedPartitionSize))
            }
            setPlotDataDisk({
              x: [startDate,endDate],
              y: [sizeDisk, sizeDisk],
            });
        });
    }
  }, [server, dateRange, selectedPartition])


  const handlePeriodChange = e => {
    if(Number(e.target.value) !== period) {
      setPeriod(Number(e.target.value))
    }
  };

  return (
    <>
      <Fade
          className={classes.spin}
            in={loading}
            style={{
              transitionDelay: loading ? '800ms' : '0ms',
            }}
            unmountOnExit
          >
            <CircularProgress />
      </Fade>
      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={6}>
          <Card style={{ height: '100%' }}>
            <CardHeader
              title={
                <span>
                  Partitions
                </span>
              }
            />
            <CardContent>
              <Table
                columns={columns}
                data={partitions}
                totalCount={1}
                remote={false}
                hasSearching={false}
                defaultSorting={[{
                  columnName: 'mountpoint',
                  direction: 'asc',
                }]}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardHeader
              title={
                <span>
                  Use
                </span>
              }
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <FormControl>
                    <InputLabel>Period</InputLabel>
                    <Select value={period} onChange={handlePeriodChange}>
                      <MenuItem value={0.25}>Last Week</MenuItem>
                      <MenuItem value={1}>Last Month</MenuItem>
                      <MenuItem value={6}>Last Six Months</MenuItem>
                      <MenuItem value={12}>Last Year</MenuItem>
                      <MenuItem value={24}>Last Two Years</MenuItem>
                      <MenuItem value={0}>Customized</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                </Grid>
              </Grid>
              <LinePlot data={plotData} dataDisk={plotDataDisk} width={800} />
              { server.toUpperCase().includes('MS0') ? (
                <Button variant="contained" color="primary" onClick={() => {           
                  setOpen(true);
                  setCurrentPartition(server);
                }}>
                Detailed Vision
              </Button> ) : "" }
            </CardContent>
          </Card>
        </Grid>

      </Grid>
      <DucDialog open={open} setOpen={setOpen} partition={currentPartition} />
    </>
  );
}

Server.propTypes = {
  setTitle: PropTypes.func.isRequired,
};

export default Server;
