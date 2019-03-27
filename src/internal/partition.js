import { defineField, IterablePredicateCheck } from './utils';
import filter from './filter';
/**
 * @ignore
 */
const FIELD = defineField('partition');
/**
 * @ignore
 */
export default (iterable, predicate) => {
  IterablePredicateCheck(iterable, predicate, FIELD);
  return [
    filter(iterable, predicate),
    filter(iterable, x => !predicate(x)),
  ];
};
