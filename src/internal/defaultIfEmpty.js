/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import Iterable from '..';
import { IterableCheck, defineField } from './utils';

const FIELD = defineField('defaultIfEmpty');

export default (iterable, value) => {
  IterableCheck(iterable, 1, FIELD);
  return new Iterable(function* () {
    let flag = true;

    for (const i of iterable) {
      yield i;
      flag = false;
    }
    if (flag) {
      yield value;
    }
  });
};
