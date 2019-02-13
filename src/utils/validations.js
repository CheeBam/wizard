/**
 * Validate email
 *
 * @param {String} email
 *
 * @return {boolean}
 */
export function isEmail(email) {
    // eslint-disable-next-line
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email.toLowerCase()
    )
        ? null
        : 'validation.error.invalid_email';
}

/**
 * Validate email
 *
 * @param {any} number
 *
 * @return {String}
 */
export function isNumber(number) {
    return Number.isNaN(number) ? 'validation.error.not_a_number' : '';
}

/**
 * Validation for max length
 *
 * @param {Number} length
 */
export const maxLength = length => value =>
    value && value.length > length ? `validation.error.max${length}` : '';

/**
 * Validation for min length
 *
 * @param {Number} length
 */
export const minLength = length => value =>
    value && value.length < length ? `validation.error.min${length}` : '';

/**
 * Confirm password validation
 *
 * @param value
 * @param values
 * @returns {string}
 */
export function confirmPassword(value, values) {
    const { password } = values;
    return value === password ? '' : 'validation.error.confirmation_password';
}

/**
 * Required validation
 *
 * @param {any} value
 */
export function required(value) {
    return value ? '' : 'validation.error.required';
}
