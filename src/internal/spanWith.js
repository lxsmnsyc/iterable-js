import { isIterable, isFunction, BadArgumentError } from './utils';
import skipWhile from './skipWhile';
import takeWhile from './takeWhile';

/**
 * @ignore
 */
const spanWith = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.spanWith', 'Iterable');
  }
  if (!isFunction(predicate)) {
    throw new BadArgumentError(2, 'Iterable.spanWith', 'function');
  }

  return [
    takeWhile(iterable, predicate),
    skipWhile(iterable, predicate),
  ];
};

export default spanWith;
