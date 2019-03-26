/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { isIterable } from './utils';
import find from './find';
import map from './map';
/**
 * @ignore
 */
const contains = (iterable, value) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.find (Iterable expected)');
  }
  return map(find(iterable, value), x => x === value);
};

export default contains;
