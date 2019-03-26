/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { isIterable, BadArgumentError, isNumber } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const skip = (iterable, count) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.skip', 'Iterable');
  }
  if (!isNumber(count)) {
    throw new BadArgumentError(2, 'Iterable.skip', 'number');
  }
  if (count < 0) {
    throw new BadArgumentError(2, 'Iterable.skip', 'positive number');
  }

  return new Iterable(function* () {
    let c = count;

    for (const i of iterable) {
      if (c > 0) {
        c -= 1;
      } else {
        yield i;
      }
    }
  });
};

export default skip;
