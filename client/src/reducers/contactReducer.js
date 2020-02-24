import {
    UPDATE_CONTACT,
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    email: '',
    message: '',
    error: {}
};
export default (state = INITIAL_STATE, action) => {

    const { type, payload } = action;

    switch (type) {
        case UPDATE_CONTACT:
            return { ...state, [payload.prop]: payload.value }
        default:
            return state;
    }
}