import { DateTime } from 'luxon';
import { saveLanguages, saveSkills, saveHobbies } from './seeder';

export default class Database {

    static name = 'wizard';
    static version = 1;
    static instance = null;
    static connection = null;

    static connect () {
        return new Promise((resolve, reject) => {
            const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

            try {
                if (indexedDB) {
                    const connection = indexedDB.open(Database.name, Database.version);
                    let migrated = false;

                    connection.onupgradeneeded = async (e) => {
                        const upgradeDB = e.target.result;
                        migrated = true;

                        if (!upgradeDB.objectStoreNames.contains("users")) {
                            const objectStore = upgradeDB.createObjectStore("users", {
                                keyPath: 'id',
                                autoIncrement: true
                            });
                            objectStore.createIndex('users_id_unique', 'id', {unique: true});
                            objectStore.createIndex('users_username_unique', 'username', {unique: true});
                            objectStore.createIndex('users_email_unique', 'email', {unique: true});
                        }

                        if (!upgradeDB.objectStoreNames.contains("languages")) {
                            const objectStore = upgradeDB.createObjectStore("languages", {
                                keyPath: 'id',
                                autoIncrement: true
                            });
                            objectStore.createIndex('languages_id_unique', 'id', {unique: true});
                            objectStore.createIndex('languages_value_unique', 'value', {unique: true});
                        }

                        if (!upgradeDB.objectStoreNames.contains("skills")) {
                            const objectStore = upgradeDB.createObjectStore("skills", {
                                keyPath: 'id',
                                autoIncrement: true
                            });
                            objectStore.createIndex('skills_id_unique', 'id', {unique: true});
                        }

                        if (!upgradeDB.objectStoreNames.contains("hobbies")) {
                            const objectStore = upgradeDB.createObjectStore("hobbies", {
                                keyPath: 'id',
                                autoIncrement: true
                            });
                            objectStore.createIndex('hobbies_id_unique', 'id', {unique: true});
                        }

                        if (!upgradeDB.objectStoreNames.contains("unsaved")) {
                            const objectStore = upgradeDB.createObjectStore("unsaved", {
                                keyPath: 'id',
                                autoIncrement: true
                            });
                            objectStore.createIndex('unsaved_id_unique', 'id', {unique: true});
                        }

                        console.log('The database is onupgradeneeded');
                    };

                    connection.onsuccess = async (e) => {
                        Database.instance = e.target.result;
                        if (migrated) {
                            await Database.seed();
                        }
                        resolve();
                    };
                }
            } catch (e) {
                reject(e);
            }
        });
    }

    static async seed () {
        if (Database.instance.objectStoreNames.contains("languages")) {
            const item = await Database.getById('languages', 1);
            if (!item) {
                await saveLanguages();
                console.log('Seeded languages')
            }
        }

        if (Database.instance.objectStoreNames.contains("skills")) {
            const item = await Database.getById('skills', 1);
            if (!item) {
                await saveSkills();
                console.log('Seeded skills')
            }
        }

        if (Database.instance.objectStoreNames.contains("hobbies")) {
            const item = await Database.getById('hobbies', 1);
            if (!item) {
                await saveHobbies();
                console.log('Seeded hobbies')
            }
        }
    }

    static close() {
        if (Database.connection) {
            Database.connection.close();
            Database.instance = null;
        }
    }

    /**
     * Get all data
     *
     * @param table table name
     * @param meta search, order & pagination data
     * @returns Object field
     */
    static getAll = async (table, meta) => {
        return new Promise(async (resolve) => {
            try {
                if (!Database.instance) {
                    await Database.connect();
                }

                console.log('DB fetch all', meta);

                const store = Database.instance.transaction([table], 'readonly').objectStore(table);
                const index = store.index(`${table}_id_unique`);
                const getAllKeysRequest = index.getAll();

                getAllKeysRequest.onsuccess = function() {
                    console.log('Fetch all success');
                    resolve(getAllKeysRequest.result);
                };

            } catch (e) {
                console.error('DB fetch all error', e);
            }
        });
    };

    /**
     * Get data by id
     *
     * @param table table name
     * @param id needed id
     * @returns Object field
     */
    static getById = async (table, id) => {
        return new Promise(async (resolve) => {
            try {
                if (!Database.instance) {
                    await Database.connect();
                }

                console.log('DB fetch', id);

                const store = Database.instance.transaction([table], 'readonly').objectStore(table);
                const index = store.index(`${table}_id_unique`);
                const request = index.get(+id);

                request.onsuccess = (e) => {
                    console.log('Fetch success');
                    resolve(e.target.result);
                };

            } catch (e) {
                console.error('DB fetch error', e);
            }
        });
    };

    /**
     * Save data
     *
     * @param table table name
     * @param data inserted data
     * @returns Object field
     */
    static save = async (table, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!Database.instance) {
                    await Database.connect();
                }

                console.log('DB save', data);

                const local = DateTime.local().toISO();
                const saveData = { ...data, updatedAt: local, createdAt: local };
                delete saveData['id'];

                console.log(saveData);

                const request = Database.instance.transaction([table], 'readwrite')
                    .objectStore(table)
                    .add(saveData);

                request.onsuccess = function (e) {
                    console.log('Save success');
                    resolve({ ...data, id: e.target.result });
                };

                request.onerror = function (e) {
                    reject('Save error', e);
                };
            } catch (e) {
                console.error('DB save error', e);
            }
        })
    };



    /**
     * Update field by id
     *
     * @param table table name
     * @param id needed id
     * @param data updated fields
     * @returns Object field
     */
    static update = async (table, id, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!Database.instance) {
                    await Database.connect();
                }

                console.log('DB update', id, data);

                const store = Database.instance.transaction([table], 'readwrite').objectStore(table);
                const index = store.index(`${table}_id_unique`);
                const key = IDBKeyRange.only(+id);

                const request = index.openCursor(key);

                request.onsuccess = (e) => {
                    const cursor = e.target.result;

                    if (cursor) {
                        let item = {...cursor.value, ...data, updatedAt: DateTime.local().toISO() };
                        console.log(item);
                        cursor.update(item);
                        console.log('Update success');
                        resolve(item);
                    } else {
                        reject('Update error');
                    }
                };

                request.onerror = (e) => {
                    reject('Update error', e);
                };
            } catch (e) {
                console.error('DB update error', e);
            }
        });
    };

    /**
     * Delete field by id
     *
     * @param table table name
     * @param id deleting id
     * @returns Object field
     */
    static destroy = async (table, id) => {
        return new Promise(async (resolve) => {
            try {
                if (!Database.instance) {
                    await Database.connect();
                }

                console.log('DB delete', id);

                const store = Database.instance.transaction([table], 'readwrite').objectStore(table);
                const key = IDBKeyRange.only(id);

                const request = store.delete(key);

                request.onsuccess = (e) => {
                    console.log('Delete success');
                    resolve(id);
                };

            } catch (e) {
                console.error('DB delete error', e);
            }
        });
    };
}


