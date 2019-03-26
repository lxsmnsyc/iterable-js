/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import Iterable from '../iterable';
import { isIterable, ITERATOR } from './utils';
/**
 * @ignore
 */
const defaultZipper = x => x;
/**
 * @ignore
 */
const zip = (iterables, fn) => {
  if (!(iterables instanceof Array)) {
    throw new TypeError('expects "iterables" to be an Array');
  }

  let zipper = fn;
  if (typeof fn !== 'function') {
    zipper = defaultZipper;
  }

  const count = iterables.length;

  return new Iterable(function* () {
    const generators = [];
    let undef = count;
    let c = 0;

    for (const iterable of iterables) {
      if (isIterable(iterable)) {
        generators[c] = iterable[ITERATOR]();
      } else {
        undef -= 1;
      }
      c += 1;
    }

    while (undef > 0) {
      const values = [];

      for (let i = 0; i < count; i += 1) {
        const g = generators[i];
        if (typeof g !== 'undefined') {
          const { value, done } = g.next();

          values.push(value);

          if (done) {
            generators[i] = undefined;
            undef -= 1;
          }
        } else {
          values.push(undefined);
        }
      }

      yield zipper(values);
    }
  });
};

export default zip;
