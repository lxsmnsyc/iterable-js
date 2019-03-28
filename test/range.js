/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';
import { BadArgumentError } from '../src/internal/utils';

/* eslint-disable no-undef */
describe('#range', () => {
  it('should throw a BadArgumentError if there is a first invalid number', () => {
    try {
      Iterable.range();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is a second invalid number', () => {
    try {
      Iterable.range(1);
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is a third invalid number or undefined', () => {
    try {
      Iterable.range(1, 2, 'test');
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable if no errors.', () => {
    const iterable = Iterable.range(1, 2);
    assert(iterable instanceof Iterable);
  });
  it('should yield the correct value', () => {
    const expected = [1, 2, 3, 4];
    const iterable = Iterable.range(1, 4, 1);
    let acc = true;
    for (const i of iterable) {
      acc = acc && i === expected.shift();
    }
    assert(acc);
  });
});
