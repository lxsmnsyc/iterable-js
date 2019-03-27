/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import Iterable from '../iterable';
import {
  IterableCheck, defineField, FunctionCheck, isUndefined,
} from './utils';
/**
 * @ignore
 */
const FIELD = defineField('first');
/**
 * @ignore
 */
const defaultTest = () => true;
/**
 * @ignore
 */
export default (iterable, predicate) => {
  IterableCheck(iterable, 1, FIELD);

  let fn = predicate;

  if (!isUndefined(fn)) {
    FunctionCheck(predicate, 2, FIELD);
  } else {
    fn = defaultTest;
  }

  return new Iterable(function* () {
    for (const i of iterable) {
      if (fn(i)) {
        yield i;
        return;
      }
    }
  });
};
