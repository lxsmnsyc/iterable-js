/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { isIterable, BadArgumentError } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const reverse = (iterable) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.reverse', 'Iterable');
  }

  return new Iterable(function* () {
    const buffer = [];

    for (const i of iterable) {
      buffer.unshift(i);
    }
    for (const i of buffer) {
      yield i;
    }
  });
};

export default reverse;
