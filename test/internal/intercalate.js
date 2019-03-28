/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';
import { BadArgumentError } from '../src/internal/utils';

/* eslint-disable no-undef */
describe('#intercalate', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.intercalate();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is a second invalid Iterable', () => {
    try {
      Iterable.intercalate(Iterable.just(10));
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should yield the correct sequence', () => {
    const expected = [10, 20, 30];
    const iterable = new Iterable([10, 30]).intercalate([20]);
    let acc = true;
    for (const i of iterable) {
      acc = acc && i === expected.shift();
    }
    assert(acc && expected.length === 0);
  });
});
