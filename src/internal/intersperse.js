/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { IterableCheck, defineField } from './utils';
import Iterable from '../iterable';
/**
 * @ignore
 */
const FIELD = defineField('intersperse');
/**
 * @ignore
 */
export default (iterable, value) => {
  IterableCheck(iterable, 1, FIELD);
  return new Iterable(function* () {
    const buffer = [];
    let prev;
    for (const i of iterable) {
      buffer.push(i);
      prev = buffer.slice(0);
      buffer.push(value);
    }
    for (const i of prev) {
      yield i;
    }
  });
};
