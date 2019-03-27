/* eslint-disable no-restricted-syntax */
import {
  isIterable, FunctionCheck, IterableCheck, defineField,
} from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const FIELD = defineField('compose');
/**
 * @ignore
 */
export default (iterable, ...composers) => {
  IterableCheck(iterable, 1, FIELD);
  let i = 1;

  let result = iterable;
  for (const c of composers) {
    i += 1;
    FunctionCheck(c, i, FIELD);
    result = c(result);

    if (!isIterable(result)) {
      throw new TypeError('Iterable.compose: a composer function returned a non-Iterable.');
    }
  }

  if (result instanceof Iterable) {
    return result;
  }
  return new Iterable(result);
};
