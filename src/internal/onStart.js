/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { isIterable, BadArgumentError, isFunction } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const onStart = (iterable, fn) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.onStart', 'Iterable');
  }
  if (!isFunction(fn)) {
    throw new BadArgumentError(2, 'Iterable.onStart', 'function');
  }

  return new Iterable(function* () {
    fn();
    for (const i of iterable) {
      yield i;
    }
  });
};

export default onStart;
