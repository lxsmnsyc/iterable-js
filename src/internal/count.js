/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { isIterable } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const count = (iterable) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.count (Iterable expected)');
  }

  return new Iterable(function* () {
    let c = 0;
    // eslint-disable-next-line no-unused-vars
    for (const i of iterable) {
      c += 1;
    }
    yield c;
  });
};

export default count;
