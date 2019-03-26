/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { BadArgumentError, isIterable } from './utils';
import Iterable from '../iterable';

const cache = (iterable) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.flatMap', 'Iterable');
  }

  const c = [];
  let size = 0;
  return new Iterable(function* () {
    if (size > 0) {
      for (const i of c) {
        yield i;
      }
    }

    let s = size;

    for (const i of iterable) {
      if (s === 0) {
        c.push(i);
        size += 1;
        yield i;
      } else {
        s -= 1;
      }
    }
  });
};

export default cache;
