/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import Iterable from '../iterable';
import { isIterable } from './utils';
/**
 * @ignore
 */
const any = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new TypeError('expects an object that implements the Iteration Protocol');
  }
  if (typeof predicate !== 'function') {
    throw new TypeError('expects the predicate to be a function.');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      let result;

      try {
        result = predicate(i);
      } catch (e) {
        yield false;
        return;
      }

      if (result) {
        yield true;
        return;
      }
    }
    yield false;
  });
};

export default any;
