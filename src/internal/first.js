/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import Iterable from '../iterable';
import { isIterable } from './utils';

const first = (iterable) => {
  if (!isIterable(iterable)) {
    throw new TypeError('expects an object that implements the Iteration Protocol');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      yield i;
      break;
    }
  });
};

export default first;
