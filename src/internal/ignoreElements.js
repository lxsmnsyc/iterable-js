/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { defineField, IterableCheck } from './utils';
import empty from './empty';

/**
 * @ignore
 */
const FIELD = defineField('reverse');
/**
 * @ignore
 */
export default (iterable) => {
  IterableCheck(iterable, 1, FIELD);
  return empty();
};
