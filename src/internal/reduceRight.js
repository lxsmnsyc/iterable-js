/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { defineField, IterablePredicateCheck } from './utils';
import reverse from './reverse';
import reduce from './reduce';
/**
 * @ignore
 */
const FIELD = defineField('reduceRight');
/**
 * @ignore
 */
export default (iterable, predicate, seed) => {
  IterablePredicateCheck(iterable, predicate, FIELD);
  return reduce(reverse(iterable), predicate, seed);
};
