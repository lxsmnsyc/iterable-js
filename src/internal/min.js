/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { defineField, IterableCheck, isUndefined } from './utils';
import Iterable from '../iterable';

const { min } = Math;
/**
 * @ignore
 */
const FIELD = defineField('min');
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
        acc = min(acc, i);
      }
    }

    yield acc;
  });
};
