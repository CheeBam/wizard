export const SAVE_USER_REQUEST = "SAVE_USER_REQUEST";
export const SAVE_USER_SUCCESS = "SAVE_USER_SUCCESS";
export const SAVE_USER_FAILURE = "SAVE_USER_FAILURE";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";
export const GET_ALL_REQUEST = "GET_ALL_REQUEST";
export const GET_ALL_SUCCESS = "GET_ALL_SUCCESS";
export const GET_ALL_FAILURE = "GET_ALL_FAILURE";
export const DESTROY_USER_REQUEST = "DESTROY_USER_REQUEST";
export const DESTROY_USER_SUCCESS = "DESTROY_USER_SUCCESS";
export const DESTROY_USER_FAILURE = "DESTROY_USER_FAILURE";
export const CHANGE_USER_AVATAR = "CHANGE_USER_AVATAR";
export const CHANGE_USER_ADDRESS = "CHANGE_USER_ADDRESS";
export const CLEAR_USER = "CLEAR_USER";

export function saveUserAction(payload) {
    return { type: SAVE_USER_REQUEST, payload };
}

export function updateUserAction(payload) {
    return { type: UPDATE_USER_REQUEST, payload };
}

export function getUserAction(payload) {
    return { type: GET_USER_REQUEST, payload };
}

export function getAllUsersAction(payload) {
    return { type: GET_ALL_REQUEST, payload };
}

export function destroyUserAction(payload) {
    return { type: DESTROY_USER_REQUEST, payload };
}

export function changeAvatarAction(payload) {
    return { type: CHANGE_USER_AVATAR, payload };
}

export function clearUserAction(payload) {
    return { type: CLEAR_USER, payload };
}

export function updateUserSuccessAction(payload) {
    return { type: UPDATE_USER_SUCCESS, payload };
}



