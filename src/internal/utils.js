/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */

/**
 * @ignore
 */
export const ITERATOR = Symbol.iterator;

/**
 * @ignore
 */
export const isIterable = x => typeof x[ITERATOR] === 'function';
