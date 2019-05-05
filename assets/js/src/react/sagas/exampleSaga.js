import {put, takeEvery, all} from 'redux-saga/effects';
import {showModal, setModal} from '../ModalContainer/actions';
import {constants} from '../constants/constants';

const setAndShowModal = function* () {
  yield takeEvery('SET_AND_SHOW_MODAL', function* (action) {
    yield put(setModal(action.payload.name));
    yield put(showModal(true));
  });
};

export const modalSaga = function* () {
  yield all([
    setAndShowModal()
  ]);
};
