import {
    GET_PACKAGE_USERS, GET_PACKAGES_USER_BY_ID, CLEAR_CURRENT_PACKAGE, GET_SESSIONS_BY_PACKAGE_ID,
    GET_SINGLE_SESSION_BY_USER_ID, ADD_SINGLE_SESSION, REMOVE_SINGLE_SESSION, SESSION_ERROR,
    REMOVE_PACKAGE, UPDATE_PACKAGE, LOG_OUT, REMOVE_SESSION_PACKAGE
} from '../actions/types';

const INITIAL_STATE = {
    clients: [],
    currentPackage: null,
    packages: [],
    sessionPackage: [],
    sessionSingle: [],
    loading: true,
    error: {}
};

export default (state = INITIAL_STATE, action) => {

    const { type, payload } = action;

    switch (type) {
        case GET_PACKAGE_USERS:
            return { ...state, clients: payload, loading: false }
        case GET_PACKAGES_USER_BY_ID:
            return { ...state, packages: payload, loading: false }
        case UPDATE_PACKAGE:
            return { ...state, currentPackage: payload, loading: false }
        case GET_SESSIONS_BY_PACKAGE_ID:
            return { ...state, sessionPackage: payload, loading: false }
        case CLEAR_CURRENT_PACKAGE:
            return { ...state, currentPackage: null, loading: false }
        case REMOVE_PACKAGE:
            return { ...state, packages: state.packages.filter((pack) => { return pack._id !== payload }), loading: false }
        case REMOVE_SESSION_PACKAGE:
            return { ...state, sessionPackage: state.sessionPackage.filter((sesh) => { return sesh._id !== payload }), loading: false }
        case GET_SINGLE_SESSION_BY_USER_ID:
            return { ...state, sessionSingle: payload, loading: false }
        case ADD_SINGLE_SESSION:
            return { ...state, sessionSingle: [payload, ...state.sessionSingle], loading: false }
        case SESSION_ERROR:
            return { ...state, error: payload, loading: false }
        case REMOVE_SINGLE_SESSION:
            return { ...state, sessionSingle: state.sessionSingle.filter((session) => { return session._id !== payload }), loading: false }
        case LOG_OUT:
            return { ...state, clients: [], packages: [], sessionPackage: [], sessionSingle: [], loading: true }
        default:
            return state;
    }
}