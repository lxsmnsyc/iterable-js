/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import Iterable from '../iterable';
import { isIterable } from './utils';
/**
 * @ignore
 */
const first = (iterable) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.first (Iterable expected)');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      yield i;
      return;
    }
  });
};

export default first;
