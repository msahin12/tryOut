/*
 *
 * FlightsPage reducer
 *
 */
import * as ActionTypes from "../actions/ActionTypes";

const initialState = {
  flights: [],
  loading: false
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOADING_STARTED:
      return Object.assign({}, state, {
        loading: true
      });
    case ActionTypes.LOADING_FINISHED:
      return Object.assign({}, state, {
        loading: false
      });
    case ActionTypes.FETCH_FLIGHTS_ERROR:
      return Object.assign({}, state, {
        flights: action.flights
      });
    case ActionTypes.FETCH_FLIGHTS:
      return state;
    case ActionTypes.FETCH_FLIGHTS_COMPLETED:
      return Object.assign({}, state, {
        flights: action.flights
      });
    case ActionTypes.MANIPULATE_FLIGHTS:
      return Object.assign({}, state, {
        flights: action.flights
      }); //state.set("filters", fromJS(action.payload));
    case ActionTypes.MANIPULATE_FLIGHTS_COMPLETED:
      return Object.assign({}, state, {
        flights: action.flights
      }); //state.set("filteredFlights", fromJS(action.payload));
    case ActionTypes.PAGINATION_STARTED:
      return Object.assign({}, state, {
        flights: action.flights
      }); //state.set("pagination", fromJS(action.payload));
    case ActionTypes.PAGINATION_COMPLETED:
      return Object.assign({}, state, {
        flights: action.flights
      }); //state.set("currentPage", fromJS(action.payload));
    case ActionTypes.CREATE_FLIGHT:
      return Object.assign({}, state, {
        flights: [...state.flights, ...action.payload]
      }); //state.set("newFlight", fromJS(action.payload));
    case ActionTypes.CREATE_FLIGHT_COMPLETED:
      return Object.assign({}, state, {
        flights: action.flights
      }); //state.set("flights", action.payload);
    case ActionTypes.CREATE_FLIGHT_ERROR:
      return Object.assign({}, state, {
        flights: action.flights
      }); //state.set("error", true);
    default:
      return state;
  }
}

export default rootReducer;
