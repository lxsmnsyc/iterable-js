/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { defineField, IterableCheck, isUndefined } from './utils';
import Iterable from '../iterable';

const { max } = Math;
/**
 * @ignore
 */
const FIELD = defineField('max');
/**
 * @ignore
 */
export default (iterable) => {
  IterableCheck(iterable, FIELD);
  return new Iterable(function* () {
    let acc;

    for (const i of iterable) {
      if (isUndefined(acc)) {
        acc = i;
      } else {
        acc = max(acc, i);
      }
    }

    yield acc;
  });
};
