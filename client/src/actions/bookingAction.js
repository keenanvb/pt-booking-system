import axios from 'axios'
import {
    GET_LASTEST_PACKAGE, BOOKING_UPDATE, CLEAR_BOOKING_FORM, GET_BOOKING_CALDENDAR_EVENTS, BOOKING_MADE,
    GET_UP_AND_COMING_CONFIRMED_BOOKINGS, BOOKING_MANAGE_UPDATE, REMOVE_BOOKING
} from './types';
import { setAlert } from './index'

export const getLatestPackage = () => {
    return async (dispatch) => {
        try {

            const res = await axios.get(`/api/booking/packages/latestpackage`);

            dispatch({
                type: GET_LASTEST_PACKAGE,
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

export const getBookingCalendarEvents = (dates) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }


            const res = await axios.post(`/api/booking/calendar`, dates, config);

            dispatch({
                type: GET_BOOKING_CALDENDAR_EVENTS,
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

export const addBooking = (formData) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }


            const res = await axios.post(`/api/booking`, formData, config);

            dispatch({
                type: BOOKING_MADE,
                payload: res.data
            });

            dispatch({
                type: CLEAR_BOOKING_FORM,
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
export const bookingUpdate = ({ prop, value }) => {
    return {
        type: BOOKING_UPDATE,
        payload: { prop, value }
    };
};


export const clearForm = () => {
    return {
        type: CLEAR_BOOKING_FORM,
    };
};

//GET_UP_AND_COMING_CONFIRMED_BOOKINGS
export const getUpAndCommingBooking = (bookingSelectedValue, dates) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios.post(`/api/booking/calendar/mybooking/?confirmation=${bookingSelectedValue}`, dates, config);

            dispatch({
                type: GET_UP_AND_COMING_CONFIRMED_BOOKINGS,
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
export const bookingManageUpdate = ({ prop, value }) => {
    return {
        type: BOOKING_MANAGE_UPDATE,
        payload: { prop, value }
    };
};

export const removeBooking = (eventId) => {
    return async (dispatch) => {
        try {

            await axios.delete(`/api/booking/${eventId}`);

            dispatch({
                type: REMOVE_BOOKING,
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
