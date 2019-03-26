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
    throw new TypeError('bad argument #1 to Iterable.isEmpty (Iterable expected)');
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
