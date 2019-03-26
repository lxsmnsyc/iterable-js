import { isIterable, BadArgumentError, isFunction } from './utils';
import filter from './filter';

/**
 * @ignore
 */
const partition = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.partition', 'Iterable');
  }
  if (!isFunction(predicate)) {
    throw new BadArgumentError(2, 'Iterable.partition', 'function');
  }

  return [
    filter(iterable, predicate),
    filter(iterable, x => !predicate(x)),
  ];
};

export default partition;
