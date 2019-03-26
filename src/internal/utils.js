/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */

/**
 * @ignore
 */
export const ITERATOR = Symbol.iterator;
/**
 * @ignore
 */
export const isFunction = x => typeof x === 'function';
/**
 * @ignore
 */
export const isNumber = x => typeof x === 'number';
/**
 * @ignore
 */
export const isUndefined = x => typeof x === 'undefined';

/**
 * @ignore
 */
export const isIterable = x => !isUndefined(x) && typeof x[ITERATOR] === 'function';
/**
 * @ignore
 */
export class BadArgumentError extends TypeError {
  constructor(argumentNo, methodName, expectedType) {
    super();
    this.message = `bad argument #${argumentNo} to ${methodName} (${expectedType} expected)`;
  }
}