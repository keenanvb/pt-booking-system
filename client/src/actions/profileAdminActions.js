import axios from 'axios'
import {
    ADMIN_GET_USER_PROFILE, ADMIN_UPDATE_PROFILE, PROFILE_ERROR,
    UPDATE_PROFILE, CLEAR_PROFILE, ACCOUNT_DELETE
} from './types';
import { setAlert } from './index'

//Get all profile by ID
export const getUserProfileBYId = (userId) => {
    return async (dispatch) => {
        try {

            const res = await axios.get(`/api/admin-manage-profile/user/${userId}`);
            dispatch({
                type: ADMIN_GET_USER_PROFILE,
                payload: res.data
            })
        } catch (err) {
            console.log('err', err);
            // dispatch({
            //     type: PROFILE_ERROR,
            //     payload: { msg: err.response.statusText, status: err.response.status }
            // })
        }
    }
}

//Add Goal
export const adminAddGoal = (userId, formData, history) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios.put(`/api/admin-manage-profile/user/goal/${userId}`, formData, config)

            dispatch({
                type: ADMIN_UPDATE_PROFILE,
                payload: res.data
            });

            dispatch(setAlert('Goal Added', 'success'))

            history.push('/dashboard')

        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => {
                    dispatch(setAlert(error.msg, 'danger'))
                })
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

//Add Stats
export const adminAddStats = (userId, formData, history) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios.put(`/api/admin-manage-profile/user/stats/${userId}`, formData, config);
            // const res = await axios.put('/api/profile/stats', formData, config)
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });

            dispatch(setAlert('addStats Added', 'success'))

            // history.push('/dashboard')

        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => {
                    dispatch(setAlert(error.msg, 'danger'))
                })
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}


//create or update profile
// export const createProfile = (formData, history, edit = false) => {
//     return async (dispatch) => {
//         try {
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }
//             const res = await axios.post('/api/profile', formData, config)
//             dispatch({
//                 type: GET_PROFILE,
//                 payload: res.data
//             });

//             dispatch(setAlert(edit ? 'Profile updated' : 'Profile Created', 'success'))

//             if (!edit) {
//                 history.push('/dashboard')
//             }

//         } catch (err) {
//             const errors = err.response.data.errors;

//             if (errors) {
//                 errors.forEach((error) => {
//                     dispatch(setAlert(error.msg, 'danger'))
//                 })
//             }
//             dispatch({
//                 type: PROFILE_ERROR,
//                 payload: { msg: err.response.statusText, status: err.response.status }
//             })
//         }
//     }
// }

//Add Goal
export const addGoal = (formData, history) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const res = await axios.put('/api/profile/goal', formData, config)

            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });

            dispatch(setAlert('Goal Added', 'success'))

            history.push('/dashboard')

        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => {
                    dispatch(setAlert(error.msg, 'danger'))
                })
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

//Add Stats
export const addStats = (formData, history) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const res = await axios.put('/api/profile/stats', formData, config)
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });

            dispatch(setAlert('addStats Added', 'success'))

            history.push('/dashboard')

        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => {
                    dispatch(setAlert(error.msg, 'danger'))
                })
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

//Delete goal
export const deleteGoal = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/api/profile/goal/${id}`)
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });

            dispatch(setAlert('Goal Removed', 'success'))

        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

//Delete Stats
export const deleteStats = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/api/profile/stats/${id}`)
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });
            dispatch(setAlert('Stats Removed', 'success'))
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

//Delete Account and profile
export const deleteAccount = () => {
    if (window.confirm('Are you sure ?')) {
        return async (dispatch) => {
            try {
                await axios.delete(`/api/profile/`)
                dispatch({
                    type: CLEAR_PROFILE
                });
                dispatch({
                    type: ACCOUNT_DELETE
                });
                dispatch(setAlert('Your account has been REMOVED'))
            } catch (err) {
                dispatch({
                    type: PROFILE_ERROR,
                    payload: { msg: err.response.statusText, status: err.response.status }
                })
            }
        }
    } else {
        return async (dispatch) => {
            dispatch({
                type: PROFILE_ERROR  // remove this code
            })
        }
    }
}
