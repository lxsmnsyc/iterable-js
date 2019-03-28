/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';
import { BadArgumentError } from '../src/internal/utils';

/* eslint-disable no-undef */
describe('#compose', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.compose();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is an invalid composer', () => {
    try {
      Iterable.compose([1, 2, 3, 4], []);
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a TypeError if there is a composer that returns a non-Iterable', () => {
    try {
      Iterable.compose([1, 2, 3, 4], () => {});
    } catch (e) {
      assert(e instanceof TypeError);
    }
  });
  it('should return an Iterable', () => {
    assert(Iterable.compose([1, 2, 3, 4], Iterable.reverse) instanceof Iterable);
  });
  it('should return an Iterable (Iteration Protocol)', () => {
    assert(Iterable.is(new Iterable([1, 2, 3, 4]).compose(() => [1, 2, 3, 4])));
  });
});
