/* eslint-disable func-names */
import { isUndefined, NumberCheck, defineField } from './utils';
import Iterable from '../iterable';
/**
 * @ignore
 */
const FIELD = defineField('range');
/**
 * @ignore
 */
const range = (start, end, steps) => {
  NumberCheck(start, 1, FIELD);
  NumberCheck(end, 2, FIELD);

  let step = steps;

  if (!isUndefined(steps)) {
    NumberCheck(steps, 3, FIELD);
  } else {
    step = 1;
  }

  return new Iterable(function* () {
    const direction = step * Math.sign(end - start);
    for (let c = start; (direction < 0 ? c >= end : c <= end); c += direction) {
      yield c;
    }
  });
};

export default range;
