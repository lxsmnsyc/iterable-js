/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import Iterable from '../iterable';
import { isIterable, BadArgumentError } from './utils';

/**
 * @ignore
 */
const last = (iterable) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.last', 'Iterable');
  }
  return new Iterable(function* () {
    let v;
    for (const i of iterable) {
      v = i;
    }
    yield v;
  });
};

export default last;
