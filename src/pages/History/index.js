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
import { megabytesToSize } from '../../services/math';

function History() {
  const classes = styles();
  const [history, setHistory] = useState([]);
  const [defaultExpandedGroups, setDefaultExpandedGroups] = useState([]);

  useEffect(() => {
    getHistory()
      .then((res) => setHistory(res));
  }, []);

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

  return (
    <Grid container spacing={3} justify="center" className={classes.root}>
      <Grid item xs={12}>
        {defaultExpandedGroups.length > 0 ? (
          <Card className={classes.card}>
            <CardHeader
              title={(
                <span className={classes.headerTitle}>History</span>
            )}
              className={classes.cardHeader}
            />
            <CardContent>
              <Table
                columns={columns}
                data={history}
                totalCount={history.length}
                hasSearching={false}
                hasGrouping
                grouping={[{
                  columnName: 'server',
                }]}
                remote={false}
                defaultExpandedGroups={defaultExpandedGroups}
              />
            </CardContent>
          </Card>
        ) : null}
      </Grid>
    </Grid>
  );
}

export default History;
