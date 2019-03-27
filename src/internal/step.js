/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import Iterable from '../iterable';
import { defineField, IterablePositiveNumberCheck } from './utils';
/**
 * @ignore
 */
const FIELD = defineField('step');
/**
 * @ignore
 */
export default (iterable, count) => {
  IterablePositiveNumberCheck(iterable, count, FIELD);
  return new Iterable(function* () {
    let c = 0;
    for (const i of iterable) {
      if (c % count === 0) {
        yield i;
      }
      c += 1;
    }
  });
};
