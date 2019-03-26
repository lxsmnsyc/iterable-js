/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../src/iterable';

/* eslint-disable no-undef */
describe('#concat', () => {
  it('should return an Iterable', () => {
    assert(Iterable.concat(1, 2, 3, 4) instanceof Iterable);
  });
});
