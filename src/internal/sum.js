/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { defineField, IterableCheck } from './utils';
import Iterable from '../iterable';
/**
 * @ignore
 */
const FIELD = defineField('sum');
/**
 * @ignore
 */
export default (iterable) => {
  IterableCheck(iterable, FIELD);
  return new Iterable(function* () {
    let acc = 0;

    for (const i of iterable) {
      acc += i;
    }

    yield acc;
  });
};
