import Database from './index';
import { SYSTEM_LANGUAGES, SYSTEM_SKILLS, SYSTEM_HOBBIES } from './data';

export const saveLanguages = async () => {
  let id = 1;
  for (let key in SYSTEM_LANGUAGES) {
    await Database.save('languages', {
      id,
      value: key,
      label: SYSTEM_LANGUAGES[key],
    });
    id++;
  }
};

export const saveSkills = async () => {
  const skills = SYSTEM_SKILLS.split(';');

  for (let i = 0; i < skills.length; i++) {
    await Database.save('skills', {
      id: i + 1,
      value: i + 1,
      label: skills[i].trim(),
    });
  }
};

export const saveHobbies = async () => {
  const hobbies = SYSTEM_HOBBIES.split(';');

  for (let i = 0; i < hobbies.length; i++) {
    await Database.save('hobbies', {
      id: i + 1,
      value: i + 1,
      label: hobbies[i].trim(),
    });
  }
};
