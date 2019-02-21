import Database from '../database';

const save = async data => {
  const result = await Database.save('users', data);
  return result;
};

const update = async data => {
  const { id, values } = data;

  const result = await Database.update('users', id, values);
  return result;
};

const find = async id => {
  const result = await Database.getById('users', id);
  return result;
};

const findAll = async meta => {
  const result = await Database.getAll('users', meta);
  return result;
};

const destroy = async id => {
  const result = await Database.destroy('users', id);
  return result;
};

const saveDraft = async data => {
  const result = await Database.updateOrCreate('draft', 1, data);
  return result;
};

const getDraft = async () => {
  const result = await Database.getById('draft', 1);
  return result;
};

const destroyDraft = async () => {
  const result = await Database.destroy('draft', 1);
  return result;
};

export default {
  find,
  findAll,
  save,
  update,
  destroy,
  saveDraft,
  getDraft,
  destroyDraft,
};
