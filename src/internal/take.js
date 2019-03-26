/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { isIterable, BadArgumentError, isNumber } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const take = (iterable, count) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.take', 'Iterable');
  }
  if (!isNumber(count)) {
    throw new BadArgumentError(2, 'Iterable.take', 'number');
  }
  if (count < 0) {
    throw new BadArgumentError(2, 'Iterable.take', 'positive number');
  }

  return new Iterable(function* () {
    let c = count;

    for (const i of iterable) {
      if (c > 0) {
        c -= 1;

        yield i;
      } else {
        return;
      }
    }
  });
};

export default take;
