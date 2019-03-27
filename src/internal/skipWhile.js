/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */

import Iterable from '../iterable';
import { defineField, IterablePredicateCheck } from './utils';
/**
 * @ignore
 */
const FIELD = defineField('skipWhile');
/**
 * @ignore
 */
export default (iterable, predicate) => {
  IterablePredicateCheck(iterable, predicate, FIELD);
  return new Iterable(function* () {
    let flag = true;
    for (const i of iterable) {
      if (flag) {
        flag = predicate(i);
      }
      if (!flag) {
        yield i;
      }
    }
  });
};
