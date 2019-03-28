/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../../src/iterable';
import { BadArgumentError } from '../../src/internal/utils';

/* eslint-disable no-undef */
describe('#take', () => {
  it('should throw a BadArgumentError if there is an invalid Iterable', () => {
    try {
      Iterable.take();
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is an invalid number', () => {
    try {
      Iterable.take([1, 2, 3]);
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should throw a BadArgumentError if there is a non-positive number', () => {
    try {
      Iterable.take([1, 2, 3], -1);
    } catch (e) {
      assert(e instanceof BadArgumentError);
    }
  });
  it('should return an Iterable if no errors.', () => {
    const iterable = Iterable.take([1, 2, 3, 4], 2);
    assert(iterable instanceof Iterable);
  });
  it('should yield the correct value', () => {
    const base = [1, 2, 3, 4];
    const expected = [1, 2];
    const iterable = new Iterable(base).take(2);

    let acc = true;
    for (const i of iterable) {
      acc = acc && i === expected.shift();
    }
    assert(acc && expected.length === 0);
  });
  it('should yield nothing if 0 is received', () => {
    const base = [1, 2, 3, 4];
    const expected = [];
    const iterable = new Iterable(base).take(0);

    let acc = true;
    for (const i of iterable) {
      acc = false;
    }
    assert(acc && expected.length === 0);
  });
});
