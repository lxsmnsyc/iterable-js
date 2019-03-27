/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';
import { BadArgumentError } from '../src/internal/utils';

/* eslint-disable no-undef */
describe('#cache', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.cache();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should cache the source Iterable', () => {
    const cache1 = new Iterable([1, 2, 3, 4]).cache();

    let flag = 2;
    for (const c of cache1) {
      flag -= 1;
      if (flag === 0) {
        break;
      }
    }
    // eslint-disable-next-line no-empty
    for (const c of cache1) {
    }
  });
});
