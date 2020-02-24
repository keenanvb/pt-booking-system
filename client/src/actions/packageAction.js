import axios from 'axios'
import {
    ADD_PACKAGE, GET_PACKAGE_USERS, PACKAGE_ERROR, GET_USER_PACKAGES_USER_ID, GET_USER_SESSIONS_BY_PACKAGE_ID,
    PACKGAE_USER_ERROR, GET_PACKAGES_USER_BY_ID,
    GET_CURRENT_PACKAGE, GET_SESSIONS_BY_PACKAGE_ID, REMOVE_PACKAGE, ADD_SESSION, REMOVE_SESSION_PACKAGE, UPDATE_PACKAGE
} from './types';
import { setAlert } from './index'


//Admin
export const addPackage = (formdata, history) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/packages', formdata, config);

            dispatch({
                type: ADD_PACKAGE,
                payload: res.data
            })
            dispatch(setAlert('Package created', 'success'))
            history.push('/admin');
        } catch (err) {
            dispatch({
                type: PACKAGE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

//Admin Remove Package
export const removePackage = (packageId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/api/packages/${packageId}/`);

            dispatch({
                type: REMOVE_PACKAGE,
                payload: packageId
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

//Get all users
export const getPackageUsers = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/packages/users');
            dispatch({
                type: GET_PACKAGE_USERS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: PACKGAE_USER_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

//Get all packages
// export const getPackages = () => {
//     return async (dispatch) => {

//         try {
//             const res = await axios.get('/api/packages/');
//             dispatch({
//                 type: GET_PACKAGES,
//                 payload: res.data
//             })
//         } catch (err) {
//             dispatch({
//                 type: PACKAGE_ERROR,
//                 payload: { msg: err.response.statusText, status: err.response.status }
//             })
//         }
//     }
// }

// admin - Get packages by user Id 
export const getPackagesByUserId = (userId) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/packages/session/${userId}`);

            dispatch({
                type: GET_PACKAGES_USER_BY_ID,
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

//USER - get packages for user
export const getUserPackages = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/packages/sessions/user`);

            dispatch({
                type: GET_USER_PACKAGES_USER_ID,
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

//ADMIN
//Get package by ID // change to getCurrentPackageById
export const getSessionsByPackageId = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/session/package/${id}`);

            dispatch({
                type: GET_SESSIONS_BY_PACKAGE_ID,
                payload: res.data
            })
        } catch (err) {

            dispatch({
                type: PACKAGE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

//USER
//Get package by ID // change to getCurrentPackageById
export const getUserSessionsByPackageId = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/session/package/${id}/user`);

            dispatch({
                type: GET_USER_SESSIONS_BY_PACKAGE_ID,
                payload: res.data
            })
        } catch (err) {

            dispatch({
                type: PACKAGE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

// Clear current package 
export const clearCurrentPackage = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: GET_CURRENT_PACKAGE
            })
        } catch (err) {
            dispatch({
                type: PACKAGE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}



// add session to package 
export const addPackageSession = (packageId, formdata, history) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post(`/api/session/package/${packageId}`, formdata, config);

            //remove from packages API
            // const res = await axios.post(`/api/packages/session/${sessionId}`, formdata, config);
            dispatch({
                type: ADD_SESSION,
                payload: res.data
            })
            dispatch(setAlert('Session Added', 'success'))
            history.push('/admin')
        } catch (err) {
            dispatch({
                type: PACKAGE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

//Delete comment
export const removeSessionPackage = (sessionId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/api/session/${sessionId}`);
            dispatch({
                type: REMOVE_SESSION_PACKAGE,
                payload: sessionId
            })
            dispatch(setAlert('Session Removed', 'success'))
        } catch (err) {
            dispatch({
                type: PACKAGE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

//Delete comment
export const updatePackage = (packageId, formData, history) => {
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
            dispatch({
                type: PACKAGE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}