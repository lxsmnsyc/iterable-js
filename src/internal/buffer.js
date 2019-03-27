/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { IterablePositiveNumberCheck, defineField } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const FIELD = defineField('buffer');
/**
 * @ignore
 */
export default (iterable, count) => {
  IterablePositiveNumberCheck(iterable, count, FIELD);

  return new Iterable(function* () {
    let b = [];

    for (const i of iterable) {
      b.push(i);
      if (b.length === count) {
        yield b;
        b = [];
      }
    }
    if (b.length > 0) {
      yield b;
    }
  });
};
