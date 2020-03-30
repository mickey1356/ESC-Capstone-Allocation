import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Form from './form/form';
import Database from './database/database';
import createAccount from './pages/createAccount';

const Main = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/form' component={Form}></Route>
      <Route exact path='/database' component={Database}></Route>
      <Route exact path='/createAccount' component={createAccount}></Route>
    </Switch>
  );
}

export default Main;