/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { defineField, DoubleIterableCheck } from './utils';
import Iterable from '../iterable';
/**
 * @ignore
 */
const FIELD = defineField('intersect');
/**
 * @ignore
 */
export default (iterable, other) => {
  DoubleIterableCheck(iterable, other, FIELD);

  return new Iterable(function* () {
    for (const i of iterable) {
      for (const o of other) {
        if (i === o) {
          yield i;
        }
      }
    }
  });
};
