/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { defineField, IterablePositiveNumberCheck } from './utils';
import Iterable from '../iterable';
/**
 * @ignore
 */
const FIELD = defineField('elementAt');
/**
 * @ignore
 */
export default (iterable, index) => {
  IterablePositiveNumberCheck(iterable, index, FIELD);

  return new Iterable(function* () {
    let c = 0;

    for (const i of iterable) {
      if (c === index) {
        yield i;
        return;
      }
      c += 1;
    }
  });
};
