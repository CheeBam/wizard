import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '../api/staticApi';
import {
  GET_LANGUAGES_REQUEST,
  GET_LANGUAGES_SUCCESS,
  GET_LANGUAGES_FAILURE,
  GET_SKILLS_REQUEST,
  GET_SKILLS_SUCCESS,
  GET_SKILLS_FAILURE,
  GET_HOBBIES_REQUEST,
  GET_HOBBIES_SUCCESS,
  GET_HOBBIES_FAILURE,
} from '../actions/staticActions';

/**
 * Get languages
 */
export function* getLanguagesSaga() {
  try {
    const response = yield call(api.getLanguages);

    yield put({
      type: GET_LANGUAGES_SUCCESS,
      payload: response,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_LANGUAGES_FAILURE,
      payload: err,
    });
  }
}

/**
 * Get skills
 */
export function* getSkillsSaga() {
  try {
    const response = yield call(api.getSkills);

    yield put({
      type: GET_SKILLS_SUCCESS,
      payload: response,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_SKILLS_FAILURE,
      payload: err,
    });
  }
}

/**
 * Get hobbies
 */
export function* getHobbiesSaga() {
  try {
    const response = yield call(api.getHobbies);

    yield put({
      type: GET_HOBBIES_SUCCESS,
      payload: response,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_HOBBIES_FAILURE,
      payload: err,
    });
  }
}

/**
 * Static sagas
 */
export default function* staticSagas() {
  yield all([
    takeLatest(GET_LANGUAGES_REQUEST, getLanguagesSaga),
    takeLatest(GET_SKILLS_REQUEST, getSkillsSaga),
    takeLatest(GET_HOBBIES_REQUEST, getHobbiesSaga),
  ]);
}
