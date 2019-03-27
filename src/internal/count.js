/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { IterableCheck, defineField } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const FIELD = defineField('count');
/**
 * @ignore
 */
export default (iterable) => {
  IterableCheck(iterable, 1, FIELD);

  return new Iterable(function* () {
    let c = 0;
    // eslint-disable-next-line no-unused-vars
    for (const i of iterable) {
      c += 1;
    }
    yield c;
  });
};
