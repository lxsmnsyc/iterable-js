/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import Iterable from '../iterable';
import { defineField, IterableCheck } from './utils';
/**
 * @ignore
 */
const FIELD = defineField('last');
/**
 * @ignore
 */
export default (iterable) => {
  IterableCheck(iterable, 1, FIELD);
  return new Iterable(function* () {
    let v;
    for (const i of iterable) {
      v = i;
    }
    yield v;
  });
};
