import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Form from './form/form';
import changePassword from './form/changePassword';
import Database from './database/database';
import createAccount from './pages/createAccount';
import adminLogin from './pages/adminLogin';
import adminAddAccount from './pages/adminAddAccount';
import map from './map/App';

const Main = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/form' component={Form}></Route>
      <Route exact path='/database' component={Database}></Route>
      <Route exact path='/createAccount' component={createAccount}></Route>
      <Route exact path='/changePassword' component={changePassword}></Route>
      <Route exact path='/adminLogin' component={adminLogin}></Route>
      <Route exact path='/adminAddAccount' component={adminAddAccount}></Route>
      <Route exact path='/map' component={map}></Route>
    </Switch>
  );
}

export default Main;
