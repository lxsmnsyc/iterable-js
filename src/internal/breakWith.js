import { isIterable, isFunction, BadArgumentError } from './utils';
import takeUntil from './takeUntil';
import skipUntil from './skipUntil';

/**
 * @ignore
 */
const breakWith = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.breakWith', 'Iterable');
  }
  if (!isFunction(predicate)) {
    throw new BadArgumentError(2, 'Iterable.breakWith', 'function');
  }
  return [
    takeUntil(iterable, predicate),
    skipUntil(iterable, predicate),
  ];
};

export default breakWith;
