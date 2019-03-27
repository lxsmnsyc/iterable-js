/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { defineField, IterableCheck } from './utils';
import Iterable from '../iterable';
/**
 * @ignore
 */
const FIELD = defineField('average');
/**
 * @ignore
 */
export default (iterable) => {
  IterableCheck(iterable, FIELD);
  return new Iterable(function* () {
    let acc = 0;
    let c = 0;

    for (const i of iterable) {
      acc += i;
      c += 1;
    }

    yield acc / c;
  });
};
