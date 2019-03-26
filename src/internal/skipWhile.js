/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */

import Iterable from '../iterable';
import { isIterable, BadArgumentError, isFunction } from './utils';

/**
 * @ignore
 */
const skipWhile = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.skipUntil', 'Iterable');
  }
  if (!isFunction(predicate)) {
    throw new BadArgumentError(2, 'Iterable.skipUntil', 'function');
  }
  return new Iterable(function* () {
    let flag = true;
    for (const i of iterable) {
      if (flag) {
        flag = predicate(i);
      }
      if (!flag) {
        yield i;
      }
    }
  });
};

export default skipWhile;
