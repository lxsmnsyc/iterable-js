/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { defineField, IterablePredicateCheck } from './utils';
import Iterable from '../iterable';
/**
 * @ignore
 */
const FIELD = defineField('reduce');
/**
 * @ignore
 */
export default (iterable, predicate, seed) => {
  IterablePredicateCheck(iterable, predicate, FIELD);
  return new Iterable(function* () {
    let acc = seed;
    let flag = seed != null;

    for (const i of iterable) {
      if (flag) {
        acc = i;
        flag = false;
      } else {
        acc = predicate(acc, i);
      }
    }

    yield acc;
  });
};
