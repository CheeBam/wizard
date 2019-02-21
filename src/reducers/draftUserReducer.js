import Immutable from 'seamless-immutable';

import {
  GET_DRAFT_USER_REQUEST,
  GET_DRAFT_USER_SUCCESS,
  GET_DRAFT_USER_FAILURE,
  DELETE_DRAFT_USER,
} from '../actions/userActions';

export const INITIAL_STATE = Immutable({
  fetching: false,
  error: false,
  exists: false,
  user: {},
});

export default function draftUserReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_DRAFT_USER_REQUEST:
      return state.merge({
        fetching: true,
        error: false,
      });

    case GET_DRAFT_USER_FAILURE:
      return state.merge({
        fetching: false,
        error: true,
      });

    case GET_DRAFT_USER_SUCCESS:
      return state.merge(
        {
          fetching: false,
          error: false,
          exists: action.payload && Boolean(action.payload.username),
          user: action.payload,
        },
        { deep: true }
      );

    case DELETE_DRAFT_USER:
      return state.merge({
        fetching: false,
        error: false,
        exists: false,
        user: INITIAL_STATE.user,
      });

    default:
      return state;
  }
}
