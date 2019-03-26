/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import Iterable from '../iterable';
import { isIterable } from './utils';
/**
 * @ignore
 */
const find = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.find (Iterable expected)');
  }
  if (typeof predicate !== 'function') {
    throw new TypeError('bad argument #2 to Iterable.predicate (function expected)');
  }
  return new Iterable(function* () {
    let c = 0;
    for (const i of iterable) {
      if (predicate(i)) {
        yield c;
        return;
      }
      c += 1;
    }
    yield -1;
  });
};

export default find;
