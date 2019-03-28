/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import Iterable from '../iterable';
import {
  isIterable, ITERATOR, BadArgumentError, isFunction, isUndefined, defineField, FunctionCheck,
} from './utils';
/**
 * @ignore
 */
const FIELD = defineField('zip');
/**
 * @ignore
 */
const defaultZipper = x => x;
/**
 * @ignore
 */
const zip = (iterables, fn) => {
  if (!(iterables instanceof Array)) {
    throw new BadArgumentError(1, FIELD, 'Array');
  }

  let zipper = fn;

  if (!isUndefined(fn)) {
    if (!isFunction(fn)) {
      FunctionCheck(fn, 2, FIELD);
    }
  } else {
    zipper = defaultZipper;
  }

  return new Iterable(function* () {
    const buffer = [];

    for (const iterable of iterables) {
      let c = 0;
      for (const i of iterable) {
        let current = buffer[c];

        if (isUndefined(current)) {
          current = [];
          buffer[c] = current;
        }

        current.push(i);

        c += 1;
      }
    }

    for (const i of buffer) {
      yield zipper(i);
    }
  });
};

export default zip;
