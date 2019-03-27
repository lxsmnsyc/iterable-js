/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { defineField, IterablePositiveNumberCheck } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const FIELD = defineField('repeat');
/**
 * @ignore
 */
export default (iterable, count) => {
  IterablePositiveNumberCheck(iterable, count, FIELD);
  return new Iterable(function* () {
    for (let c = count; c > 0; c -= 1) {
      for (const i of iterable) {
        yield i;
      }
    }
  });
};
