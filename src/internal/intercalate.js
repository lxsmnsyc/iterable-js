/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { DoubleIterableCheck, defineField } from './utils';
import Iterable from '../iterable';
/**
 * @ignore
 */
const FIELD = defineField('intercalate');
/**
 * @ignore
 */
export default (iterable, other) => {
  DoubleIterableCheck(iterable, other, FIELD);
  return new Iterable(function* () {
    const buffer = [];
    let prev;
    for (const i of iterable) {
      buffer.push(i);
      prev = buffer.slice(0);
      for (const o of other) {
        buffer.push(o);
      }
    }
    for (const i of prev) {
      yield i;
    }
  });
};
