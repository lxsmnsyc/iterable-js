/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import Iterable from '../iterable';

/**
 * @ignore
 */
const map = (iterable, mapper) => {
  if (!(iterable instanceof Iterable)) {
    throw new TypeError('expects an object that implements the Iteration Protocol');
  }
  if (typeof mapper !== 'function') {
    throw new TypeError('expects the mapper to be a function.');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      let result;

      try {
        result = mapper(i);
      } catch (e) {
        break;
      }
      yield result;
    }
  });
};

export default map;
