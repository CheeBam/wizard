import Database from "../database";

const getLanguages = async (meta = {}) => {
    return await Database.getAll('languages', meta);
};

const getSkills = async (meta = {}) => {
    return await Database.getAll('skills', meta);
};

const getHobbies = async (meta = {}) => {
    return await Database.getAll('hobbies', meta);
};

export default {
    getLanguages,
    getSkills,
    getHobbies,
};
