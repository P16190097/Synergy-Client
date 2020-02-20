import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './login';
import Register from './register';
import CreateTeam from './createTeam';
import Home from './home';
import PrivateRoute from './privateRoute';
//import logo from './logo.svg';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/createteam" exact component={CreateTeam} />
      </Switch>
      <Switch>
        <Route path="/login" exact component={Login} />
      </Switch>
      <Switch>
        <Route path="/register" exact component={Register} />
      </Switch>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
