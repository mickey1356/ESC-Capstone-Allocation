import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import form from './form/form';

const Main =() => {
    return (
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/form' component={form}></Route>
        {/* <Route exact path = '/form' render={() => {
          window.location.href='form.html'
        }}/> */}
      </Switch>
    );
  }

  export default Main;