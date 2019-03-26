/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */

import Iterable from '../iterable';
import { isIterable, BadArgumentError, isFunction } from './utils';

/**
 * @ignore
 */
const takeWhile = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.takeWhile', 'Iterable');
  }
  if (!isFunction(predicate)) {
    throw new BadArgumentError(2, 'Iterable.takeWhile', 'function');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      if (predicate(i)) {
        yield i;
      } else {
        return;
      }
    }
  });
};

export default takeWhile;
