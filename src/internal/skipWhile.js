/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */

import Iterable from '../iterable';
import { isIterable } from './utils';

/**
 * @ignore
 */
const skipWhile = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new TypeError('expects an object that implements the Iteration Protocol');
  }
  if (typeof predicate !== 'function') {
    throw new TypeError('expects the predicate to be a function.');
  }
  return new Iterable(function* () {
    let flag = true;
    for (const i of iterable) {
      if (flag) {
        let result;

        try {
          result = predicate(i);
        } catch (e) {
          return;
        }

        flag = result;
      }
      if (!flag) {
        yield i;
      }
    }
  });
};

export default skipWhile;
