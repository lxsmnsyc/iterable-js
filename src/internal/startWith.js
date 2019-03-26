import concat from './concat';
import { isIterable, BadArgumentError } from './utils';
/**
 * @ignore
 */
const startWith = (iterable, ...iterables) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.startWith', 'Iterable');
  }

  return concat(...iterables, iterable);
};

export default startWith;
