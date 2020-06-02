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
  Link 
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
import BarChartIcon from '@material-ui/icons/BarChart';
import DucDialog from '../Duc/dialog';
import styles from './styles';
import BasicDatePicker from '../../components/BasicDatePicker';

function Server({ setTitle, size }) {
  const classes = styles();
  const [period, setPeriod] = useState(6);
  const [plotDataDisk, setPlotDataDisk] = useState({ x: [], y: [] });
  const [plotData, setPlotData] = useState({ x: [], y: [] });
  const [partitions, setPartitions] = useState([]);
  const [selectedPartition, setSelectedPartition] = useState('all');
  const { server } = useParams();
  const [open, setOpen] = useState(false);
  const [currentPartition, setCurrentPartition] = useState({ server: '', mountpoint: '' });
  const [dateRange, setDateRange] = useState({
    to: undefined,
    from: undefined,
  });

  const rowDucGraph = (row) => {
    return (
      <div className={classes.centralizarIcon}>
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
      </div>
    )
  }

  const mountpointCustom = (row) => {
    return (
      <div className={classes.centralizarIcon}>
        <Link
        className={classes.link}
        onClick={()=>{
          setSelectedPartition(row.mountpoint)
        }}>
          {row.mountpoint}
        </Link>
      </div>
    )
  }

  const columns = [
    {
      name: 'description',
      title: 'Description',
      width: '180px',
    },
    {
      name: 'mountpoint',
      title: 'Mountpoint',
      customElement: row => mountpointCustom(row),
      width: '150px',
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
    {
      name: 'server',
      title: 'Detailed version',
      customElement: row => rowDucGraph(row),
      width: '70px',
    },
  ];

  useEffect(() => {
    setTitle(server);
    setPartitions([]);
  }, [server, setTitle]);

  useEffect(() => {
    // If is the first page load or if the route was changed through the drawer:
    if (partitions.length === 0) {
      let partitionAll = {
        description: server,
        mountpoint: 'all',
        filesystem: server,
        server: server,
        size: 0,
        available: 0,
        use: 0,
      };
      getPartitionsByServer(server).then(res => {
        setSelectedPartition('all');        
        setPartitions([partitionAll].concat(res.map(function(row) {
          row.availablepercent = 100-parseInt(row.usepercent.split("%")) + '%';
          return row;
        })));

      });
    }
  }, [server, partitions]);

  useEffect(() => {
    let startDate = moment();
    let endDate = moment().format('YYYY-MM-DD HH:mm:ss');
    let isToday = false;

    if (period < 0.1) {
      setPeriod(0);
      startDate = moment(dateRange.from).format('YYYY-MM-DD HH:mm:ss');
      endDate = moment(dateRange.to).format('YYYY-MM-DD HH:mm:ss');
    } else if (period === 0.25) {
      startDate = startDate.subtract(7, 'days').format('YYYY-MM-DD');
    } else {
      startDate = startDate.subtract(period, 'months').format('YYYY-MM-DD');
    }
    setDateRange({ from: new Date(startDate), to: new Date(endDate) });

    getSizeByServerAndPartitionAndPeriod({
      server,
      partition: selectedPartition,
      startDate,
      endDate,
      isToday,
    }).then(res => {   
      let sizeDisk = 0;
      if (partitions[0]) {
        partitions[0].size = 0;
        partitions[0].use = 0;
        partitions[0].available = 0;
      }
      partitions.map(function(partition) {
        console.log(partition);
        
        if ( selectedPartition === 'all' || (selectedPartition !== 'all' && partition.mountpoint === selectedPartition)) {
          sizeDisk += (partition.size / 1048576);
          setPlotDataDisk({ 
            x: [startDate,endDate],
            y: [sizeDisk.toFixed(2),sizeDisk.toFixed(2)], 
          });
        }
        partitions[0].size += parseInt(partition.size);
        partitions[0].use += parseInt(partition.use);
        partitions[0].available += parseInt(partition.available);
        partitions[0].usepercent = ((partitions[0].use/partitions[0].size)*100).toFixed(0) + '%';
        partitions[0].availablepercent = ((1-(partitions[0].use/partitions[0].size))*100).toFixed(0)  + '%';

      });
      let xAxis = [];
      let yAxis = [];
      if (res.data.length > 0) {
        res.data.forEach(row => {
          xAxis.push(row.date);
          yAxis.push( (( parseInt(row.total_use) || row.use ) / 1048576).toFixed(2) );
        });
        if(res.data.length === 1) {
          xAxis.push(startDate);
          yAxis.push( (( parseInt(res.data[0].total_use) || res.data[0].use ) / 1048576).toFixed(2) );
        }
        setPlotData({
          x: xAxis,
          y: yAxis,
        });
      } else {
        const partition = partitions.filter(p => p.mountpoint === selectedPartition)[0];
        if (partition) {
          xAxis = [`${startDate} 00:00:00`, endDate];
          yAxis = [partition.use / 1048576, partition.use / 1048576];
          setPlotData({
            x: xAxis,
            y: yAxis,
          }); 
        }else {
          setPlotData({
            x: xAxis,
            y: yAxis,
          });
        }
      }
    });
  }, [server, partitions, selectedPartition, period]);

  const handlePeriodChange = e => {
    if(Number(e.target.value) !== period) {
      setPeriod(Number(e.target.value))
    }
  };

  // const handlePartitionChange = e => {
  //   if(e.target.value !== selectedPartition) {
  //     setSelectedPartition(e.target.value)
  //   }else {
  //     setSelectedPartition('all')
  //   }
  // };

  return (
    <>
      <Grid container spacing={3}>
        {/* <Grid item xs={2}>
          <FormControl>
            <InputLabel>Partition/Disk</InputLabel>
            <Select value={selectedPartition} onChange={handlePartitionChange}>
              <MenuItem key={0} value='all'>
                All
              </MenuItem> 
              {partitions.map(partition => (
                <MenuItem key={partition.mountpoint} value={partition.mountpoint}>
                  {partition.mountpoint}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item item xs={2}>
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
        <Grid item xs={12} md={6} className={classes.datePicker}>
          <BasicDatePicker 
            dateRange={dateRange}
            setDateRange={setDateRange}
            setPeriod={setPeriod} 
          />
        </Grid> */}
        <Grid item xs={6}>
          <Card>
            <CardHeader
              title={
                <span>
                  {server} - Partitions
                </span>
              }
            />
            <CardContent>
              <Table
                columns={columns}
                data={partitions}
                // data={selectedPartition !== 'all' ? partitions.filter(row => row.mountpoint === selectedPartition || row.mountpoint === 'all') : partitions}
                totalCount={1}
                remote={false}
                hasSearching={false}
                hasSorting={false}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardHeader
              title={
                <span>
                  Gráfico de uso - {selectedPartition === 'all' ? server : selectedPartition} 
                </span>
              }
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item item xs={4}>
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
                <Grid item xs={8} className={classes.datePicker}>
                  <BasicDatePicker 
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    setPeriod={setPeriod} 
                  />
                </Grid>
              </Grid>
              <Plot data={plotData} dataDisk={plotDataDisk} width={800} />
            </CardContent>
          </Card>
        </Grid>
        
      </Grid>
      <DucDialog open={open} setOpen={setOpen} partition={currentPartition} />
    </>
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
