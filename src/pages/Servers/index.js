import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Icon,
} from '@material-ui/core';
import Table from '../../components/Table';
import { getHistory } from '../../services/api';
import { megabytesToSize } from '../../services/math';

function Servers() {
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

  return (
    <Grid container spacing={3} justify="center">
      {servers.map((server) => (
        <Grid item xs={12} sm={6}>

          <Card>
            <CardHeader
              avatar={<Icon className="fa fa-server" />}
              title={server[0].server}
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
