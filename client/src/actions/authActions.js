import axios from 'axios'
import { setAlert } from './index'
import {
    USER_LOADED, AUTH_ERROR,
    LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT, CLEAR_PROFILE,
    RESET_PASSWORD, UPDATE_PASSWORD //REGISTER_SUCCESS, REGISTER_FAIL, 
} from './types';
import setAuthToken from '../utils/setAuthToken'

//Load user
export const loadUser = () => {
    return async (dispatch) => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }

        try {
            const res = await axios.get('/api/auth');
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (err) {
            // dispatch(setAlert('Token has expired: Please login again', 'danger'))
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => {
                    dispatch(setAlert(error.msg, 'danger'))
                })
            }

            dispatch({
                type: AUTH_ERROR
            })
        }

    }
}

//Register user
export const register = ({ name, firstName, lastName, email, password }, history) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({ name, firstName, lastName, email, password });

        try {
            await axios.post('/api/users', body, config)
            dispatch(setAlert('New user has been added ', 'success'));
            history.push('/admin');
            // dispatch({
            //     type: REGISTER_SUCCESS,
            //     payload: res.data
            // });
            //load user
            // dispatch(loadUser());
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => {
                    dispatch(setAlert(error.msg, 'danger'))
                })
            }

            // dispatch({
            //     type: REGISTER_FAIL
            // });
        }
    }
}

//Login user
export const login = ({ email, password }) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({ email, password });

        try {
            const res = await axios.post('/api/auth', body, config)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });

            dispatch(setAlert('Successfully Logged In', 'success'))
            //load user
            dispatch(loadUser());
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => {
                    dispatch(setAlert(error.msg, 'danger'))
                })
            }

            // dispatch({
            //     type: LOGIN_FAIL
            // });
        }
    }
}

//Login user
export const forgotPassword = ({ email }) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({ email });

        try {
            await axios.post('/api/auth/forgotpassword', body, config)

            dispatch(setAlert('Email has been sent', 'success'))
            // dispatch({
            //     type: FORGOT_PASSWORD_SUCCESS,
            //     payload: res.data
            // });
            //load user
            // dispatch(loadUser());
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => {
                    dispatch(setAlert(error.msg, 'danger'))
                })
            }

            dispatch({
                type: LOGIN_FAIL
            });
        }
    }
}

export const resetPassword = (id, { password }) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({ password });

        try {
            let res = await axios.put(`/api/auth/resetpassword/${id}`, body, config)

            dispatch(setAlert('Password has been reset', 'success'));

            dispatch({
                type: RESET_PASSWORD,
                payload: res.data
            });

            //load user
            dispatch(loadUser());
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => {
                    dispatch(setAlert(error.msg, 'danger'))
                })
            }

            dispatch({
                type: LOGIN_FAIL
            });
        }
    }
}

export const updatePassword = (formData) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {

            let res = await axios.put('/api/auth/updatepassword', formData, config)

            dispatch(setAlert('Password has been changed', 'success'))
            dispatch({
                type: UPDATE_PASSWORD,
                payload: res.data
            });
            //load user
            dispatch(loadUser());
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => {
                    dispatch(setAlert(error.msg, 'danger'))
                })
            }

            dispatch({
                type: LOGIN_FAIL
            });
        }
    }
}



export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_PROFILE
        })
        dispatch({
            type: LOG_OUT
        })
    }
}