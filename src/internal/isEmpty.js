/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { isIterable } from './utils';
import Iterable from '../iterable';
/**
 * @ignore
 */
const isEmpty = (iterable) => {
  if (!isIterable(iterable)) {
    throw new TypeError('expects an object that implements the Iteration Protocol');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      yield false;
      return;
    }
    yield true;
  });
};

export default isEmpty;
