import rootReducer from "../reducers";

import * as ActionTypes from "../actions/ActionTypes";

const initialState = {
  flights: [],
  loading: false
};

describe("rootReducer", () => {
  it("should return the initial state", () => {
    expect(rootReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle FETCH_FLIGHTS", () => {
    const startAction = {
      type: ActionTypes.FETCH_FLIGHTS
    };
    expect(rootReducer({}, startAction)).toEqual({});
  });
});
