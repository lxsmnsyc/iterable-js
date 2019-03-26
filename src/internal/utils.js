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

/**
 * @ignore
 */
export const toGenerator = (iterable, each) => function* () {
  for (const i of iterable) {
    yield each(i);
  }
};
