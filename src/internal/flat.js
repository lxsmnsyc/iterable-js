/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import Iterable from '../iterable';
import { isIterable, BadArgumentError } from './utils';
/**
 * @ignore
 */
const flat = (iterable) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.flat', 'Iterable');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      if (isIterable(i)) {
        for (const e of i) {
          yield e;
        }
      } else {
        yield i;
      }
    }
  });
};

export default flat;
