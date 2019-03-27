/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { IterableCheck, defineField } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const FIELD = defineField('distinctAdjacent');
/**
 * @ignore
 */
export default (iterable) => {
  IterableCheck(iterable, 1, FIELD);
  return new Iterable(function* () {
    let first = true;
    let prev;
    for (const i of iterable) {
      if (first) {
        yield i;
        first = false;
      } else if (prev !== i) {
        yield i;
      }
      prev = i;
    }
  });
};
