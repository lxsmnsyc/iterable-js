/* eslint-disable no-restricted-syntax */
import '@babel/polyfill';
import assert from 'assert';
import Iterable from '../../src/iterable';

/* eslint-disable no-undef */
describe('#empty', () => {
  it('should be empty.', () => {
    for (const i of Iterable.empty()) {
      assert(!i);
    }
  });
});
