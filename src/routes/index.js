import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Server from '../pages/Server';
import Duc from '../pages/Duc';
import Main from '../pages/Main';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/duc.cgi" component={Duc} />
      <Route exact path="/:server" component={Server} />
      <Route exact path="/" component={Main}/>
      {/* <Route exact path="/">
        <Redirect to="/duc.cgi" />
      </Route> */}
    </Switch>
  );
}
