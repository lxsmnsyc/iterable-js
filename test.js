/* eslint-disable no-restricted-syntax */
const Iterable = require('./index.js');

const A = [1, 2, 2, 3, 4];
const B = [6, 4, 4, 2];

for (const i of Iterable.intersect(B, A)) {
  console.log(i);
}