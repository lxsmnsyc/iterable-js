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
    const buffer = [];

    for (const i of iterable) {
      if (count === 0) {
        yield i;
      } else {
        buffer.push(i);
      }
    }

    for (const i of buffer.slice(-count)) {
      yield i;
    }
  });
};
