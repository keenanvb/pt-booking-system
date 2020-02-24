import axios from 'axios'
import {
    GET_SINGLE_SESSION_BY_USER_ID, GET_USER_SINGLE_SESSION_BY_USER_ID, ADD_SINGLE_SESSION,
    REMOVE_SINGLE_SESSION, SESSION_ERROR, PACKAGE_ERROR, GET_CURRENT_PACKAGE, UPDATE_PACKAGE
} from './types';
import { setAlert } from './index'

// admin - Get single session by user Id 
export const getSingleSessionByUserId = (user) => {
    return async (dispatch) => {
        try {

            const res = await axios.get(`/api/session/package/single/${user}`);

            dispatch({
                type: GET_SINGLE_SESSION_BY_USER_ID,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: PACKAGE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

// User - Get single session
export const getUserSingleSession = () => {
    return async (dispatch) => {
        try {

            const res = await axios.get(`/api/session/package/user`);

            dispatch({
                type: GET_USER_SINGLE_SESSION_BY_USER_ID,
                payload: res.data
            });

        } catch (err) {
            // dispatch({
            //     type: PACKAGE_ERROR,
            //     payload: { msg: err.response.statusText, status: err.response.status }
            // })
        }
    }
}

// add session to package
export const addSingleSession = (user, formdata, history) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post(`/api/session/single/${user}`, formdata, config);
            dispatch({
                type: ADD_SINGLE_SESSION,
                payload: res.data
            })
            dispatch(setAlert('Single Session Added', 'success'))
            history.push('/admin')
        } catch (err) {
            dispatch({
                type: SESSION_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

//Remove session
export const removeSingleSession = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/api/session/${id}/`);

            dispatch({
                type: REMOVE_SINGLE_SESSION,
                payload: id
            })
            dispatch(setAlert('Package Removed', 'success'))
        } catch (err) {
            // dispatch({
            //     type: PACKAGE_ERROR,
            //     payload: { msg: err.response.statusText, status: err.response.status }
            // })
        }
    }
}

//Get single session
export const getSingleSession = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/session/${id}`);

            dispatch({
                type: GET_CURRENT_PACKAGE,
                payload: res.data
            })
        } catch (err) {

            // dispatch({
            //     type: PACKAGE_ERROR,
            //     payload: { msg: err.response.statusText, status: err.response.status }
            // })
        }
    }
}

// Clear single session 
export const clearSingleSession = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: GET_CURRENT_PACKAGE
            })
        } catch (err) {
            // dispatch({
            //     type: PACKAGE_ERROR,
            //     payload: { msg: err.response.statusText, status: err.response.status }
            // })
        }
    }
}





//Delete comment
export const updateSingleSession = (packageId, formData, history) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            let res = await axios.put(`/api/packages/${packageId}`, formData, config);
            dispatch({
                type: UPDATE_PACKAGE,
                payload: res.data
            })
            dispatch(setAlert('Package Updated', 'success'))
            history.goBack();
        } catch (err) {
            // dispatch({
            //     type: PACKAGE_ERROR,
            //     payload: { msg: err.response.statusText, status: err.response.status }
            // })
        }
    }
}