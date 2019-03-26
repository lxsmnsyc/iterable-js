/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */

import Iterable from '../iterable';
import { isIterable } from './utils';

/**
 * @ignore
 */
const takeWhile = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new TypeError('expects an object that implements the Iteration Protocol');
  }
  if (typeof predicate !== 'function') {
    throw new TypeError('expects the predicate to be a function.');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      let result;

      try {
        result = predicate(i);
      } catch (e) {
        return;
      }
      if (result) {
        yield i;
      } else {
        return;
      }
    }
  });
};

export default takeWhile;
