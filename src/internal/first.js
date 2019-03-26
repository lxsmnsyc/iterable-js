/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import Iterable from '../iterable';
import { isIterable, BadArgumentError } from './utils';
/**
 * @ignore
 */
const first = (iterable) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.first', 'Iterable');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      yield i;
      return;
    }
  });
};

export default first;
