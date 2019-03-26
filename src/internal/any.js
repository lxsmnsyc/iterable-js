/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import Iterable from '../iterable';
import { isIterable, BadArgumentError, isFunction } from './utils';
/**
 * @ignore
 */
const any = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.any', 'Iterable');
  }
  if (!isFunction(predicate)) {
    throw new BadArgumentError(2, 'Iterable.any', 'function');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      if (predicate(i)) {
        yield true;
        return;
      }
    }
    yield false;
  });
};

export default any;
