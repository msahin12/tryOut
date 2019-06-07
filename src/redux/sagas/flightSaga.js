import { put, call, takeEvery, select } from "redux-saga/effects";

import {
  fetchFlightsAction,
  fetchFlightsCompletedAction,
  fetchErrorAction,
  loadStartAction,
  loadEndAction
} from "../actions";
import * as ActionTypes from "../actions/ActionTypes";
import { fetchFlights } from "../../helpers/fetchFlights";

export function* FetchFlights() {
  try {
    //    const page = yield select(getPage);
    yield put(loadStartAction());

    const flightData = yield call(fetchFlights);
    yield put(fetchFlightsCompletedAction(flightData));
    yield put(loadEndAction());
  } catch (error) {
    yield put(fetchErrorAction(error.toString()));
  }
}

export default function* flightSaga() {
  yield takeEvery(ActionTypes.FETCH_FLIGHTS, FetchFlights);
}
