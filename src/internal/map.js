/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import Iterable from '../iterable';
import { isIterable, BadArgumentError, isFunction } from './utils';

/**
 * @ignore
 */
const map = (iterable, mapper) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.map', 'Iterable');
  }
  if (!isFunction(mapper)) {
    throw new BadArgumentError(2, 'Iterable.map', 'function');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      yield mapper(i);
    }
  });
};

export default map;
