/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { isIterable, BadArgumentError } from './utils';
import map from './map';
import indexOf from './indexOf';
/**
 * @ignore
 */
const contains = (iterable, value) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.contains', 'Iterable');
  }
  return map(indexOf(iterable, value), x => x > -1);
};

export default contains;
