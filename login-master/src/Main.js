import React from 'react';
import { Switch, Route } from 'react-router-dom';
import studentLogin from './pages/studentLogin';
import studentAddAccount from './pages/studentAddAccount';
import adminLogin from './pages/adminLogin';
import adminAddAccount from './pages/adminAddAccount';
import Form from './form/form';
import changePassword from './form/changePassword';
import map from './map/App';
import studentMap from './studentmap/App';

const Main = () => {
  
  return (
    <Switch>
      <Route exact path='/' component={studentLogin}></Route>
      <Route exact path='/studentAddAccount' component={studentAddAccount}></Route>
      <Route exact path='/adminLogin' component={adminLogin}></Route>
      <Route exact path='/adminAddAccount' component={adminAddAccount}></Route>
      <Route exact path='/form' component={Form}></Route>
      <Route exact path='/changePassword' component={changePassword}></Route>
      <Route exact path='/map' component={map}></Route>
      <Route exact path='/studentMap' component={studentMap}></Route>
    </Switch>
  );
}

export default Main;
