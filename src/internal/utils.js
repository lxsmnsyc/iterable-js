/* eslint-disable valid-typeof */
/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
/**
 * @ignore
 */
export const CLASS_NAME = 'Iterable';
/**
 * @ignore
 */
export const TYPE_FUNC = 'function';
/**
 * @ignore
 */
export const TYPE_NUM = 'number';
/**
 * @ignore
 */
export const TYPE_POS_NUM = 'positive number';
/**
 * @ignore
 */
export const ITERATOR = Symbol.iterator;
/**
 * @ignore
 */
export const isFunction = x => typeof x === TYPE_FUNC;
/**
 * @ignore
 */
export const isNumber = x => typeof x === TYPE_NUM;
/**
 * @ignore
 */
export const isUndefined = x => typeof x === 'undefined' || x === null;

/**
 * @ignore
 */
export const isIterable = x => !isUndefined(x) && isFunction(x[ITERATOR]);
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
export const IterableCheck = (iterable, argNo, field) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(argNo, field, CLASS_NAME);
  }
};
/**
 * @ignore
 */
export const FunctionCheck = (predicate, argNo, field) => {
  if (!isFunction(predicate)) {
    throw new BadArgumentError(argNo, field, TYPE_FUNC);
  }
};
/**
 * @ignore
 */
export const NumberCheck = (num, argNo, field) => {
  if (!isNumber(num)) {
    throw new BadArgumentError(argNo, field, TYPE_NUM);
  }
};
/**
 * @ignore
 */
export const PositiveNumberCheck = (num, argNo, field) => {
  NumberCheck(num, argNo, field);
  if (num < 0) {
    throw new BadArgumentError(argNo, field, TYPE_POS_NUM);
  }
};
/**
 * @ignore
 */
export const IterablePredicateCheck = (iterable, predicate, field) => {
  IterableCheck(iterable, 1, field);
  FunctionCheck(predicate, 2, field);
};
/**
 * @ignore
 */
export const IterablePositiveNumberCheck = (iterable, num, field) => {
  IterableCheck(iterable, 1, field);
  PositiveNumberCheck(num, 2, field);
};
/**
 * @ignore
 */
export const DoubleIterableCheck = (iterable, other, field) => {
  IterableCheck(iterable, 1, field);
  IterableCheck(other, 2, field);
};
/**
 * @ignore
 */
export const defineField = x => `${CLASS_NAME}.${x}`;
