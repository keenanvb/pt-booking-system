import axios from 'axios'
import {
    GET_BOOKING_CALENDAR_EVENTS, UPDATE_BOOKING_CALENDAR_EVENT, GET_BOOKING_CALENDAR_USERS,
    GET_BOOKING_CALENDAR_LATEST_PACKAGE, BOOKING_CALENDAR_UPDATE, ADD_BOOKING_CALENDAR_EVENTS,
    SUBMIT_CONFIRMED_BOOKINGS_SUCCESS, GET_CONFIRMED_BOOKINGS
} from './types';
import { setAlert } from './index'

export const getAdminBookingCalendarEvents = (dates) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios.post(`/api/booking/admin-calendar`, dates, config);

            dispatch({
                type: GET_BOOKING_CALENDAR_EVENTS,
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

export const addAdminBookingCalendarEvents = (formData, history) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios.post(`/api/booking/admin-calendar-booking`, formData, config);

            dispatch({
                type: ADD_BOOKING_CALENDAR_EVENTS,
                payload: res.data
            });
            dispatch(setAlert('Booking Added', 'success'));
            // history.push('/admin-manage-booking');
        } catch (err) {
            // dispatch({
            //     type: PACKAGE_ERROR,
            //     payload: { msg: err.response.statusText, status: err.response.status }
            // })
        }
    }
}

export const updateAdminBooking = (eventId, dates) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios.put(`/api/booking/admin-calendar/${eventId}`, dates, config);

            dispatch({
                type: UPDATE_BOOKING_CALENDAR_EVENT,
                payload: res.data
            });

            dispatch(setAlert('Booking Updated', 'success'))
        } catch (err) {
            // dispatch({
            //     type: PACKAGE_ERROR,
            //     payload: { msg: err.response.statusText, status: err.response.status }
            // })
        }
    }
}

export const removeAdminBooking = (eventId) => {
    return async (dispatch) => {
        try {

            await axios.delete(`/api/booking/admin-calendar/${eventId}`);

            dispatch({
                type: UPDATE_BOOKING_CALENDAR_EVENT,
                payload: eventId
            });
            dispatch(setAlert('Booking Removed', 'success'))
        } catch (err) {
            // dispatch({
            //     type: PACKAGE_ERROR,
            //     payload: { msg: err.response.statusText, status: err.response.status }
            // })
        }
    }
}

//Get all users
export const getBookingCalendarPackageUsers = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/packages/users');
            dispatch({
                type: GET_BOOKING_CALENDAR_USERS,
                payload: res.data
            })
        } catch (err) {
            // dispatch({
            //     type: GET_BOOKING_CALENDAR_USERS,
            //     payload: { msg: err.response.statusText, status: err.response.status }
            // })
        }
    }
}

//getLatest package for user
export const getBookingCalendarLatestPackage = (userId) => {
    return async (dispatch) => {
        try {

            const res = await axios.get(`/api/booking/admin-calendar/latestpackage/${userId}`);

            dispatch({
                type: GET_BOOKING_CALENDAR_LATEST_PACKAGE,
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

//update booking
export const bookingCalendarUpdate = ({ prop, value }) => {
    return {
        type: BOOKING_CALENDAR_UPDATE,
        payload: { prop, value }
    };
};

//Submit confirmed bookings for the day
export const submitConfirmedBookings = (formData) => {
    return async (dispatch) => {
        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios.post(`/api/booking/admin-calendar/move-session`, formData, config);

            dispatch({
                type: SUBMIT_CONFIRMED_BOOKINGS_SUCCESS,
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

//Submit confirmed bookings for the day
export const getConfirmedBookings = (formData) => {
    return async (dispatch) => {
        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios.post(`/api/booking/admin-calendar/confirmed-bookings`, formData, config);

            dispatch({
                type: GET_CONFIRMED_BOOKINGS,
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
