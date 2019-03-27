/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { defineField, IterableCheck } from './utils';
import find from './find';
/**
 * @ignore
 */
const FIELD = defineField('indexOf');
/**
 * @ignore
 */
export default (iterable, value) => {
  IterableCheck(iterable, 1, FIELD);
  return find(iterable, x => x === value);
};
