/* eslint-disable no-restricted-syntax */
const Iterable = require('./index.js');

for (const c of Iterable.filter([1, 2, 'hello', 4, 'world'], x => typeof x === 'string')) {
  console.log(c);
}
