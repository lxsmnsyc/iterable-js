/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import Iterable from '../iterable';
import { IterableCheck, defineField, isIterable } from './utils';

const FIELD = defineField('depthFirst');
/**
 * @ignore
 */
export default (iterable) => {
  IterableCheck(iterable, 1, FIELD);

  return new Iterable(function* () {
    const stack = [];
    stack.push(iterable);

    const result = [];

    while (stack.length !== 0) {
      const top = stack.pop();

      if (isIterable(top)) {
        for (const i of top) {
          stack.push(i);
        }
      } else {
        result.push(top);
      }
    }

    for (const i of result.reverse()) {
      yield i;
    }
  });
};
