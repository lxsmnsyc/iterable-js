/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import Iterable from '../iterable';
import { defineField, IterablePositiveNumberCheck } from './utils';
/**
 * @ignore
 */
const FIELD = defineField('take');
/**
 * @ignore
 */
export default (iterable, count) => {
  IterablePositiveNumberCheck(iterable, count, FIELD);
  return new Iterable(function* () {
    let c = count;

    for (const i of iterable) {
      if (c > 0) {
        c -= 1;

        yield i;
      } else {
        return;
      }
    }
  });
};
