/* eslint-disable no-restricted-syntax */
const Iterable = require('./index.js');

for (const c of Iterable.range(1, 200)
  .filter(x => x % 5 === 0)
  .reverse()
  .cache()
  .all(x => x % 5 === 0)) {
  console.log(c);
}
