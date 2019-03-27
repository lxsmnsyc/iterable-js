/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { IterableCheck, defineField } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const FIELD = defineField('cache');
/**
 * @ignore
 */
export default (iterable) => {
  IterableCheck(iterable, 1, FIELD);

  const c = [];
  let size = 0;
  return new Iterable(function* () {
    if (size > 0) {
      for (const i of c) {
        yield i;
      }
    }

    let s = size;

    for (const i of iterable) {
      if (s === 0) {
        c.push(i);
        size += 1;
        yield i;
      } else {
        s -= 1;
      }
    }
  });
};
