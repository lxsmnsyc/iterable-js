/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import Iterable from '../iterable';
import { IterablePredicateCheck, defineField } from './utils';
/**
 * @ignore
 */
const FIELD = defineField('find');
/**
 * @ignore
 */
export default (iterable, predicate) => {
  IterablePredicateCheck(iterable, predicate, FIELD);
  return new Iterable(function* () {
    let c = 0;
    for (const i of iterable) {
      if (predicate(i)) {
        yield c;
        return;
      }
      c += 1;
    }
    yield -1;
  });
};
