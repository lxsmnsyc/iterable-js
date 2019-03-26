import { isIterable } from './utils';
import take from './take';
import skip from './skip';

const split = (iterable, count) => {
  if (!isIterable(iterable)) {
    throw new TypeError('expects an object that implements the Iteration Protocol');
  }
  if (typeof count !== 'number') {
    throw new TypeError('expects count to be a number.');
  }
  if (count < 0) {
    throw new TypeError('expects "count" to be a positive number.');
  }

  return [take(iterable, count), skip(iterable, count)];
};

export default split;
