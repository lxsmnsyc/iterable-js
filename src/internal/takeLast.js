/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { isIterable, isNumber, BadArgumentError } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const takeLast = (iterable, count) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.takeLast', 'Iterable');
  }
  if (!isNumber(count)) {
    throw new BadArgumentError(2, 'Iterable.takeLast', 'number');
  }
  if (count < 0) {
    throw new BadArgumentError(2, 'Iterable.takeLast', 'positive number');
  }

  return new Iterable(function* () {
    const buffer = [];

    for (const i of iterable) {
      if (count === 0) {
        yield i;
      } else {
        buffer.push(i);
      }
    }

    for (const i of buffer.slice(-count)) {
      yield i;
    }
  });
};

export default takeLast;
