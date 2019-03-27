/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import Iterable from '../iterable';
import { isIterable, defineField, IterableCheck } from './utils';
/**
 * @ignore
 */
const FIELD = defineField('flat');
/**
 * @ignore
 */
export default (iterable) => {
  IterableCheck(iterable, 1, FIELD);
  return new Iterable(function* () {
    for (const i of iterable) {
      if (isIterable(i)) {
        for (const e of i) {
          yield e;
        }
      } else {
        yield i;
      }
    }
  });
};
