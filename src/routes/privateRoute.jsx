import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import decode from 'jwt-decode';

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

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                return isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{
                            pathname: '/login',
                        }}
                        />
                    );
            }}
        />
    );
};

PrivateRoute.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    component: PropTypes.object,
};

PrivateRoute.defaultProps = {
    component: null,
};

export default PrivateRoute;
