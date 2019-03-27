/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { defineField, IterablePredicateCheck } from './utils';
import Iterable from '../iterable';
/**
 * @ignore
 */
const FIELD = defineField('scan');
/**
 * @ignore
 */
export default (iterable, predicate) => {
  IterablePredicateCheck(iterable, predicate, FIELD);
  return new Iterable(function* () {
    let acc;

    for (const i of iterable) {
      acc = predicate(acc, i);
      yield acc;
    }
  });
};
