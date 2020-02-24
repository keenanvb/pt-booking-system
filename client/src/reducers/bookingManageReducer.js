import {
  GET_UP_AND_COMING_CONFIRMED_BOOKINGS, BOOKING_MANAGE_UPDATE, REMOVE_BOOKING //CANCEL_BOOKING
} from '../actions/types';

const INITIAL_STATE = {
  upAndCommingBookings: [],
  bookingSelectedValue: 'all',
  loading: true,
  error: {}
};
export default (state = INITIAL_STATE, action) => {

  const { type, payload } = action;

  switch (type) {
    case GET_UP_AND_COMING_CONFIRMED_BOOKINGS:
      return { ...state, upAndCommingBookings: payload, loading: false }
    case BOOKING_MANAGE_UPDATE:
      return { ...state, [payload.prop]: payload.value, loading: true }
    case REMOVE_BOOKING:
      return { ...state, upAndCommingBookings: state.upAndCommingBookings.filter((event) => { return event._id !== payload }), loading: true }
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