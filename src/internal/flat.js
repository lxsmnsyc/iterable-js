/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import Iterable from '../iterable';
import { isIterable } from './utils';
/**
 * @ignore
 */
const flat = (iterable) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.flat (Iterable expected)');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      if (isIterable(i)) {
        for (const e of i) {
          yield e;
        }
      } else {
        yield i;
      }
    }
  });
};

export default flat;
