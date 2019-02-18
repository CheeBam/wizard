import Immutable from 'seamless-immutable';

import {
    SAVE_USER_REQUEST, SAVE_USER_SUCCESS, SAVE_USER_FAILURE,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
    GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE,
    GET_ALL_REQUEST, GET_ALL_SUCCESS, GET_ALL_FAILURE,
    DESTROY_USER_SUCCESS, CHANGE_USER_AVATAR, CLEAR_USER,
} from '../actions/userActions';

import { DEFAULT_AVATAR } from '../helpers/constants';

export const INITIAL_STATE = Immutable({
    fetching: false,
    error: false,
    user: {
        id: null,
        avatar: DEFAULT_AVATAR,
        username: null,
        password: null,
        firstName: null,
        lastName: null,
        email: null,
        address: null,
        birthday: null,
        sex: null,
        facebook: null,
        github: null,
        fax: null,
        company: null,
        phones: ['', ''],
        lang: {},
        skills: [],
        hobbies: [],
        additional: null,
    },
    list: {
        meta: {},
        data: [],
    }
});

Immutable.without(INITIAL_STATE, 'phones');

export default function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case SAVE_USER_REQUEST:
        case UPDATE_USER_REQUEST:
        case GET_USER_REQUEST:
            return state.merge({
                fetching: true,
                error: false,
            });

        case SAVE_USER_FAILURE:
        case UPDATE_USER_FAILURE:
        case GET_USER_FAILURE:
        case GET_ALL_FAILURE:
            return state.merge({
                fetching: false,
                error: true,
            });

        case SAVE_USER_SUCCESS:
        case UPDATE_USER_SUCCESS:
        case GET_USER_SUCCESS:
            return state.merge({
                fetching: false,
                error: false,
                user: action.payload
            }, { deep: true });

        case GET_ALL_REQUEST:
            return state.merge({
                fetching: true,
                error: false,
                list: action.payload,
            }, { deep: true });

        case GET_ALL_SUCCESS:
            return state.merge({
                fetching: false,
                error: false,
                list: {
                    data: action.payload
                },
            }, { deep: true });

        case DESTROY_USER_SUCCESS:
            return state.merge({
                fetching: false,
                error: false,
                list: {
                    data: state.list.data.filter(el => el.id !== action.payload),
                },
            });

        case CHANGE_USER_AVATAR:
            return state.merge({
                user: {
                    avatar: action.payload,
                },
            }, { deep: true });

        case CLEAR_USER:
            return state.merge({
                user: INITIAL_STATE.user,
            });

        default:
            return state;
    }
}
