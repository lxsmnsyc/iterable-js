/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { isIterable, BadArgumentError } from './utils';
import find from './find';
/**
 * @ignore
 */
const indexOf = (iterable, value) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.indexOf', 'Iterable');
  }
  return find(iterable, x => x === value);
};

export default indexOf;
