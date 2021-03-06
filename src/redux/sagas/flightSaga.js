import { take, put, call, takeEvery } from "redux-saga/effects";

import {
  fetchFlightsCompletedAction,
  fetchErrorAction,
  loadStartAction,
  loadEndAction,
  createFlightAction,
  createFlightErrorAction
} from "../actions";
import * as ActionTypes from "../actions/ActionTypes";
import { fetchFlights } from "../../helpers/fetchFlights";

export function* FetchFlights() {
  try {
    yield put(loadStartAction());

    const flightData = yield call(fetchFlights);
    yield put(fetchFlightsCompletedAction(flightData));
    yield put(loadEndAction());
  } catch (error) {
    yield put(fetchErrorAction(error.toString()));
  }
}
export function* createFlights() {
  try {
    yield put(createFlightAction());
  } catch (error) {
    yield put(createFlightErrorAction(error.toString()));
  }
}

export default function* flightSaga() {
  yield takeEvery(ActionTypes.FETCH_FLIGHTS, FetchFlights);
  yield take(ActionTypes.CREATE_FLIGHT, createFlights);
}
