import { defineField, PositiveNumberCheck } from './utils';

const FIELD = defineField('slice');
export default (iterable, start, end) => {
  PositiveNumberCheck(start, 2, FIELD);
  PositiveNumberCheck(end, 3, FIELD);
};