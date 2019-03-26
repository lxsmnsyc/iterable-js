'use strict';

var util = require('util');

/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */

/**
 * @ignore
 */
const ITERATOR = Symbol.iterator;
/**
 * @ignore
 */
const isFunction = x => typeof x === 'function';
/**
 * @ignore
 */
const isNumber = x => typeof x === 'number';
/**
 * @ignore
 */
const isUndefined = x => typeof x === 'undefined';

/**
 * @ignore
 */
const isIterable = x => !isUndefined(x) && typeof x[ITERATOR] === 'function';
/**
 * @ignore
 */
class BadArgumentError extends TypeError {
  constructor(argumentNo, methodName, expectedType) {
    super();
    this.message = `bad argument #${argumentNo} to ${methodName} (${expectedType} expected)`;
  }
}

/* eslint-disable no-restricted-syntax */
/**
 * @ignore
 */
const all = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.all', 'Iterable');
  }
  if (!isFunction(predicate)) {
    throw new BadArgumentError(2, 'Iterable.all', 'function');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      if (!predicate(i)) {
        yield false;
        return;
      }
    }
    yield true;
  });
};

/* eslint-disable no-restricted-syntax */
/**
 * @ignore
 */
const any = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.any', 'Iterable');
  }
  if (!isFunction(predicate)) {
    throw new BadArgumentError(2, 'Iterable.any', 'function');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      if (predicate(i)) {
        yield true;
        return;
      }
    }
    yield false;
  });
};

/* eslint-disable func-names */

/**
 * @ignore
 */
const takeUntil = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.takeUntil', 'Iterable');
  }
  if (!isFunction(predicate)) {
    throw new BadArgumentError(2, 'Iterable.takeUntil', 'function');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      if (!predicate(i)) {
        yield i;
      } else {
        return;
      }
    }
  });
};

/* eslint-disable func-names */

/**
 * @ignore
 */
const skipUntil = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.skipUntil', 'Iterable');
  }
  if (!isFunction(predicate)) {
    throw new BadArgumentError(2, 'Iterable.skipUntil', 'function');
  }
  return new Iterable(function* () {
    let flag = true;
    for (const i of iterable) {
      if (flag) {
        flag = !predicate(i);
      }
      if (!flag) {
        yield i;
      }
    }
  });
};

/**
 * @ignore
 */
const breakWith = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.breakWith', 'Iterable');
  }
  if (!isFunction(predicate)) {
    throw new BadArgumentError(2, 'Iterable.breakWith', 'function');
  }
  return [
    takeUntil(iterable, predicate),
    skipUntil(iterable, predicate),
  ];
};

/* eslint-disable func-names */

/**
 * @ignore
 */
const cache = (iterable) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.cache', 'Iterable');
  }

  const c = [];
  let size = 0;
  return new Iterable(function* () {
    if (size > 0) {
      for (const i of c) {
        yield i;
      }
    }

    let s = size;

    for (const i of iterable) {
      if (s === 0) {
        c.push(i);
        size += 1;
        yield i;
      } else {
        s -= 1;
      }
    }
  });
};

/* eslint-disable no-restricted-syntax */

/**
 * @ignore
 */
const compose = (iterable, ...composers) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.compose', 'Iterable');
  }
  let i = 1;

  let result = iterable;
  for (const c of composers) {
    i += 1;
    if (!isFunction(c)) {
      throw new BadArgumentError(i, 'Iterable.compose', 'function');
    } else {
      result = c(result);

      if (!isIterable(result)) {
        throw new TypeError('Iterable.compose: a composer function returned a non-Iterable.');
      }
    }
  }

  if (result instanceof Iterable) {
    return result;
  }
  return new Iterable(result);
};

/* eslint-disable no-restricted-syntax */
/**
 * @ignore
 */
const flat = (iterable) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.flat', 'Iterable');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      if (isIterable(i)) {
        for (const e of i) {
          yield e;
        }
      } else {
        yield i;
      }
    }
  });
};

/* eslint-disable no-restricted-syntax */
/**
 * @ignore
 */
const concat = (...iterables) => flat(new Iterable(iterables));

/* eslint-disable no-restricted-syntax */

/**
 * @ignore
 */
const map = (iterable, mapper) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.map', 'Iterable');
  }
  if (!isFunction(mapper)) {
    throw new BadArgumentError(2, 'Iterable.map', 'function');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      yield mapper(i);
    }
  });
};

/* eslint-disable func-names */
/**
 * @ignore
 */
const find = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.find', 'Iterable');
  }
  if (!isFunction(predicate)) {
    throw new BadArgumentError(2, 'Iterable.find', 'function');
  }
  return new Iterable(function* () {
    let c = 0;
    for (const i of iterable) {
      if (predicate(i)) {
        yield c;
        return;
      }
      c += 1;
    }
    yield -1;
  });
};

/* eslint-disable func-names */
/**
 * @ignore
 */
const indexOf = (iterable, value) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.indexOf (Iterable expected)');
  }
  return find(iterable, x => x === value);
};

/* eslint-disable func-names */
/**
 * @ignore
 */
const contains = (iterable, value) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.contains', 'Iterable');
  }
  return map(indexOf(iterable, value), x => x > -1);
};

/* eslint-disable func-names */

/**
 * @ignore
 */
const count = (iterable) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.count', 'Iterable');
  }

  return new Iterable(function* () {
    let c = 0;
    // eslint-disable-next-line no-unused-vars
    for (const i of iterable) {
      c += 1;
    }
    yield c;
  });
};

/* eslint-disable no-restricted-syntax */
/**
 * @ignore
 */
const elementAt = (iterable, index) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.elementAt', 'Iterable');
  }
  if (!isNumber(index)) {
    throw new BadArgumentError(2, 'Iterable.elementAt', 'number');
  }
  if (index < 0) {
    throw new BadArgumentError(2, 'Iterable.elementAt', 'positive number');
  }

  return new Iterable(function* () {
    let c = 0;

    for (const i of iterable) {
      if (c === index) {
        yield i;
        return;
      }
      c += 1;
    }
  });
};

/**
 * @ignore
 */
const empty = () => new Iterable([]);

/* eslint-disable func-names */

/**
 * @ignore
 */
const filter = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.filter', 'Iterable');
  }
  if (!isFunction(predicate)) {
    throw new BadArgumentError(2, 'Iterable.filter', 'function');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      if (predicate(i)) {
        yield i;
      }
    }
  });
};

/* eslint-disable func-names */
/**
 * @ignore
 */
const first = (iterable) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.first', 'Iterable');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      yield i;
      return;
    }
  });
};

/**
 * @ignore
 */
const flatMap = (iterable, mapper) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.flatMap', 'Iterable');
  }
  if (!isFunction(mapper)) {
    throw new BadArgumentError(2, 'Iterable.flatMap', 'function');
  }
  return flat(map(iterable, mapper));
};

/* eslint-disable func-names */

const buffer = (iterable, count) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.buffer', 'Iterable');
  }
  if (!isNumber(count)) {
    throw new BadArgumentError(2, 'Iterable.buffer', 'number');
  }
  if (count <= 0) {
    throw new BadArgumentError(2, 'Iterable.buffer', 'positive number');
  }

  return new Iterable(function* () {
    let b = [];

    for (const i of iterable) {
      b.push(i);
      if (b.length === count) {
        yield b;
        b = [];
      }
    }
    if (b.length > 0) {
      yield b;
    }
  });
};

/* eslint-disable no-unused-vars */
/**
 * @ignore
 */
const isEmpty = (iterable) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.isEmpty', 'Iterable');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      yield false;
      return;
    }
    yield true;
  });
};

/**
 * @ignore
 */
const just = x => new Iterable([x]);

/* eslint-disable func-names */

/**
 * @ignore
 */
const last = (iterable) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.last', 'Iterable');
  }
  return new Iterable(function* () {
    let v;
    for (const i of iterable) {
      v = i;
    }
    yield v;
  });
};

/* eslint-disable no-restricted-syntax */

/**
 * @ignore
 */
const onDone = (iterable, fn) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.onDone', 'Iterable');
  }
  if (!isFunction(fn)) {
    throw new BadArgumentError(2, 'Iterable.onDone', 'function');
  }

  return new Iterable(function* () {
    for (const i of iterable) {
      yield i;
    }
    fn();
  });
};

/* eslint-disable no-restricted-syntax */

/**
 * @ignore
 */
const onStart = (iterable, fn) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.onStart', 'Iterable');
  }
  if (!isFunction(fn)) {
    throw new BadArgumentError(2, 'Iterable.onStart', 'function');
  }

  return new Iterable(function* () {
    fn();
    for (const i of iterable) {
      yield i;
    }
  });
};

/* eslint-disable no-restricted-syntax */

/**
 * @ignore
 */
const onYield = (iterable, fn) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.onYield', 'Iterable');
  }
  if (!isFunction(fn)) {
    throw new BadArgumentError(2, 'Iterable.onYield', 'function');
  }

  return new Iterable(function* () {
    for (const i of iterable) {
      fn(i);
      yield i;
    }
  });
};

/**
 * @ignore
 */
const partition = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.partition', 'Iterable');
  }
  if (!isFunction(predicate)) {
    throw new BadArgumentError(2, 'Iterable.partition', 'function');
  }

  return [
    filter(iterable, predicate),
    filter(iterable, x => !predicate(x)),
  ];
};

/* eslint-disable func-names */

const range = (start, end, steps) => {
  if (!util.isNumber(start)) {
    throw new BadArgumentError(1, 'Iterable.range', 'number');
  }
  if (!util.isNumber(end)) {
    throw new BadArgumentError(2, 'Iterable.range', 'number');
  }

  let step = steps;

  if (!util.isUndefined(steps)) {
    if (!util.isNumber(steps)) {
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

/* eslint-disable no-restricted-syntax */

/**
 * @ignore
 */
const repeat = (iterable, count) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.repeat', 'Iterable');
  }
  if (!isNumber(count)) {
    throw new BadArgumentError(2, 'Iterable.repeat', 'number');
  }
  if (count < 0) {
    throw new BadArgumentError(2, 'Iterable.repeat', 'positive number');
  }

  return new Iterable(function* () {
    for (let c = count; c > 0; c -= 1) {
      for (const i of iterable) {
        yield i;
      }
    }
  });
};

/* eslint-disable no-restricted-syntax */

/**
 * @ignore
 */
const replace = (iterable, index, value) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.replace', 'Iterable');
  }
  if (!isNumber(index)) {
    throw new BadArgumentError(2, 'Iterable.replace', 'number');
  }
  if (index < 0) {
    throw new BadArgumentError(2, 'Iterable.replace', 'positive number');
  }

  return new Iterable(function* () {
    let c = 0;

    for (const i of iterable) {
      if (c === index) {
        yield value;
      } else {
        yield i;
      }
      c += 1;
    }
  });
};

/* eslint-disable no-restricted-syntax */

/**
 * @ignore
 */
const reverse = (iterable) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.reverse', 'Iterable');
  }

  return new Iterable(function* () {
    const buffer = [];

    for (const i of iterable) {
      buffer.unshift(i);
    }
    for (const i of buffer) {
      yield i;
    }
  });
};

/* eslint-disable func-names */

/**
 * @ignore
 */
const skip = (iterable, count) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.skip', 'Iterable');
  }
  if (!isNumber(count)) {
    throw new BadArgumentError(2, 'Iterable.skip', 'number');
  }
  if (count < 0) {
    throw new BadArgumentError(2, 'Iterable.skip', 'positive number');
  }

  return new Iterable(function* () {
    let c = count;

    for (const i of iterable) {
      if (c > 0) {
        c -= 1;
      } else {
        yield i;
      }
    }
  });
};

/* eslint-disable func-names */

/**
 * @ignore
 */
const skipLast = (iterable, count) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.skipLast', 'Iterable');
  }
  if (!isNumber(count)) {
    throw new BadArgumentError(2, 'Iterable.skipLast', 'number');
  }
  if (count < 0) {
    throw new BadArgumentError(2, 'Iterable.skipLast', 'positive number');
  }

  return new Iterable(function* () {
    const buffer = [];
    let c = 0;
    for (const i of iterable) {
      if (count > 0) {
        buffer.push(i);
        if (c === count) {
          yield buffer.shift();
        } else {
          c += 1;
        }
      } else {
        yield i;
      }
    }
  });
};

/* eslint-disable func-names */

/**
 * @ignore
 */
const skipWhile = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.skipUntil', 'Iterable');
  }
  if (!isFunction(predicate)) {
    throw new BadArgumentError(2, 'Iterable.skipUntil', 'function');
  }
  return new Iterable(function* () {
    let flag = true;
    for (const i of iterable) {
      if (flag) {
        flag = predicate(i);
      }
      if (!flag) {
        yield i;
      }
    }
  });
};

/* eslint-disable func-names */

/**
 * @ignore
 */
const takeWhile = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.takeWhile', 'Iterable');
  }
  if (!isFunction(predicate)) {
    throw new BadArgumentError(2, 'Iterable.takeWhile', 'function');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      if (predicate(i)) {
        yield i;
      } else {
        return;
      }
    }
  });
};

/**
 * @ignore
 */
const spanWith = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.spanWith', 'Iterable');
  }
  if (!isFunction(predicate)) {
    throw new BadArgumentError(2, 'Iterable.spanWith', 'function');
  }

  return [
    takeWhile(iterable, predicate),
    skipWhile(iterable, predicate),
  ];
};

/* eslint-disable func-names */

/**
 * @ignore
 */
const take = (iterable, count) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.take', 'Iterable');
  }
  if (!isNumber(count)) {
    throw new BadArgumentError(2, 'Iterable.take', 'number');
  }
  if (count < 0) {
    throw new BadArgumentError(2, 'Iterable.take', 'positive number');
  }

  return new Iterable(function* () {
    let c = count;

    for (const i of iterable) {
      if (c > 0) {
        c -= 1;

        yield i;
      } else {
        return;
      }
    }
  });
};

/**
 * @ignore
 */
const split = (iterable, count) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.split', 'Iterable');
  }
  if (!isNumber(count)) {
    throw new BadArgumentError(2, 'Iterable.split', 'number');
  }
  if (count < 0) {
    throw new BadArgumentError(2, 'Iterable.split', 'positive number');
  }

  return [take(iterable, count), skip(iterable, count)];
};

/**
 * @ignore
 */
const startWith = (iterable, ...iterables) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.startWith', 'Iterable');
  }

  return concat(...iterables, iterable);
};

/* eslint-disable func-names */

/**
 * @ignore
 */
const takeLast = (iterable, count) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.takeLast', 'Iterable');
  }
  if (!isNumber(count)) {
    throw new BadArgumentError(2, 'Iterable.takeLast', 'number');
  }
  if (count < 0) {
    throw new BadArgumentError(2, 'Iterable.takeLast', 'positive number');
  }

  return new Iterable(function* () {
    const buffer = [];

    for (const i of iterable) {
      if (count === 0) {
        yield i;
      } else {
        buffer.push(i);
      }
    }

    for (const i of buffer.slice(-count)) {
      yield i;
    }
  });
};

/* eslint-disable no-restricted-syntax */
/**
 * @ignore
 */
const defaultZipper = x => x;
/**
 * @ignore
 */
const zip = (iterables, fn) => {
  if (!(iterables instanceof Array)) {
    throw new BadArgumentError(1, 'Iterable.zip', 'Array');
  }

  let zipper = fn;

  if (!isUndefined(fn)) {
    if (!isFunction(fn)) {
      throw new BadArgumentError(2, 'Iterable.zip', 'function or undefined');
    }
  } else {
    zipper = defaultZipper;
  }

  const count = iterables.length;

  return new Iterable(function* () {
    const generators = [];
    let undef = count;
    let c = 0;

    for (const iterable of iterables) {
      if (isIterable(iterable)) {
        generators[c] = iterable[ITERATOR]();
      } else {
        undef -= 1;
      }
      c += 1;
    }

    while (undef > 0) {
      const values = [];

      for (let i = 0; i < count; i += 1) {
        const g = generators[i];
        if (typeof g !== 'undefined') {
          const { value, done } = g.next();

          values.push(value);

          if (done) {
            generators[i] = undefined;
            undef -= 1;
          }
        } else {
          values.push(undefined);
        }
      }

      yield zipper(values);
    }
  });
};

/* eslint-disable import/no-cycle */

/* eslint-disable no-restricted-syntax */

/**
 * The Iterable class serves as a super set of all objects
 * that implements the Iteration Protocol.
 *
 * Iterable allows the unification and abstraction
 * of these objects.
 *
 * Iterable also provides operators which allows to
 * transform an Iterable into a new one, making Iterable
 * an Immutable.
 */
class Iterable {
  /**
   * Returns an Iterable with the given object.
   *
   * This object must be either a generator or an object
   * that implements the Iteration Protocol.
   *
   * @param {!Iterable} iterable
   * @returns {Iterable}
   */
  constructor(iterable) {
    const it = iterable;
    if (it.constructor.name === 'GeneratorFunction') {
      it[ITERATOR] = it;
      this.it = it;
    } else if (isIterable(it)) {
      this.it = it;
    } else {
      throw new BadArgumentError(1, 'Iterable.<constructor>', 'Iterable or Generator');
    }
    /**
     * @ignore
     */
    this.it = it;

    return new Proxy(this, {
      get(target, index) {
        if (index in target) {
          return target[index];
        }
        if (util.isNumber(index)) {
          return target.get(index);
        }
        return undefined;
      },
    });
  }

  /**
   * Similar to elementAt, excepts that this method
   * returns the actual value at the given index.
   * @param {!number} index
   * @returns {any}
   */
  get(index) {
    const { it } = this;
    let step = 0;
    for (const i of it) {
      if (step === index) {
        return i;
      }
      step += 1;
    }
    return undefined;
  }

  /**
   * Checks if a given Object follows the Iterator Protocol.
   * @param {Object} it
   * @returns {boolean}
   */
  static is(it) {
    return isIterable(it);
  }

  /**
   * Returns an Iterable that yields true if all of the yields of the
   * source Iterable passes the predicate function, false if not.
   * @param {!Iterable} it
   * @param {!function(x: any):boolean} predicate
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  static all(it, predicate) {
    return all(it, predicate);
  }

  /**
   * Returns an Iterable that yields true if all of the yields of
   * this Iterable passes the predicate function, false if not.
   * @param {!function(x: any):boolean} predicate
   * @throws {BadArgumentError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  all(predicate) {
    return all(this.it, predicate);
  }

  /**
   * Returns an Iterable that yields true if any of the yields of the
   * source Iterable passes the predicate function, false if not.
   * @param {!Iterable} it
   * @param {!function(x: any):boolean} predicate
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  static any(it, predicate) {
    return any(it, predicate);
  }

  /**
   * Returns an Iterable that yields true if any of the yields of
   * this Iterable passes the predicate function, false if not.
   * @param {!function(x: any):boolean} predicate
   * @throws {BadArgumentError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  any(predicate) {
    return any(this.it, predicate);
  }

  /**
   * Split an Iterable into a longest prefix such that all
   * the elements of it do not satisfy a given predicate,
   * and the rest of the Iterable following them.
   * @param {!Iterable} it
   * @param {!function(x: any):boolean} predicate
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  static breakWith(it, predicate) {
    return breakWith(it, predicate);
  }

  /**
   * Split an Iterable into a longest prefix such that all
   * the elements of it do not satisfy a given predicate,
   * and the rest of the Iterable following them.
   * @param {!function(x: any):boolean} predicate
   * @throws {BadArgumentError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  breakWith(predicate) {
    return breakWith(this.it, predicate);
  }

  /**
   * Caches all yields of the source Iterable, for the purpose
   * of not re-running the computing function that yields
   * the result.
   * @param {!Iterable} it
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @returns {Iterable}
   */
  static cache(it) {
    return cache(it);
  }

  /**
   * Caches all yields of this Iterable, for the purpose
   * of not re-running the computing function that yields
   * the result.
   * @param {!Iterable} it
   * @returns {Iterable}
   */
  cache() {
    return cache(this.it);
  }

  /**
   * Transforms the source Iterable by applying a composer function. This
   * is useful for creating your own Iterable operators.
   * @param {!Iterable} it
   * @param  {...function(iterable: Iterable):Iterable} composers
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if one of the given composers is not a function.
   * @throws {TypeError}
   * throws error if a given composer returned a non-Iterable.
   * @returns {Iterable}
   */
  static compose(it, ...composers) {
    return compose(it, ...composers);
  }

  /**
   * Transforms this Iterable by applying a composer function. This
   * is useful for creating your own Iterable operators.
   * @param  {...function(iterable: Iterable):Iterable} composers
   * @throws {BadArgumentError}
   * throws error if one of the given composers is not a function.
   * @throws {TypeError}
   * throws error if a given composer returned a non-Iterable.
   * @returns {Iterable}
   */
  compose(...composers) {
    return compose(this.it, ...composers);
  }

  /**
   * Concatenates the given set of Iterables into a single Iterable.
   *
   * If a value is an Iterable, concat removes a single layer
   * of nesting
   * @param  {...any} its
   * @returns {Iterable}
   */
  static concat(...its) {
    return concat(...its);
  }

  /**
   * Concatenates the given Iterables to this Iterable.
   *
   * If a value is an Iterable, concat removes a single layer
   * of nesting
   *
   * @param  {...any} its
   * @returns {Iterable}
   */
  concat(...its) {
    return concat(this.it, ...its);
  }

  /**
   * Returns an Iterable that yields a Boolean that indicates
   * whether the source Iterable yielded a specified item.
   * @param {!Iterable} it
   * @param {any} value
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @returns {Iterable}
   */
  static contains(it, value) {
    return contains(it, value);
  }

  /**
   * Returns an Iterable that yields a Boolean that indicates
   * whether the source Iterable yielded a specified item.
   * @param {any} value
   * @returns {Iterable}
   */
  contains(value) {
    return contains(this.it, value);
  }

  /**
   * Returns an Iterable that counts the total number of items
   * yielded by the source Iterable and yields this count.
   * @param {!Iterable} it
   * @returns {Iterable}
   */
  static count(it) {
    return count(it);
  }

  /**
   * Returns an Iterable that counts the total number of items
   * yielded by this Iterable and yields this count.
   * @returns {Iterable}
   */
  count() {
    return count(this.it);
  }

  /**
   * Returns an Iterable that yields the single item at a specified
   * index in a sequence of yields from the source Iterable.
   * @param {!Iterable} it
   * @param {!number} index
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given index is not a number.
   * @returns {Iterable}
   */
  static elementAt(it, index) {
    return elementAt(it, index);
  }

  /**
   * Returns an Iterable that yields the single item at a specified
   * index in a sequence of yields from this Iterable.
   * @param {!number} index
   * @throws {BadArgumentError}
   * throws error if the given index is not a number.
   * @returns {Iterable}
   */
  elementAt(index) {
    return elementAt(this.it, index);
  }

  /**
   * Returns an Iterable that doesn't yield any value.
   * @returns {Iterable}
   */
  static empty() {
    return empty();
  }

  /**
   * Filters the yields of a source Iterable with a filter function.
   *
   * @param {!Iterable} it
   * @param {!function(x: any):boolean} fn
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  static filter(it, fn) {
    return filter(it, fn);
  }

  /**
   * Filters the yields of this Iterable with a filter function.
   * @param {!function(x: any):boolean} fn
   * @throws {BadArgumentError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  filter(fn) {
    return filter(this.it, fn);
  }

  /**
   * Finds the index of the first element that satisfy a predicate.
   * @param {!Iterable} it
   * @param {!function(x: any):boolean} predicate
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @returns {Iterable}
   */
  static find(it, predicate) {
    return find(it, predicate);
  }

  /**
   * Finds the index of the first element that satisfy a predicate.
   * @param {!function(x: any):boolean} predicate
   * @returns {Iterable}
   */
  find(predicate) {
    return find(this.it, predicate);
  }

  /**
   * Returns an Iterable that yields the first value of the source
   * Iterable.
   * @param {!Iterable} it
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @returns {Iterable}
   */
  static first(it) {
    return first(it);
  }

  /**
   * Returns an Iterable that yields the first value of this
   * Iterable.
   * @returns {Iterable}
   */
  first() {
    return first(this.it);
  }

  /**
   * Flattens the source Iterable by removing a single layer of
   * nesting for the yielded Iterables.
   * @param {!Iterable} it
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @returns {Iterable}
   */
  static flat(it) {
    return flat(it);
  }

  /**
   * Flattens this Iterable by removing a single layer of nesting
   * for the yielded Iterables.
   * @returns {Iterable}
   */
  flat() {
    return flat(this.it);
  }

  /**
   * Returns an Iterable that yields items based on applying a
   * function that you supply to each item yielded by the source
   * Iterable, where that function returns an Iterable, and then
   * merging those resulting Iterable and yielding the results of this merger.
   * @param {!Iterable} it
   * @param {!function(x: any):Iterable} mapper
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given mapper is not a function
   * @returns {Iterable}
   */
  static flatMap(it, mapper) {
    return flatMap(it, mapper);
  }

  /**
   * Returns an Iterable that yields items based on applying a
   * function that you supply to each item yielded by this
   * Iterable, where that function returns an Iterable, and then
   * merging those resulting Iterable and yielding the results of this merger.
   * @param {!function(x: any):Iterable} mapper
   * @throws {BadArgumentError}
   * throws error if the given mapper is not a function
   * @returns {Iterable}
   */
  flatMap(mapper) {
    return flatMap(this.it, mapper);
  }

  /**
   * Returns an Iterable that yields Iterable buffers of items
   * it collects from the source Iterable.
   * @param {!Iterable} it
   * @param {!number} amount
   */
  static buffer(it, amount) {
    return buffer(it, amount);
  }

  /**
   * Returns an Iterable that yields Iterable buffers of items
   * it collects from this Iterable.
   * @param {!Iterable} it
   * @param {!number} amount
   */
  buffer(amount) {
    return buffer(this.it, amount);
  }

  /**
   * Returns an Iterable that yields the index of the
   * given value if it the source Iterable yields the same
   * value.
   * @param {!Iterable} it
   * @param {any} value
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @returns {Iterable}
   */
  static indexOf(it, value) {
    return indexOf(it, value);
  }

  /**
   * Returns an Iterable that yields the index of the
   * given value if it this Iterable yields the same
   * value.
   * @param {any} value
   * @returns {Iterable}
   */
  indexOf(value) {
    return indexOf(this.it, value);
  }

  /**
   * Returns an Iterable that yields true if this
   * Iterable is empty.
   * @param {!Iterable} it
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @returns {Iterable}
   */
  static isEmpty(it) {
    return isEmpty(it);
  }

  /**
   * Returns an Iterable that yields the true if this
   * Iterable is empty.
   * @returns {Iterable}
   */
  isEmpty() {
    return isEmpty(this.it);
  }

  /**
   * Returns an Iterable that yields a single value.
   * @param {any} value
   * @returns {Iterable}
   */
  static just(value) {
    return just(value);
  }

  /**
   * Returns an Iterable that yields the last value of the source
   * Iterable.
   * @param {!Iterable} it
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @returns {Iterable}
   */
  static last(it) {
    return last(it);
  }

  /**
   * Returns an Iterable that yields the last value of this
   * Iterable.
   * @returns {Iterable}
   */
  last() {
    return last(this.it);
  }


  /**
   * Applies a mapping function to each yielded value of the source
   * Iterable.
   * @param {!Iterable} it
   * @param {!function(x: any):any} fn
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given mapper is not a function
   * @returns {Iterable}
   */
  static map(it, fn) {
    return map(it, fn);
  }

  /**
   * Applies a mapping function to each yielded value of this
   * Iterable.
   * @param {!function(x: any):any} fn
   * @throws {BadArgumentError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  map(fn) {
    return map(this.it, fn);
  }

  /**
   * Attaches a callback to a source Iterable that is
   * executed when the Iterable finishes the iteration
   * process.
   * @param {!Iterable} it
   * @param {!function(x: any)} fn
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given action is not a function
   * @returns {Iterable}
   */
  static onDone(it, fn) {
    return onDone(it, fn);
  }

  /**
   * Attaches a callback to this Iterable that is
   * executed when this Iterable finishes the iteration
   * process.
   * @param {!function(x: any)} fn
   * @throws {BadArgumentError}
   * throws error if the given action is not a function
   * @returns {Iterable}
   */
  onDone(fn) {
    return onDone(this.it, fn);
  }

  /**
   * Attaches a callback to a source Iterable that is
   * executed when the Iterable finishes the iteration
   * process.
   * @param {!Iterable} it
   * @param {!function(x: any)} fn
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given action is not a function
   * @returns {Iterable}
   */
  static onStart(it, fn) {
    return onStart(it, fn);
  }

  /**
   * Attaches a callback to this Iterable that is
   * executed when this Iterable finishes the iteration
   * process.
   * @param {!function(x: any)} fn
   * @throws {BadArgumentError}
   * throws error if the given action is not a function
   * @returns {Iterable}
   */
  onStart(fn) {
    return onStart(this.it, fn);
  }

  /**
   * Attaches a callback to a source Iterable that is
   * executed whenever the source Iterable yields
   * a value.
   * @param {!Iterable} it
   * @param {!function(x: any)} fn
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given consumer is not a function
   * @returns {Iterable}
   */
  static onYield(it, fn) {
    return onYield(it, fn);
  }

  /**
   * Attaches a callback to this Iterable that is
   * executed whenever this Iterable yields
   * a value.
   * @param {!function(x: any)} fn
   * @throws {BadArgumentError}
   * throws error if the given consumer is not a function
   * @returns {Iterable}
   */
  onYield(fn) {
    return onYield(this.it, fn);
  }

  /**
   * Given a predicate and an Iterable, return a pair of Iterables
   * which do and do not satisfy the predicate, respectively.
   * @param {!Iterable} it
   * @param {!function(x: any):boolean} predicate
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given consumer is not a function
   * @returns {Iterable}
   */
  static partition(it, predicate) {
    return partition(it, predicate);
  }

  /**
   * Given a predicate and an Iterable, return a pair of Iterables
   * which do and do not satisfy the predicate, respectively.
   * @param {!function(x: any):boolean} predicate
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given consumer is not a function
   * @returns {Iterable}
   */
  partition(predicate) {
    return partition(this.it, predicate);
  }

  /**
   * Returns an Iterable that yields a sequence of numbers
   * within a specified range.
   * @param {!number} start
   * @param {!number} end
   * @param {?number} steps
   * @returns {Iterable}
   */
  static range(start, end, steps) {
    return range(start, end, steps);
  }

  /**
   * Repeats the yielded values of a source Iterable by a certain
   * amount.
   * @param {!Iterable} it
   * @param {!number} amount
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given amount is not a number.
   * @returns {Iterable}
   */
  static repeat(it, amount) {
    return repeat(it, amount);
  }

  /**
   * Repeats the yielded values of this Iterable by a certain
   * amount.
   * @param {!number} amount
   * @throws {BadArgumentError}
   * throws error if the given amount is not a number.
   * @returns {Iterable}
   */
  repeat(amount) {
    return repeat(this.it, amount);
  }

  /**
   * Returns an Iterable that replaces the value at the
   * given index of the source Iterable with the given value.
   * @param {!Iterable} it
   * @param {!number} index
   * @param {any} value
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given index is not a number.
   * @returns {Iterable}
   */
  static replace(it, index, value) {
    return replace(it, index, value);
  }

  /**
   * Returns an Iterable that replaces the value at the
   * given index of this Iterable with the given value.
   * @param {!number} index
   * @param {any} value
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given index is not a number.
   * @returns {Iterable}
   */
  replace(index, value) {
    return replace(this.it, index, value);
  }

  /**
   * Reverses the yield sequence of the source Iterable
   * @param {!Iterable} it
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @returns {Iterable}
   */
  static reverse(it) {
    return reverse(it);
  }

  /**
   * Reverses the yield sequence of this Iterable
   * @returns {Iterable}
   */
  reverse() {
    return reverse(this.it);
  }

  /**
   * Returns an Iterable that skips the first count items yielded by
   * the source Iterable and yields the remainder.
   * @param {!Iterable} it
   * @param {!number} amount
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given amount is not a number.
   * @returns {Iterable}
   */
  static skip(it, amount) {
    return skip(it, amount);
  }

  /**
   * Returns an Iterable that skips the first count items yielded by
   * the source Iterable and yields the remainder.
   * @param {!number} amount
   * @throws {BadArgumentError}
   * throws error if the given amount is not a number.
   * @returns {Iterable}
   */
  skip(amount) {
    return skip(this.it, amount);
  }

  /**
   * Returns an Iterable that drops a specified number of items
   * from the end of the sequence yielded by the source
   * Iterable.
   * @param {!Iterable} it
   * @param {!number} amount
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given amount is not a number.
   * @returns {Iterable}
   */
  static skipLast(it, amount) {
    return skipLast(it, amount);
  }

  /**
   * Returns an Iterable that drops a specified number of items
   * from the end of the sequence yielded by this Iterable.
   * @param {!number} amount
   * @throws {BadArgumentError}
   * throws error if the given amount is not a number.
   * @returns {Iterable}
   */
  skipLast(amount) {
    return skipLast(this.it, amount);
  }

  /**
   * Returns an Iterable that skips all items yielded by the source
   * Iterable as long as a specified condition holds true, but yields
   * all further source items as soon as the condition becomes false.
   * @param {!Iterable} it
   * @param {!function(x: any):boolean} predicate
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  static skipWhile(it, predicate) {
    return skipWhile(it, predicate);
  }

  /**
   * Returns an Iterable that skips all items yielded by the source
   * Iterable as long as a specified condition holds true, but yields
   * all further source items as soon as the condition becomes false.
   * @param {!function(x: any):boolean} predicate
   * @throws {BadArgumentError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  skipWhile(predicate) {
    return skipWhile(this.it, predicate);
  }

  /**
   * Split an Iterable into a longest prefix such that all
   * the elements of it do satisfy a given predicate,
   * and the rest of the Iterable following them.
   * @param {!Iterable} it
   * @param {!function(x: any):boolean} predicate
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  static spanWith(it, predicate) {
    return spanWith(it, predicate);
  }

  /**
   * Split an Iterable into a longest prefix such that all
   * the elements of it do satisfy a given predicate,
   * and the rest of the Iterable following them.
   * @param {!function(x: any):boolean} predicate
   * @throws {BadArgumentError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  spanWith(predicate) {
    return spanWith(this.it, predicate);
  }

  /**
   * Given an index, get a two-tuple of Iterable
   * from the start of the source Iterable,
   * and the Iterable that follows them.
   * @param {!Iterable} it
   * @param {!number} amount
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given amount is not a number.
   * @returns {Array}
   */
  static split(it, amount) {
    return split(it, amount);
  }

  /**
   * Given an index, get a two-tuple of Iterable
   * from the start of this Iterable,
   * and the Iterable that follows them.
   * @param {!number} amount
   * @throws {BadArgumentError}
   * throws error if the given amount is not a number.
   * @returns {Array}
   */
  split(amount) {
    return split(this.it, amount);
  }

  /**
   * Same to concat, except that it prefixes the source Iterable
   * to a set of values into a single Iterable.
   *
   * If a value is an Iterable, startWith removes a single layer
   * of nesting
   *
   * @param {!Iterable} it
   * @param  {...any} its
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @returns {Iterable}
   */
  static startWith(it, ...its) {
    return startWith(it, ...its);
  }

  /**
   * Same to concat, except that it prefixes this Iterable
   * to a set of values into a single Iterable.
   *
   * If a value is an Iterable, startWith removes a single layer
   * of nesting
   *
   * @param  {...any} its
   * @returns {Iterable}
   */
  startWith(...its) {
    return startWith(this.it, ...its);
  }

  /**
   * Returns an Iterable that yields only the first count items yielded by the
   * source Iterable.
   * @param {!Iterable} it
   * @param {!number} amount
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given amount is not a number.
   * @returns {Iterable}
   */
  static take(it, amount) {
    return take(it, amount);
  }

  /**
   * Returns an Iterable that yields only the first count items yielded by
   * this Iterable.
   * @param {!number} amount
   * @throws {BadArgumentError}
   * throws error if the given amount is not a number.
   * @returns {Iterable}
   */
  take(amount) {
    return take(this.it, amount);
  }

  /**
   * Returns an Iterable that yields at most the last amount
   * items yielded by the source Iterable.
   * @param {!Iterable} it
   * @param {!number} amount
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given amount is not a number.
   * @returns {Iterable}
   */
  static takeLast(it, amount) {
    return takeLast(it, amount);
  }

  /**
   * Returns an Iterable that yields at most the last amount
   * items yielded by the source Iterable.
   * @param {!number} amount
   * @throws {BadArgumentError}
   * throws error if the given amount is not a number.
   * @returns {Iterable}
   */
  takeLast(amount) {
    return takeLast(this.it, amount);
  }

  /**
   * Returns an Iterable that yields items yielded by the source Iterable
   * so long as each item satisfied a specified condition, and then
   * completes as soon as this condition is not satisfied.
   * @param {!Iterable} it
   * @param {!function(x: any):boolean} predicate
   * @throws {BadArgumentError}
   * throws error if the given Iterable doesn't implement the Iteration Protocol
   * @throws {BadArgumentError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  static takeWhile(it, predicate) {
    return takeWhile(it, predicate);
  }

  /**
   * Returns an Iterable that yields items yielded by this Iterable
   * so long as each item satisfied a specified condition, and then
   * completes as soon as this condition is not satisfied.
   * @param {!function(x: any):boolean} predicate
   * @throws {BadArgumentError}
   * throws error if the given predicate is not a function
   * @returns {Iterable}
   */
  takeWhile(predicate) {
    return takeWhile(this.it, predicate);
  }

  /**
   * combine the yields of multiple Iterables together via a specified function and
   * yields single items for each combination based on the results of this function.
   * @param {!Array} its
   * @param {!function(yields: Array):any} fn
   * @throws {BadArgumentError}
   * throws error if the given iterables is not an array
   * @throws {BadArgumentError}
   * throws error if the given zipper is not a function or undefined
   * @returns {Iterable}
   */
  static zip(its, fn) {
    return zip(its, fn);
  }

  /**
   * combine the yields of this Iterable with multiple Iterables together via a specified
   * function and yields single items for each combination based on the results of this
   * function.
   * @param {!Array} its
   * @param {!function(yields: Array):any} fn
   * @throws {BadArgumentError}
   * throws error if the given iterables is not an array
   * @throws {BadArgumentError}
   * throws error if the given zipper is not a function or undefined
   * @returns {Iterable}
   */
  zip(its, fn) {
    return zip([this.it, ...its], fn);
  }

  /**
   * Implements the Iterator Protocol for this Iterable.
   */
  [ITERATOR]() {
    return this.it[ITERATOR]();
  }
}

module.exports = Iterable;
