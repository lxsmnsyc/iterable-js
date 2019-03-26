/* eslint-disable no-restricted-syntax */
const Iterable = require('./index.js');

const evenOdd = Iterable.partition([1, 2, 3, 4, 5], x => x < 3);
for (const c of evenOdd[0]) {
  console.log('1', c);
}
for (const c of evenOdd[1]) {
  console.log('2', c);
}
