/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { isIterable, BadArgumentError, isNumber } from './utils';
import Iterable from '../iterable';

const buffer = (iterable, count) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.buffer', 'Iterable');
  }
  if (!isNumber(count)) {
    throw new BadArgumentError(2, 'Iterable.buffer', 'number');
  }
  if (count <= 0) {
    throw new BadArgumentError(2, 'Iterable.buffer', 'positive number');
  }

  return new Iterable(function* () {
    let b = [];

    for (const i of iterable) {
      b.push(i);
      if (b.length === count) {
        yield b;
        b = [];
      }
    }
    if (b.length > 0) {
      yield b;
    }
  });
};
export default buffer;
