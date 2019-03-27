/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { IterableCheck, defineField } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const FIELD = defineField('distinct');
/**
 * @ignore
 */
export default (iterable) => {
  IterableCheck(iterable, 1, FIELD);
  return new Iterable(function* () {
    const buffer = [];
    for (const i of iterable) {
      if (!buffer.includes(i)) {
        yield i;
      }
      buffer.push(i);
    }
  });
};
