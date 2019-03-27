import concat from './concat';
import { defineField, IterableCheck } from './utils';
/**
 * @ignore
 */
const FIELD = defineField('startWith');
/**
 * @ignore
 */
export default (iterable, ...iterables) => {
  IterableCheck(iterable, 1, FIELD);
  return concat(...iterables, iterable);
};
