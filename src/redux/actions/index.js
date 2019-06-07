import * as ActionTypes from "./ActionTypes";

export function fetchFlightsAction() {
  console.log("fetchFlightsAction çağrıldı");
  return {
    type: ActionTypes.FETCH_FLIGHTS
  };
}

export function fetchFlightsCompletedAction(flights) {
  console.log("fetchFlightsCompletedAction çağrıldı");

  return {
    type: ActionTypes.FETCH_FLIGHTS_COMPLETED,
    flights
  };
}

export function fetchErrorAction(error) {
  return {
    type: ActionTypes.FETCH_FLIGHTS_ERROR,
    payload: error
  };
}
export function loadStartAction() {
  console.log("loadStartAction çağrıldı");

  return {
    type: ActionTypes.LOADING_STARTED
  };
}

export function loadEndAction() {
  console.log("loadEndAction çağrıldı");

  return {
    type: ActionTypes.LOADING_FINISHED
  };
}

export function filterSortFlightsAction(filters) {
  return {
    type: ActionTypes.MANIPULATE_FLIGHTS,
    payload: filters
  };
}

export function filterSortFlightsDoneAction(flights) {
  return {
    type: ActionTypes.MANIPULATE_FLIGHTS_COMPLETED,
    payload: flights
  };
}

export function createFlightAction(flight) {
  return {
    type: ActionTypes.CREATE_FLIGHT,
    payload: flight
  };
}

export function createFlightErrorAction(error) {
  return {
    type: ActionTypes.CREATE_FLIGHT_ERROR,
    payload: error
  };
}

export function paginationAction(pagination) {
  return {
    type: ActionTypes.PAGINATION_STARTED,
    payload: pagination
  };
}

export function paginationDoneAction(flights) {
  return {
    type: ActionTypes.PAGINATION_COMPLETED,
    payload: flights
  };
}
