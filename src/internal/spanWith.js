
import skipWhile from './skipWhile';
import takeWhile from './takeWhile';
import { defineField, IterablePredicateCheck } from './utils';
/**
 * @ignore
 */
const FIELD = defineField('spanWith');
/**
 * @ignore
 */
export default (iterable, predicate) => {
  IterablePredicateCheck(iterable, predicate, FIELD);
  return [
    takeWhile(iterable, predicate),
    skipWhile(iterable, predicate),
  ];
};
