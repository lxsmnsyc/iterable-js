/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { isIterable, BadArgumentError, isNumber } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const replace = (iterable, index, value) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.replace', 'Iterable');
  }
  if (!isNumber(index)) {
    throw new BadArgumentError(2, 'Iterable.replace', 'number');
  }
  if (index < 0) {
    throw new BadArgumentError(2, 'Iterable.replace', 'positive number');
  }

  return new Iterable(function* () {
    let c = 0;

    for (const i of iterable) {
      if (c === index) {
        yield value;
      } else {
        yield i;
      }
      c += 1;
    }
  });
};

export default replace;
