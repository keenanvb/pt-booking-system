import {
    REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR,
    LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT, ACCOUNT_DELETE,
    RESET_PASSWORD, UPDATE_PASSWORD
} from '../actions/types';

//when the application renders first
const INITIAL_STATE = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};


export default (state = INITIAL_STATE, action) => {

    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return { ...state, user: payload, isAuthenticated: true, loading: false }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case RESET_PASSWORD:
        case UPDATE_PASSWORD:
            localStorage.setItem('token', payload.token)
            return { ...state, ...payload, isAuthenticated: true, loading: false }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOG_OUT:
        case ACCOUNT_DELETE:
            localStorage.removeItem('token')
            return { ...state, token: null, isAuthenticated: false, loading: false, user: null }
        default:
            return state;
    }
}