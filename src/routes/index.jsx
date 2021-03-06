import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';
import Login from './login';
import Register from './register';
import CreateTeam from './createTeam';
import Home from './home';
import ViewTeam from './viewTeam';
import DirectMessage from './directMessage';
import ErrorPage from './errorPage';
import EditTeam from './editTeam';
//import PrivateRoute from './privateRoute';
//import logo from './logo.svg';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    decode(token);
    decode(refreshToken);
  } catch (error) {
    return false;
  }
  return true;
};

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
            <Redirect to={{
              pathname: '/login',
            }}
            />
          )
      )}
    />
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/edit/team/:teamId" exact component={EditTeam} />
        {/* <PrivateRoute path="/edit/user/:userId" exact component={CreateTeam} /> */}
        <PrivateRoute path="/createteam" exact component={CreateTeam} />
        <PrivateRoute path="/team/:teamId?/:channelId?" exact component={ViewTeam} />
        <PrivateRoute path="/dm/:teamId/:userId" exact component={DirectMessage} />
        <PrivateRoute path="/home" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/error" exact component={ErrorPage} />
        <Route path="*" exact component={() => (<Redirect to={{ pathname: '/home' }} />)} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
