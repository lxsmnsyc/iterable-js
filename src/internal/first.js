/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import Iterable from '../iterable';
import { IterableCheck, defineField } from './utils';
/**
 * @ignore
 */
const FIELD = defineField('first');
/**
 * @ignore
 */
export default (iterable) => {
  IterableCheck(iterable, 1, FIELD);

  return new Iterable(function* () {
    for (const i of iterable) {
      yield i;
      return;
    }
  });
};
