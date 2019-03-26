import { isIterable, isNumber, BadArgumentError } from './utils';
import take from './take';
import skip from './skip';

/**
 * @ignore
 */
const split = (iterable, count) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.split', 'Iterable');
  }
  if (!isNumber(count)) {
    throw new BadArgumentError(2, 'Iterable.split', 'number');
  }
  if (count < 0) {
    throw new BadArgumentError(2, 'Iterable.split', 'positive number');
  }

  return [take(iterable, count), skip(iterable, count)];
};

export default split;
