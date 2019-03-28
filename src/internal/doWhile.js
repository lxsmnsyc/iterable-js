/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */

import Iterable from '../iterable';
import { defineField, IterablePredicateCheck } from './utils';

/**
 * @ignore
 */
const FIELD = defineField('filter');
/**
 * @ignore
 */
export default (iterable, predicate) => {
  IterablePredicateCheck(iterable, predicate, FIELD);
  return new Iterable(function* () {
    do {
      for (const i of iterable) {
        yield i;
      }
    } while (predicate());
  });
};
