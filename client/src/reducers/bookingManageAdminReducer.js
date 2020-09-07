import {
  GET_BOOKING_CALENDAR_EVENTS, UPDATE_BOOKING_CALENDAR_EVENT, REMOVE_BOOKING_CALENDAR_EVENT,
  GET_BOOKING_CALENDAR_USERS, GET_BOOKING_CALENDAR_LATEST_PACKAGE, BOOKING_CALENDAR_UPDATE,
  SUBMIT_CONFIRMED_BOOKINGS_SUCCESS, GET_CONFIRMED_BOOKINGS, ADD_BOOKING_CALENDAR_EVENTS
} from '../actions/types';

const INITIAL_STATE = {
  bookingEvents: [],
  clients: [],
  lastestPackage: [],
  selectedUserId: '',
  loading: true,
  confirmedBookings: [],
  error: {}
};
export default (state = INITIAL_STATE, action) => {

  const { type, payload } = action;

  switch (type) {
    case GET_BOOKING_CALENDAR_USERS:
      return { ...state, clients: payload, loading: false }
    case GET_BOOKING_CALENDAR_LATEST_PACKAGE:
      return { ...state, lastestPackage: payload, loading: false }
    case GET_BOOKING_CALENDAR_EVENTS:
      return { ...state, bookingEvents: payload, loading: false }
    case GET_CONFIRMED_BOOKINGS:
      return { ...state, confirmedBookings: payload, loading: false }
    case SUBMIT_CONFIRMED_BOOKINGS_SUCCESS:
      return { ...state, confirmedBookings: payload, loading: true } //reloading to fetch call SUBMIT_CONFIRMED_BOOKINGS_SUCCESS
    case ADD_BOOKING_CALENDAR_EVENTS:
      return { ...state, loading: true }
    case BOOKING_CALENDAR_UPDATE:
      return { ...state, [payload.prop]: payload.value }
    case UPDATE_BOOKING_CALENDAR_EVENT:
      return {
        ...state, bookingEvents: state.bookingEvents.map((event, index) =>
          event._id === payload._id ?
            state.bookingEvents[index] = {
              ...state.bookingEvents[index],
              start: event.start,
              confirmation: event.confirmation
            } : state.bookingEvents[index] = {
              ...state.bookingEvents[index],
            }
        )
        , loading: true //reloading to fetch call GET_BOOKING_CALENDAR_EVENTS
      }
    case REMOVE_BOOKING_CALENDAR_EVENT:
      return { ...state, bookingEvents: state.bookingEvents.filter((event) => { return event._id !== payload }), loading: true }
    default:
      return state;
  }
}

/*

     // bookings.forEach((booking, index) => {
        //     if (booking.id === eventDropInfo.event.id) {
        //         newBookingState[index] = {
        //             ...newBookingState[index],
        //             start: eventDropInfo.event.start,
        //         }
        //     } else {
        //         newBookingState[index] = {
        //             ...newBookingState[index],
        //         }
        //     }
        // })


*/

/*
case 'UPDATE_PLAYERS_CARDS':
  const playerObject = Object.assign(state[action.player], { cards: action.cards });
  return Object.assign({}, state, {
    [action.player]: playerObject
  });


  const newState = Object.assign({}, state);
Object.assign(newState.action.player, { cards: action.cards });

*/