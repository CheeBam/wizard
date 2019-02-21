import Database from '../database';

const getLanguages = async (meta = {}) => {
  const result = await Database.getAll('languages', meta);
  return result;
};

const getSkills = async (meta = {}) => {
  const result = await Database.getAll('skills', meta);
  return result;
};

const getHobbies = async (meta = {}) => {
  const result = await Database.getAll('hobbies', meta);
  return result;
};

export default {
  getLanguages,
  getSkills,
  getHobbies,
};
