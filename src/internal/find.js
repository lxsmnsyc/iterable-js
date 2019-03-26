/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import Iterable from '../iterable';
import { isIterable, BadArgumentError, isFunction } from './utils';
/**
 * @ignore
 */
const find = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.find', 'Iterable');
  }
  if (!isFunction(predicate)) {
    throw new BadArgumentError(2, 'Iterable.find', 'function');
  }
  return new Iterable(function* () {
    let c = 0;
    for (const i of iterable) {
      if (predicate(i)) {
        yield c;
        return;
      }
      c += 1;
    }
    yield -1;
  });
};

export default find;
