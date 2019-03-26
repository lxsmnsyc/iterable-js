/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */

import Iterable from '../iterable';
import { isIterable } from './utils';

/**
 * @ignore
 */
const filter = (iterable, filterFunc) => {
  if (!isIterable(iterable)) {
    throw new TypeError('expects an object that implements the Iteration Protocol');
  }
  if (typeof filterFunc !== 'function') {
    throw new TypeError('expects the filterFunc to be a function.');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      let result;

      try {
        result = filterFunc(i);
      } catch (e) {
        break;
      }

      if (result) {
        yield i;
      }
    }
  });
};

export default filter;
