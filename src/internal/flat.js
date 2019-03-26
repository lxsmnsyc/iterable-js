/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import Iterable from '../iterable';
import { isIterable } from './utils';


const flat = (iterable) => {
  if (!isIterable(iterable)) {
    throw new TypeError('expects an object that implements the Iteration Protocol');
  }
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

export default flat;
