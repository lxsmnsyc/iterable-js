/* eslint-disable no-restricted-syntax */
const Iterable = require('./index.js');

for (const c of Iterable.onDone([1, 2, 3, 4, 5], () => console.log('Done!'))) {
  console.log('Yield: ', c);
}
