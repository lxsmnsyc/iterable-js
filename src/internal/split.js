import { isIterable } from './utils';
import take from './take';
import skip from './skip';

/**
 * @ignore
 */
const split = (iterable, count) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.split (Iterable expected)');
  }
  if (typeof count !== 'number') {
    throw new TypeError('bad argument #2 to Iterable.split (number expected)');
  }
  if (count < 0) {
    throw new TypeError('bad argument #2 to Iterable.split (positive number expected)');
  }

  return [take(iterable, count), skip(iterable, count)];
};

export default split;
