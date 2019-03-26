/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { isIterable, BadArgumentError, isNumber } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const skipLast = (iterable, count) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.skipLast', 'Iterable');
  }
  if (!isNumber(count)) {
    throw new BadArgumentError(2, 'Iterable.skipLast', 'number');
  }
  if (count < 0) {
    throw new BadArgumentError(2, 'Iterable.skipLast', 'positive number');
  }

  return new Iterable(function* () {
    const buffer = [];
    let c = 0;
    for (const i of iterable) {
      if (count > 0) {
        buffer.push(i);
        if (c === count) {
          yield buffer.shift();
        } else {
          c += 1;
        }
      } else {
        yield i;
      }
    }
  });
};

export default skipLast;
