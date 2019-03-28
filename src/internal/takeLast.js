/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import Iterable from '../iterable';
import { defineField, IterablePositiveNumberCheck } from './utils';
/**
 * @ignore
 */
const FIELD = defineField('takeLast');
/**
 * @ignore
 */
export default (iterable, count) => {
  IterablePositiveNumberCheck(iterable, count, FIELD);
  return new Iterable(function* () {
    if (count === 0) {
      return;
    }

    const buffer = [];

    for (const i of iterable) {
      buffer.push(i);
    }

    for (const i of buffer.slice(-count)) {
      yield i;
    }
  });
};
