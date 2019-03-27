/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { defineField, IterablePositiveNumberCheck } from './utils';
import Iterable from '../iterable';
/**
 * @ignore
 */
const FIELD = defineField('replace');
/**
 * @ignore
 */
export default (iterable, index, value) => {
  IterablePositiveNumberCheck(iterable, index, FIELD);
  return new Iterable(function* () {
    let c = 0;

    for (const i of iterable) {
      if (c === index) {
        yield value;
      } else {
        yield i;
      }
      c += 1;
    }
  });
};
