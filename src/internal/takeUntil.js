/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */

import Iterable from '../iterable';
import { defineField, IterablePredicateCheck } from './utils';
/**
 * @ignore
 */
const FIELD = defineField('takeUntil');
/**
 * @ignore
 */
export default (iterable, predicate) => {
  IterablePredicateCheck(iterable, predicate, FIELD);
  return new Iterable(function* () {
    for (const i of iterable) {
      if (!predicate(i)) {
        yield i;
      } else {
        return;
      }
    }
  });
};
