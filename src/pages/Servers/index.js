import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import Table from '../../components/Table';
import styles from './styles';
import { getHistory } from '../../services/api';

function Servers() {
  const classes = styles();
  const [history, setHistory] = useState([]);
  const [servers, setServers] = useState([]);

  useEffect(() => {
    getHistory()
      .then((res) => setHistory(res));
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      const keys = history
        .map((obj) => obj.server)
        .filter((el, i, arr) => arr.indexOf(el) === i);

      const groupedByServer = [];

      keys.forEach((key) => {
        groupedByServer.push(history.filter((el) => el.server === key));
      });
      setServers(groupedByServer);
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
    },
    {
      name: 'use',
      title: 'Use',
    },
    {
      name: 'usepercent',
      title: 'Usepercent',
    },
  ];

  return (
    <Grid container spacing={3} justify="center" className={classes.root}>
      {servers.map((server) => (
        <Grid item xs={12} sm={6} md={4}>

          <Card className={classes.card}>
            <CardHeader
              title={(
                <span className={classes.headerTitle}>{server[0].server}</span>
              )}
              className={classes.cardHeader}
            />
            <CardContent>
              <Table
                columns={columns}
                data={server}
                totalCount={server.length}
                hasSearching={false}
                pageSize={5}
                remote={false}
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Servers;
