/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { defineField, IterableCheck } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const FIELD = defineField('reverse');
/**
 * @ignore
 */
export default (iterable) => {
  IterableCheck(iterable, 1, FIELD);
  return new Iterable(function* () {
    const buffer = [];

    for (const i of iterable) {
      buffer.unshift(i);
    }
    for (const i of buffer) {
      yield i;
    }
  });
};
