/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { DoubleIterableCheck, defineField } from './utils';
import Iterable from '../iterable';
import toArray from './toArray';
/**
 * @ignore
 */
const FIELD = defineField('equal');
/**
 * @ignore
 */
export default (iterable, other) => {
  DoubleIterableCheck(iterable, other, FIELD);

  return new Iterable(function* () {
    const arr = toArray(iterable);

    for (const i of other) {
      if (i !== arr.shift()) {
        yield false;
        return;
      }
    }

    yield arr.length === 0;
  });
};
