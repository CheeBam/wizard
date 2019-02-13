/**
 * @module Sagas/Task
 * @desc Task
 */

import api from '../api/userApi';

import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
    SAVE_USER_REQUEST, SAVE_USER_SUCCESS, SAVE_USER_FAILURE,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
    GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE,
    GET_ALL_REQUEST, GET_ALL_SUCCESS, GET_ALL_FAILURE,
    DESTROY_USER_REQUEST, DESTROY_USER_SUCCESS, DESTROY_USER_FAILURE,
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
 * Task Sagas
 */
export default function* user() {
    yield all([
        takeLatest(SAVE_USER_REQUEST, saveUserSaga),
        takeLatest(UPDATE_USER_REQUEST, updateUserSaga),
        takeLatest(GET_USER_REQUEST, getUserSaga),
        takeLatest(GET_ALL_REQUEST, getAllUsersSaga),
        takeLatest(DESTROY_USER_REQUEST, destroyUserSaga),
    ]);
}

