

  import { all } from 'redux-saga/effects';

import flightSaga from './flightSaga';

export default function* rootSaga() {
    yield all([flightSaga()]);
}
