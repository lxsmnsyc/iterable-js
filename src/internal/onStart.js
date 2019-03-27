/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { defineField, IterablePredicateCheck } from './utils';
import Iterable from '../iterable';
/**
 * @ignore
 */
const FIELD = defineField('onStart');
/**
 * @ignore
 */
export default (iterable, fn) => {
  IterablePredicateCheck(iterable, fn, FIELD);
  return new Iterable(function* () {
    fn();
    for (const i of iterable) {
      yield i;
    }
  });
};
