import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading, user }, ...rest }) => {

    return (
        < Route
            {...rest}
            render={props =>
                !isAuthenticated && !loading ? (
                    <Redirect to='/login' />
                ) : (
                        user && user.role === 'admin' ?
                            <Component {...props} /> : <Redirect to='/login' />
                    )
            }
        />
    )
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);