import take from './take';
import skip from './skip';
import { defineField, IterablePositiveNumberCheck } from './utils';
/**
 * @ignore
 */
const FIELD = defineField('split');
/**
 * @ignore
 */
export default (iterable, count) => {
  IterablePositiveNumberCheck(iterable, count, FIELD);
  return [take(iterable, count), skip(iterable, count)];
};
