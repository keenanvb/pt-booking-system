import { ADMIN_GET_USER_PROFILE, ADMIN_UPDATE_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, GET_PROFILES } from '../actions/types';

const INITIAL_STATE = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
};

export default (state = INITIAL_STATE, action) => {

    const { type, payload } = action;

    switch (type) {
        case ADMIN_UPDATE_PROFILE:
        case ADMIN_GET_USER_PROFILE:
            return { ...state, profile: payload, loading: false }
        case GET_PROFILES:
            return { ...state, profiles: payload, loading: false }
        case PROFILE_ERROR:
            return { ...state, error: payload, loading: false }
        case CLEAR_PROFILE:
            return { ...state, profile: null, repos: [], loading: false }
        default:
            return state;
    }
}