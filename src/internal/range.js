/* eslint-disable func-names */
import { isNumber, isUndefined } from 'util';
import { BadArgumentError } from './utils';
import Iterable from '../iterable';
/**
 * @ignore
 */
const range = (start, end, steps) => {
  if (!isNumber(start)) {
    throw new BadArgumentError(1, 'Iterable.range', 'number');
  }
  if (!isNumber(end)) {
    throw new BadArgumentError(2, 'Iterable.range', 'number');
  }

  let step = steps;

  if (!isUndefined(steps)) {
    if (!isNumber(steps)) {
      throw new BadArgumentError(3, 'Iterable.range', 'number or undefined');
    }
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
