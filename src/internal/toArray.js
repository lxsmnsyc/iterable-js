/* eslint-disable no-restricted-syntax */
import { defineField, IterableCheck } from './utils';
/**
 * @ignore
 */
const FIELD = defineField('toArray');
/**
 * @ignore
 */
export default (iterable) => {
  IterableCheck(iterable, 1, FIELD);
  const buffer = [];

  for (const i of iterable) {
    buffer.push(i);
  }

  return buffer;
};
