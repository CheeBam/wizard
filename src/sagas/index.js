import { all, fork } from 'redux-saga/effects';

import user from './userSagas';
import staticSaga from './staticSagas';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(user), fork(staticSaga)]);
}
