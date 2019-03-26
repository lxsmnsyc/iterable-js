/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import Iterable from '../iterable';
import { isIterable, BadArgumentError, isFunction } from './utils';
/**
 * @ignore
 */
const all = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.all', 'Iterable');
  }
  if (!isFunction(predicate)) {
    throw new BadArgumentError(2, 'Iterable.all', 'function');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      if (!predicate(i)) {
        yield false;
        return;
      }
    }
    yield true;
  });
};

export default all;
