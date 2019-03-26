/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import Iterable from '../iterable';
import { isIterable } from './utils';

/**
 * @ignore
 */
const map = (iterable, mapper) => {
  if (!(isIterable(iterable))) {
    throw new TypeError('bad argument #1 to Iterable.map (Iterable expected)');
  }
  if (typeof mapper !== 'function') {
    throw new TypeError('bad argument #2 to Iterable.map (function expected)');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      yield mapper(i);
    }
  });
};

export default map;
