/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { isIterable, BadArgumentError, isNumber } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const repeat = (iterable, count) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.repeat', 'Iterable');
  }
  if (!isNumber(count)) {
    throw new BadArgumentError(2, 'Iterable.repeat', 'number');
  }
  if (count < 0) {
    throw new BadArgumentError(2, 'Iterable.repeat', 'positive number');
  }

  return new Iterable(function* () {
    for (let c = count; c > 0; c -= 1) {
      for (const i of iterable) {
        yield i;
      }
    }
  });
};

export default repeat;
