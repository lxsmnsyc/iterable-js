import { IterablePredicateCheck, defineField } from './utils';
import takeUntil from './takeUntil';
import skipUntil from './skipUntil';

/**
 * @ignore
 */
const FIELD = defineField('breakWith');
/**
 * @ignore
 */
export default (iterable, predicate) => {
  IterablePredicateCheck(iterable, predicate, FIELD);
  return [
    takeUntil(iterable, predicate),
    skipUntil(iterable, predicate),
  ];
};
