/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { isIterable, isNumber, BadArgumentError } from './utils';
import Iterable from '../iterable';
/**
 * @ignore
 */
const elementAt = (iterable, index) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.elementAt', 'Iterable');
  }
  if (!isNumber(index)) {
    throw new BadArgumentError(2, 'Iterable.elementAt', 'number');
  }
  if (index < 0) {
    throw new BadArgumentError(2, 'Iterable.elementAt', 'positive number');
  }

  return new Iterable(function* () {
    let c = 0;

    for (const i of iterable) {
      if (c === index) {
        yield i;
        return;
      }
      c += 1;
    }
  });
};

export default elementAt;
