/* eslint-disable no-restricted-syntax */
const Iterable = require('./index.js');

for (const c of Iterable.range(3, 1).scanRight((a, b) => a + b)) {
  console.log(c);
}