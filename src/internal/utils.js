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
export class BadArgumentError extends TypeError {
  constructor(argumentNo, methodName, expectedType) {
    super();
    this.message = `bad argument #${argumentNo} to ${methodName} (${expectedType} expected)`;
  }
}
/**
 * @ignore
 */
export const isFunction = x => typeof x === 'function';
/**
 * @ignore
 */
export const isNumber = x => typeof x === 'number';
