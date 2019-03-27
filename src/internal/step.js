/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { isIterable, BadArgumentError, isNumber } from './utils';
import Iterable from '../iterable';
/**
 * @ignore
 */
const step = (iterable, count) => {
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
    let c = 0;
    for (const i of iterable) {
      if (c % count === 0) {
        yield i;
      }
      c += 1;
    }
  });
};
export default step;
