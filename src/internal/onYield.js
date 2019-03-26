/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { isIterable, BadArgumentError, isFunction } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const onYield = (iterable, fn) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.onYield', 'Iterable');
  }
  if (!isFunction(fn)) {
    throw new BadArgumentError(2, 'Iterable.onYield', 'function');
  }

  return new Iterable(function* () {
    for (const i of iterable) {
      fn(i);
      yield i;
    }
  });
};

export default onYield;
