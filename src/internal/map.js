/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import Iterable from '../iterable';
import { defineField, IterablePredicateCheck } from './utils';
/**
 * @ignore
 */
const FIELD = defineField('flatMap');
/**
 * @ignore
 */
export default (iterable, mapper) => {
  IterablePredicateCheck(iterable, mapper, FIELD);
  return new Iterable(function* () {
    for (const i of iterable) {
      yield mapper(i);
    }
  });
};
