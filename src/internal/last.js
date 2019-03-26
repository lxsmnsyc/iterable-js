/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import Iterable from '../iterable';
import { isIterable } from './utils';

/**
 * @ignore
 */
const last = (iterable) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.last (Iterable expected)');
  }
  return new Iterable(function* () {
    let v;
    for (const i of iterable) {
      v = i;
    }
    yield v;
  });
};

export default last;
