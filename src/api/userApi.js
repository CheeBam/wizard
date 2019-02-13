import Database from "../database";

const save = async (data) => {
    return await Database.save('users', data);
};

const update = async (data) => {
    const {id, values} = data;

    return await Database.update('users', id, values);
};

const find = async (id) => {
    const x = await Database.getById('users', id);
    console.log(x);
    return x;
};

const findAll = async (meta) => {
    return await Database.getAll('users', meta);
};

const destroy = async (id) => {
    return await Database.destroy('users', id);
};

export default {
    find,
    findAll,
    save,
    update,
    destroy,
};
