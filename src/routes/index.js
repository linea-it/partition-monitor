import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Route from './Route';
import History from '../pages/History';
import Servers from '../pages/Servers';

export default function Routes() {
  return (
    <Switch>
      <Route path="/history" component={History} />
      <Route path="/servers" component={Servers} />
      <Route exact path="/">
        <Redirect to="/history" />
      </Route>
    </Switch>
  );
}
