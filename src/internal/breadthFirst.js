/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import Iterable from '../iterable';
import { IterableCheck, defineField, isIterable } from './utils';

const FIELD = defineField('breadthFirst');

export default (iterable) => {
  IterableCheck(iterable, 1, FIELD);

  return new Iterable(function* () {
    const stack = [];
    stack.push(iterable);

    while (stack.length !== 0) {
      const top = stack.unshift();

      if (isIterable(top)) {
        for (const i of top) {
          stack.push(i);
        }
      } else {
        yield top;
      }
    }
  });
};
