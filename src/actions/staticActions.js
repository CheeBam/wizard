export const GET_LANGUAGES_REQUEST = 'GET_LANGUAGES_REQUEST';
export const GET_LANGUAGES_SUCCESS = 'GET_LANGUAGES_SUCCESS';
export const GET_LANGUAGES_FAILURE = 'GET_LANGUAGES_FAILURE';
export const GET_SKILLS_REQUEST = 'GET_SKILLS_REQUEST';
export const GET_SKILLS_SUCCESS = 'GET_SKILLS_SUCCESS';
export const GET_SKILLS_FAILURE = 'GET_SKILLS_FAILURE';
export const GET_HOBBIES_REQUEST = 'GET_HOBBIES_REQUEST';
export const GET_HOBBIES_SUCCESS = 'GET_HOBBIES_SUCCESS';
export const GET_HOBBIES_FAILURE = 'GET_HOBBIES_FAILURE';

export function getLanguagesAction(payload) {
  return { type: GET_LANGUAGES_REQUEST, payload };
}

export function getSkillsAction(payload) {
  return { type: GET_SKILLS_REQUEST, payload };
}

export function getHobbiesAction(payload) {
  return { type: GET_HOBBIES_REQUEST, payload };
}
