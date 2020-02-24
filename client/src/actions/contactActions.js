import axios from 'axios'
import { setAlert } from './index'
import {
    UPDATE_CONTACT
} from './types';
//Add contact
export const addContact = (formdata) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            await axios.post(`/api/contact`, formdata, config);
            dispatch(setAlert('Sent', 'success'))
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => {
                    dispatch(setAlert(error.msg, 'danger'))
                })
            }
        }
    }
}


//update booking
export const updateContact = ({ prop, value }) => {
    return {
        type: UPDATE_CONTACT,
        payload: { prop, value }
    };
};
