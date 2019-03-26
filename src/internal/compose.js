/* eslint-disable no-restricted-syntax */
import { isIterable, BadArgumentError, isFunction } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const compose = (iterable, ...composers) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.compose', 'Iterable');
  }
  let i = 1;

  let result = iterable;
  for (const c of composers) {
    i += 1;
    if (!isFunction(c)) {
      throw new BadArgumentError(i, 'Iterable.compose', 'function');
    } else {
      result = c(result);

      if (!isIterable(result)) {
        throw new TypeError('Iterable.compose: a composer function returned a non-Iterable.');
      }
    }
  }

  if (result instanceof Iterable) {
    return result;
  }
  return new Iterable(result);
};

export default compose;
