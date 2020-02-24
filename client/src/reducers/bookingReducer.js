import { GET_LASTEST_PACKAGE, BOOKING_UPDATE, CLEAR_BOOKING_FORM, GET_BOOKING_CALDENDAR_EVENTS, BOOKING_MADE } from '../actions/types';

const INITIAL_STATE = {
    lastestPackage: [],
    type: '',
    userPackage: '',
    bookings: [],
    bookingEvents: [],
    loading: true,
    bookingMade: '',
    error: {}
};
export default (state = INITIAL_STATE, action) => {

    const { type, payload } = action;

    switch (type) {
        case GET_LASTEST_PACKAGE:
            return { ...state, lastestPackage: payload, loading: false }
        case BOOKING_UPDATE:
            return { ...state, [payload.prop]: payload.value }
        case GET_BOOKING_CALDENDAR_EVENTS:
            return { ...state, bookingEvents: payload, loading: false }
        case BOOKING_MADE:
            return { ...state, bookingMade: payload, loading: false }
        case CLEAR_BOOKING_FORM:
            return { ...state, type: '', lastestPackage: [], userPackage: '', bookings: [], bookingEvents: [], bookingMade: false }
        default:
            return state;
    }
}

/*
case 'UPDATE_PLAYERS_CARDS':
  const playerObject = Object.assign(state[action.player], { cards: action.cards });
  return Object.assign({}, state, {
    [action.player]: playerObject
  });


  const newState = Object.assign({}, state);
Object.assign(newState.action.player, { cards: action.cards });

*/