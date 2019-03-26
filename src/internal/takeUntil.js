/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */

import Iterable from '../iterable';
import { isIterable, BadArgumentError, isFunction } from './utils';

/**
 * @ignore
 */
const takeUntil = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.takeUntil', 'Iterable');
  }
  if (!isFunction(predicate)) {
    throw new BadArgumentError(2, 'Iterable.takeUntil', 'function');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      if (!predicate(i)) {
        yield i;
      } else {
        return;
      }
    }
  });
};

export default takeUntil;
