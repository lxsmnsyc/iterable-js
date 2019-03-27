/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { IterablePositiveNumberCheck, defineField } from './utils';
import Iterable from '../iterable';
/**
 * @ignore
 */
const FIELD = defineField('skipLast');
/**
 * @ignore
 */
export default (iterable, count) => {
  IterablePositiveNumberCheck(iterable, count, FIELD);
  return new Iterable(function* () {
    const buffer = [];
    let c = 0;
    for (const i of iterable) {
      if (count > 0) {
        buffer.push(i);
        if (c === count) {
          yield buffer.shift();
        } else {
          c += 1;
        }
      } else {
        yield i;
      }
    }
  });
};
