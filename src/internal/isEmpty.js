/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { isIterable, BadArgumentError } from './utils';
import Iterable from '../iterable';
/**
 * @ignore
 */
const isEmpty = (iterable) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.isEmpty', 'Iterable');
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
