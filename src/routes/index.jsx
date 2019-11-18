import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './home';
import Register from './register';
//import logo from './logo.svg';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
      <Switch>
        <Route path="/register" exact component={Register} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
