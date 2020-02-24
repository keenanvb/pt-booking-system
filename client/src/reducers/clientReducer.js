import {
    GET_USER_PACKAGES_USER_ID, GET_USER_SESSIONS_BY_PACKAGE_ID, GET_USER_SINGLE_SESSION_BY_USER_ID, LOG_OUT
} from '../actions/types';

const INITIAL_STATE = {
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
        case GET_USER_PACKAGES_USER_ID:
            return { ...state, packages: payload, loading: false }
        case GET_USER_SESSIONS_BY_PACKAGE_ID:
            return { ...state, sessionPackage: payload, loading: false }
        case GET_USER_SINGLE_SESSION_BY_USER_ID:
            return { ...state, sessionSingle: payload, loading: false }
        case LOG_OUT:
            return { ...state, clients: [], packages: [], sessionPackage: [], sessionSingle: [], loading: true }
        default:
            return state;
    }
}