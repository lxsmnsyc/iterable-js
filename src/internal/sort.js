import {
  isUndefined, IterableCheck, defineField, FunctionCheck,
} from './utils';
import Iterable from '../iterable';
import toArray from './toArray';
/**
 * @ignore
 */
const FIELD = defineField('sort');
/**
 * @ignore
 */
const defaultComparator = (a, b) => a - b;
/**
 * @ignore
 */
export default (iterable, comparator) => {
  IterableCheck(iterable, 1, FIELD);

  let fn = comparator;

  if (!isUndefined(fn)) {
    FunctionCheck(comparator, 2, FIELD);
  } else {
    fn = defaultComparator;
  }

  return new Iterable(toArray(iterable).sort(fn));
};
