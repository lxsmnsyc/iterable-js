/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import Iterable from '../iterable';
import { IterablePredicateCheck, defineField } from './utils';

/**
 * @ignore
 */
const FIELD = defineField('any');
/**
 * @ignore
 */
export default (iterable, predicate) => {
  IterablePredicateCheck(iterable, predicate, FIELD);
  return new Iterable(function* () {
    for (const i of iterable) {
      if (predicate(i)) {
        yield true;
        return;
      }
    }
    yield false;
  });
};
