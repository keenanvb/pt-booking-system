import { combineReducers } from 'redux';
import alertReducer from './alertReducer'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import postReducer from './postReducer'
import clientReducer from './clientReducer'
import profileAdminReducer from './profileAdminReducer'
import bookingReducer from './bookingReducer'
import bookingManage from './bookingManageReducer'
import ptReducer from './ptReducer'
import bookingManageAdminReducer from './bookingManageAdminReducer'
import contactReducer from './contactReducer'


export default combineReducers({
    alert: alertReducer,
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
    adminClient: clientReducer,
    booking: bookingReducer,
    bookingManage: bookingManage,
    profileAdmin: profileAdminReducer,
    adminPT: ptReducer,
    adminBookingManage: bookingManageAdminReducer,
    contact: contactReducer
})