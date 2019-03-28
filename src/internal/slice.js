import { defineField, PositiveNumberCheck, IterableCheck } from './utils';
import skip from './skip';
import take from './take';

const FIELD = defineField('slice');
export default (iterable, start, end) => {
  IterableCheck(iterable, 1, FIELD);
  PositiveNumberCheck(start, 2, FIELD);
  PositiveNumberCheck(end, 3, FIELD);

  return skip(take(iterable, end), start);
};
