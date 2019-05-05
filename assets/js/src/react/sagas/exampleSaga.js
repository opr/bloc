import {put, takeEvery, all} from 'redux-saga/effects';
import {constants} from '../constants/constants';

const sampleSaga = function* () {
  yield takeEvery('EXAMPLE_ACTION_NAME', function* (action) {

  });
};

export const exampleSaga = function* () {
  yield all([
    sampleSaga()
  ]);
};
