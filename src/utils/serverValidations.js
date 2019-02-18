import Database from '../database';

/**
 * Validate username if exists in users table
 *
 * @param {String} username
 * @param {String} id = null, if id isn't null - exclude current(editing) user
 *
 * @return {null|string}
 */
export async function validateUsername(username, id = null) {
    const result = await Database.getByKey('users', 'username', username);
    if (Boolean(result)) {
        if (id && +result.id === +id) {
            return null;
        }
    } else {
        return null;
    }
    return 'Username already exists';
}

/**
 * Validate email if exists in users table
 *
 * @param {String} email
 * @param {String} id = null, if id isn't null - exclude current(editing) user
 *
 * @return {null|string}
 */
export async function validateEmail(email, id = null) {
    const result = await Database.getByKey('users', 'email', email);
    if (Boolean(result)) {
        if (id && +result.id === +id) {
            return null;
        }
    } else {
        return null;
    }
    return 'Email already exists';
}
