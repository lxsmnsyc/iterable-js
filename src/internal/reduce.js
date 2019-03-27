/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { isIterable, BadArgumentError, isFunction } from './utils';
import Iterable from '../iterable';
/**
 * @ignore
 */
const reduce = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.reduce', 'Iterable');
  }
  if (!isFunction(predicate)) {
    throw new BadArgumentError(2, 'Iterable.reduce', 'function');
  }

  return new Iterable(function* () {
    let acc;

    for (const i of iterable) {
      acc = predicate(acc, i);
    }

    yield acc;
  });
};

export default reduce;
