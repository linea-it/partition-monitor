import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Route from './Route';
import Server from '../pages/Server';

export default function Routes() {
  return (
    <Switch>
      <Route path="/:server" component={Server} />

      <Route exact path="/">
        <Redirect to="/desdb4" />
      </Route>
    </Switch>
  );
}
