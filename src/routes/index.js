import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Route from './Route';
// import History from '../pages/History';
// import Servers from '../pages/Servers';
import DESDB4 from '../pages/DESDB4';
import DESDB6 from '../pages/DESDB6';

export default function Routes() {
  return (
    <Switch>
      {/* <Route path="/history" component={History} />
      <Route path="/servers" component={Servers} /> */}

      <Route path="/database/desdb4" component={DESDB4} />
      <Route path="/database/desdb6" component={DESDB6} />


      <Route exact path="/">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}
