/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import {
  isUndefined, defineField, IterableCheck, FunctionCheck,
} from './utils';
import Iterable from '../iterable';
/**
 * @ignore
 */
const FIELD = defineField('sorted');
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

  return new Iterable(function* () {
    let prev;

    for (const i of iterable) {
      if (typeof prev !== 'undefined' && comparator(prev, i) > 0) {
        yield false;
        return;
      }
      prev = i;
    }
    yield true;
  });
};
