/**
 * @module Sagas/user
 * @desc User
 */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import api from '../api/userApi';

import {
  SAVE_USER_REQUEST,
  SAVE_USER_SUCCESS,
  SAVE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_ALL_REQUEST,
  GET_ALL_SUCCESS,
  GET_ALL_FAILURE,
  DESTROY_USER_REQUEST,
  DESTROY_USER_SUCCESS,
  DESTROY_USER_FAILURE,
  GET_DRAFT_USER_REQUEST,
  GET_DRAFT_USER_SUCCESS,
  GET_DRAFT_USER_FAILURE,
  SAVE_DRAFT_USER,
  SAVE_DRAFT_USER_FAILURE,
  FILL_DRAFT_USER,
  FILL_DRAFT_USER_FAILURE,
  DELETE_DRAFT_USER,
  DELETE_DRAFT_USER_REQUEST,
  DELETE_DRAFT_USER_SUCCESS,
  DELETE_DRAFT_USER_FAILURE,
  CLEAR_USER,
} from '../actions/userActions';

/**
 * save user
 */
export function* saveUserSaga(data) {
  try {
    const response = yield call(api.save, data.payload);

    yield put({
      type: SAVE_USER_SUCCESS,
      payload: response,
    });

    yield put({
      type: CLEAR_USER,
    });

    yield put({
      type: DELETE_DRAFT_USER_REQUEST,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SAVE_USER_FAILURE,
      payload: err,
    });
  }
}

/**
 * update user
 */
export function* updateUserSaga(data) {
  try {
    const response = yield call(api.update, data.payload);

    yield put({
      type: UPDATE_USER_SUCCESS,
      payload: response,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_USER_FAILURE,
      payload: err,
    });
  }
}

/**
 * get user
 */
export function* getUserSaga(data) {
  try {
    const response = yield call(api.find, data.payload);

    console.log(response);
    yield put({
      type: GET_USER_SUCCESS,
      payload: response,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_USER_FAILURE,
      payload: err,
    });
  }
}

/**
 * get all users
 */
export function* getAllUsersSaga(data) {
  try {
    const response = yield call(api.findAll, data.payload);

    yield put({
      type: GET_ALL_SUCCESS,
      payload: response,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_ALL_FAILURE,
      payload: err,
    });
  }
}

/**
 * get all users
 */
export function* destroyUserSaga(data) {
  try {
    const response = yield call(api.destroy, data.payload);

    yield put({
      type: DESTROY_USER_SUCCESS,
      payload: response,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DESTROY_USER_FAILURE,
      payload: err,
    });
  }
}

/**
 * save draft user
 */
export function* saveDraftUserSaga(data) {
  try {
    yield call(api.saveDraft, data.payload);
  } catch (err) {
    console.error(err);
    yield put({
      type: SAVE_DRAFT_USER_FAILURE,
      payload: err,
    });
  }
}

/**
 * get draft user
 */
export function* getDraftUserSaga() {
  try {
    const response = yield call(api.getDraft);

    yield put({
      type: GET_DRAFT_USER_SUCCESS,
      payload: response,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_DRAFT_USER_FAILURE,
      payload: err,
    });
  }
}

/**
 * get draft user
 */
export function* fillDraftUserSaga() {
  try {
    const draft = yield select(state => state.draft.user);

    yield put({
      type: GET_USER_SUCCESS,
      payload: { ...draft, step: undefined },
    });

    yield call(api.destroyDraft);

    yield put({
      type: DELETE_DRAFT_USER_REQUEST,
    });
  } catch (err) {
    yield put({
      type: FILL_DRAFT_USER_FAILURE,
      payload: err,
    });
  }
}

/**
 * get draft user
 */
export function* deleteDraftUserSaga() {
  try {
    yield put({
      type: DELETE_DRAFT_USER,
    });

    yield call(api.destroyDraft);

    yield put({
      type: DELETE_DRAFT_USER_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: DELETE_DRAFT_USER_FAILURE,
      payload: err,
    });
  }
}

/**
 * User Sagas
 */
export default function* user() {
  yield all([
    takeLatest(SAVE_USER_REQUEST, saveUserSaga),
    takeLatest(UPDATE_USER_REQUEST, updateUserSaga),
    takeLatest(GET_USER_REQUEST, getUserSaga),
    takeLatest(GET_ALL_REQUEST, getAllUsersSaga),
    takeLatest(DESTROY_USER_REQUEST, destroyUserSaga),
    takeLatest(SAVE_DRAFT_USER, saveDraftUserSaga),
    takeLatest(GET_DRAFT_USER_REQUEST, getDraftUserSaga),
    takeLatest(FILL_DRAFT_USER, fillDraftUserSaga),
    takeLatest(DELETE_DRAFT_USER_REQUEST, deleteDraftUserSaga),
  ]);
}
