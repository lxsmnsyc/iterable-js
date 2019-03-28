/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { defineField, IterablePredicateCheck } from './utils';
import reverse from './reverse';
import scan from './scan';
/**
 * @ignore
 */
const FIELD = defineField('scanRight');
/**
 * @ignore
 */
export default (iterable, predicate, seed) => {
  IterablePredicateCheck(iterable, predicate, FIELD);
  return scan(reverse(iterable), predicate, seed);
};
