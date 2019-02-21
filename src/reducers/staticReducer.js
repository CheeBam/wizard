import Immutable from 'seamless-immutable';
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

export const INITIAL_STATE = Immutable({
  fetching: false,
  error: false,
  languages: [],
  skills: [],
  hobbies: [],
});

export default function staticReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_LANGUAGES_REQUEST:
    case GET_SKILLS_REQUEST:
    case GET_HOBBIES_REQUEST:
      return state.merge({
        fetching: true,
        error: false,
      });

    case GET_LANGUAGES_FAILURE:
    case GET_SKILLS_FAILURE:
    case GET_HOBBIES_FAILURE:
      return state.merge({
        fetching: false,
        error: true,
      });

    case GET_LANGUAGES_SUCCESS:
      return state.merge({
        fetching: false,
        error: false,
        languages: action.payload,
      });

    case GET_SKILLS_SUCCESS:
      return state.merge({
        fetching: false,
        error: false,
        skills: action.payload,
      });

    case GET_HOBBIES_SUCCESS:
      return state.merge({
        fetching: false,
        error: false,
        hobbies: action.payload,
      });

    default:
      return state;
  }
}
