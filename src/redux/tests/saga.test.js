/**
 * Unit testing of Sagas.
 */

import  flightSaga, {FetchFlights } from "../sagas/flightSaga";
import { takeEvery } from "redux-saga/effects";
import * as ActionTypes from "../actions/ActionTypes";

describe("SAGAS", () => {
  it('should dispatch action "FETCH_FLIGHTS" ', () => {
    const generator = flightSaga();
    expect(generator.next().value).toEqual(
      takeEvery(ActionTypes.FETCH_FLIGHTS, FetchFlights)
    );
  });
});

/* describe("flightsPageSaga Saga", () => {
  it("Expect to have unit tests specified", () => {
    expect(true).toEqual(true);
  });
});
 */
