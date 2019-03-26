/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import Iterable from '../iterable';
import { isIterable } from './utils';
/**
 * @ignore
 */
const any = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.any (Iterable expected)');
  }
  if (typeof predicate !== 'function') {
    throw new TypeError('bad argument #2 to Iterable.any (function expected)');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      if (predicate(i)) {
        yield true;
        return;
      }
    }
    yield false;
  });
};

export default any;
