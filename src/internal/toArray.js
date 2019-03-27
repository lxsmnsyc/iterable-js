/* eslint-disable no-restricted-syntax */
import { isIterable, BadArgumentError } from './utils';

const toArray = (iterable) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.toArray', 'Iterable');
  }
  const buffer = [];

  for (const i of iterable) {
    buffer.push(i);
  }

  return buffer;
};

export default toArray;
