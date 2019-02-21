import { DateTime } from 'luxon';
import {
  USER_MIN_AGE,
  MAX_IMAGE_SIZE,
  MB_IN_BYTES,
} from '../helpers/constants';

/**
 * Validate email
 *
 * @param {String} email
 *
 * @return {null|string}
 */
export function isEmail(email) {
  // eslint-disable-next-line
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email.toLowerCase()
  )
    ? null
    : 'Invalid email';
}

/**
 * Validate phone
 *
 * @param {String} phone
 *
 * @return {null|string}
 */
export function isPhone(phone) {
  if (phone) {
    // eslint-disable-next-line
    return /(^(\+7)?[\s\-]?\([0-9]{3}\)[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2})$/.test(
      phone.toLowerCase()
    )
      ? null
      : 'Invalid phone';
  }
  return null;
}

/**
 * Validate user age
 *
 * @param {String} date
 *
 * @return {null|string}
 */
export function birthday(date) {
  if (date) {
    try {
      const dt = DateTime.fromFormat(date, 'dd-MM-yy');
      const years = Math.floor(Number(dt.diffNow('years').values.years));
      return years < -USER_MIN_AGE
        ? null
        : `You age must be greater than ${USER_MIN_AGE}`;
    } catch (e) {
      return 'Incorrect date!';
    }
  }
  return null;
}

/**
 * Validate count of selected items
 *
 * @param {Array} selected
 *
 * @return {null|string}
 */
export function minCount(selected) {
  if (Array.isArray(selected)) {
    return selected.length < 3 ? 'Min 3 items' : null;
  }
  return null;
}

/**
 * Validate email
 *
 * @param {any} number
 *
 * @return {null|string}
 */
export function isNumber(number) {
  return Number.isNaN(number) ? 'validation.error.not_a_number' : null;
}

/**
 * Validation for max length
 *
 * @param {Number} length
 *
 * @return {null|string}
 */

export const maxLength = length => value =>
  value && value.length > length ? `Max length is ${length}` : null;

/**
 * Validation for min length
 *
 * @param {Number} length
 *
 * @return {null|string}
 */
export const minLength = length => value =>
  value && value.length < length ? `Min length is ${length}` : null;

/**
 * Confirm password validation
 *
 * @param value
 * @param values
 *
 * @return {null|string}
 */
export function confirmPassword(value, values) {
  const { password } = values;
  return value === password ? null : "Passwords don't match";
}

/**
 * Required validation
 *
 * @param {any} value
 *
 * @return {null|string}
 */
export function required(value) {
  return value ? null : 'Field is required';
}

/**
 * Required object empty validation
 *
 * @param {any} value
 *
 * @return {null|string}
 */
export function requiredNotEmpty(value) {
  if (typeof value === 'object') {
    return Object.keys(value).length ? null : 'Field is required';
  }
  return value ? null : 'Field is required';
}

export function image(value) {
  if (value) {
    if (
      parseInt(value.replace(/=/g, '').length * 0.75, 10) >
      MB_IN_BYTES * MAX_IMAGE_SIZE
    ) {
      return `The image maximum size is ${MAX_IMAGE_SIZE}MB`;
    }
  }
  return null;
}
