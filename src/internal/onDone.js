/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { IterablePredicateCheck, defineField } from './utils';
import Iterable from '../iterable';
/**
 * @ignore
 */
const FIELD = defineField('onDone');
/**
 * @ignore
 */
export default (iterable, fn) => {
  IterablePredicateCheck(iterable, fn, FIELD);
  return new Iterable(function* () {
    for (const i of iterable) {
      yield i;
    }
    fn();
  });
};
