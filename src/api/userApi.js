import Database from "../database";

const save = async (data) => {
    return await Database.save('users', data);
};

const update = async (data) => {
    const {id, values} = data;

    return await Database.update('users', id, values);
};

const find = async (id) => {
    return await Database.getById('users', id);
};

const findAll = async (meta) => {
    return await Database.getAll('users', meta);
};

const destroy = async (id) => {
    return await Database.destroy('users', id);
};

const saveDraft = async (data) => {
    return await Database.updateOrCreate('draft', 1, data);
};

const getDraft = async () => {
    return await Database.getById('draft', 1);
};

const destroyDraft = async () => {
    return await Database.destroy('draft', 1);
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
