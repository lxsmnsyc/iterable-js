/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../../src/iterable';
import { BadArgumentError } from '../../src/internal/utils';


const { min } = Math;

/* eslint-disable no-undef */
describe('#min', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.min();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable', () => {
    assert(Iterable.min([1, 2, 3]) instanceof Iterable);
  });
  it('should yield the correct min if the Iterable yields the value', () => {
    const base = [1, 2, 3];
    for (const c of new Iterable(base).min()) {
      assert(c === base.reduce((x, y) => min(x, y)));
    }
  });
});
