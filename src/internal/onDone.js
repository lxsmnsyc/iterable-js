/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { isIterable, BadArgumentError, isFunction } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const onDone = (iterable, fn) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.onDone', 'Iterable');
  }
  if (!isFunction(fn)) {
    throw new BadArgumentError(2, 'Iterable.onDone', 'function');
  }

  return new Iterable(function* () {
    for (const i of iterable) {
      yield i;
    }
    fn();
  });
};

export default onDone;
