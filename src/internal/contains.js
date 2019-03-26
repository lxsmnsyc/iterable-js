/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { isIterable, BadArgumentError } from './utils';
import find from './find';
import map from './map';
/**
 * @ignore
 */
const contains = (iterable, value) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.contains', 'Iterable');
  }
  return map(find(iterable, value), x => x === value);
};

export default contains;
