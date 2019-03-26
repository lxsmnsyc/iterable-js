/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { isIterable } from './utils';
import find from './find';
/**
 * @ignore
 */
const indexOf = (iterable, value) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.indexOf (Iterable expected)');
  }
  return find(iterable, x => x === value);
};

export default indexOf;
