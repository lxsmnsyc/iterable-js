var Iterable = (function (Iterable$1) {
  'use strict';

  Iterable$1 = Iterable$1 && Iterable$1.hasOwnProperty('default') ? Iterable$1['default'] : Iterable$1;

  /* eslint-disable valid-typeof */
  /* eslint-disable func-names */
  /* eslint-disable no-restricted-syntax */
  /**
   * @ignore
   */
  const CLASS_NAME = 'Iterable';
  /**
   * @ignore
   */
  const TYPE_FUNC = 'function';
  /**
   * @ignore
   */
  const TYPE_NUM = 'number';
  /**
   * @ignore
   */
  const TYPE_POS_NUM = 'positive number';
  /**
   * @ignore
   */
  const ITERATOR = Symbol.iterator;
  /**
   * @ignore
   */
  const isFunction = x => typeof x === TYPE_FUNC;
  /**
   * @ignore
   */
  const isNumber = x => typeof x === TYPE_NUM;
  /**
   * @ignore
   */
  const isUndefined = x => typeof x === 'undefined' || x === null;

  /**
   * @ignore
   */
  const isIterable = x => !isUndefined(x) && isFunction(x[ITERATOR]);
  /**
   * @ignore
   */
  class BadArgumentError extends TypeError {
    constructor(argumentNo, methodName, expectedType) {
      super();
      this.message = `bad argument #${argumentNo} to ${methodName} (${expectedType} expected)`;
    }
  }
  /**
   * @ignore
   */
  const IterableCheck = (iterable, argNo, field) => {
    if (!isIterable(iterable)) {
      throw new BadArgumentError(argNo, field, CLASS_NAME);
    }
  };
  /**
   * @ignore
   */
  const FunctionCheck = (predicate, argNo, field) => {
    if (!isFunction(predicate)) {
      throw new BadArgumentError(argNo, field, TYPE_FUNC);
    }
  };
  /**
   * @ignore
   */
  const NumberCheck = (num, argNo, field) => {
    if (!isNumber(num)) {
      throw new BadArgumentError(argNo, field, TYPE_NUM);
    }
  };
  /**
   * @ignore
   */
  const PositiveNumberCheck = (num, argNo, field) => {
    NumberCheck(num, argNo, field);
    if (num <= 0) {
      throw new BadArgumentError(argNo, field, TYPE_POS_NUM);
    }
  };
  /**
   * @ignore
   */
  const IterablePredicateCheck = (iterable, predicate, field) => {
    IterableCheck(iterable, 1, field);
    FunctionCheck(predicate, 2, field);
  };
  /**
   * @ignore
   */
  const IterablePositiveNumberCheck = (iterable, num, field) => {
    IterableCheck(iterable, 1, field);
    PositiveNumberCheck(num, 2, field);
  };
  /**
   * @ignore
   */
  const DoubleIterableCheck = (iterable, other, field) => {
    IterableCheck(iterable, 1, field);
    IterableCheck(other, 2, field);
  };
  /**
   * @ignore
   */
  const defineField = x => `${CLASS_NAME}.${x}`;

  /* eslint-disable no-restricted-syntax */

  /**
   * @ignore
   */
  const FIELD = defineField('all');
  /**
   * @ignore
   */
  var all = (iterable, predicate) => {
    IterablePredicateCheck(iterable, predicate, FIELD);
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
  const FIELD$1 = defineField('any');
  /**
   * @ignore
   */
  var any = (iterable, predicate) => {
    IterablePredicateCheck(iterable, predicate, FIELD$1);
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
  const FIELD$2 = defineField('average');
  /**
   * @ignore
   */
  var average = (iterable) => {
    IterableCheck(iterable, FIELD$2);
    return new Iterable(function* () {
      let acc = 0;
      let c = 0;

      for (const i of iterable) {
        acc += i;
        c += 1;
      }

      yield acc / c;
    });
  };

  /* eslint-disable func-names */

  /* eslint-disable func-names */
  /**
   * @ignore
   */
  const FIELD$3 = defineField('takeUntil');
  /**
   * @ignore
   */
  var takeUntil = (iterable, predicate) => {
    IterablePredicateCheck(iterable, predicate, FIELD$3);
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
  const FIELD$4 = defineField('skipUntil');
  /**
   * @ignore
   */
  var skipUntil = (iterable, predicate) => {
    IterablePredicateCheck(iterable, predicate, FIELD$4);
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
  const FIELD$5 = defineField('breakWith');
  /**
   * @ignore
   */
  var breakWith = (iterable, predicate) => {
    IterablePredicateCheck(iterable, predicate, FIELD$5);
    return [
      takeUntil(iterable, predicate),
      skipUntil(iterable, predicate),
    ];
  };

  /* eslint-disable func-names */

  /**
   * @ignore
   */
  const FIELD$6 = defineField('buffer');
  /**
   * @ignore
   */
  var buffer = (iterable, count) => {
    IterablePositiveNumberCheck(iterable, count, FIELD$6);

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

  /* eslint-disable func-names */

  /**
   * @ignore
   */
  const FIELD$7 = defineField('cache');
  /**
   * @ignore
   */
  var cache = (iterable) => {
    IterableCheck(iterable, 1, FIELD$7);

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
  const FIELD$8 = defineField('compose');
  /**
   * @ignore
   */
  var compose = (iterable, ...composers) => {
    IterableCheck(iterable, 1, FIELD$8);
    let i = 1;

    let result = iterable;
    for (const c of composers) {
      i += 1;
      FunctionCheck(c, i, FIELD$8);
      result = c(result);

      if (!isIterable(result)) {
        throw new TypeError('Iterable.compose: a composer function returned a non-Iterable.');
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
  const FIELD$9 = defineField('flat');
  /**
   * @ignore
   */
  var flat = (iterable) => {
    IterableCheck(iterable, 1, FIELD$9);
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
  var concat = (...iterables) => flat(new Iterable(iterables));

  /* eslint-disable no-restricted-syntax */
  /**
   * @ignore
   */
  const FIELD$a = defineField('flatMap');
  /**
   * @ignore
   */
  var map = (iterable, mapper) => {
    IterablePredicateCheck(iterable, mapper, FIELD$a);
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
  const FIELD$b = defineField('find');
  /**
   * @ignore
   */
  var find = (iterable, predicate) => {
    IterablePredicateCheck(iterable, predicate, FIELD$b);
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
  const FIELD$c = defineField('indexOf');
  /**
   * @ignore
   */
  var indexOf = (iterable, value) => {
    IterableCheck(iterable, 1, FIELD$c);
    return find(iterable, x => x === value);
  };

  /* eslint-disable func-names */

  /**
   * @ignore
   */
  const FIELD$d = defineField('contains');
  /**
   * @ignore
   */
  var contains = (iterable, value) => {
    IterableCheck(iterable, 1, FIELD$d);
    return map(indexOf(iterable, value), x => x > -1);
  };

  /* eslint-disable func-names */

  /**
   * @ignore
   */
  const FIELD$e = defineField('count');
  /**
   * @ignore
   */
  var count = (iterable) => {
    IterableCheck(iterable, 1, FIELD$e);

    return new Iterable(function* () {
      let c = 0;
      // eslint-disable-next-line no-unused-vars
      for (const i of iterable) {
        c += 1;
      }
      yield c;
    });
  };

  /* eslint-disable func-names */

  const FIELD$f = defineField('defaultIfEmpty');

  var defaultIfEmpty = (iterable, value) => {
    IterableCheck(iterable, 1, FIELD$f);
    return new Iterable$1(function* () {
      let flag = true;

      for (const i of iterable) {
        yield i;
        flag = false;
      }
      if (flag) {
        yield value;
      }
    });
  };

  /* eslint-disable func-names */

  /* eslint-disable func-names */

  /**
   * @ignore
   */
  const FIELD$g = defineField('distinct');
  /**
   * @ignore
   */
  var distinct = (iterable) => {
    IterableCheck(iterable, 1, FIELD$g);
    return new Iterable(function* () {
      const buffer = [];
      for (const i of iterable) {
        if (!buffer.includes(i)) {
          yield i;
        }
        buffer.push(i);
      }
    });
  };

  /* eslint-disable func-names */

  /**
   * @ignore
   */
  const FIELD$h = defineField('distinctAdjacent');
  /**
   * @ignore
   */
  var distinctAdjacent = (iterable) => {
    IterableCheck(iterable, 1, FIELD$h);
    return new Iterable(function* () {
      let first = true;
      let prev;
      for (const i of iterable) {
        if (first) {
          yield i;
          first = false;
        } else if (prev !== i) {
          yield i;
        }
        prev = i;
      }
    });
  };

  /* eslint-disable no-restricted-syntax */
  /**
   * @ignore
   */
  const FIELD$i = defineField('elementAt');
  /**
   * @ignore
   */
  var elementAt = (iterable, index) => {
    IterablePositiveNumberCheck(iterable, index, FIELD$i);

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
  var empty = () => new Iterable([]);

  /* eslint-disable no-restricted-syntax */
  /**
   * @ignore
   */
  const FIELD$j = defineField('toArray');
  /**
   * @ignore
   */
  var toArray = (iterable) => {
    IterableCheck(iterable, 1, FIELD$j);
    const buffer = [];

    for (const i of iterable) {
      buffer.push(i);
    }

    return buffer;
  };

  /* eslint-disable func-names */
  /**
   * @ignore
   */
  const FIELD$k = defineField('equal');
  /**
   * @ignore
   */
  var equal = (iterable, other) => {
    DoubleIterableCheck(iterable, other, FIELD$k);

    return new Iterable(function* () {
      const arr = toArray(iterable);

      for (const i of other) {
        if (i !== arr.shift()) {
          yield false;
          return;
        }
      }

      yield arr.length === 0;
    });
  };

  /* eslint-disable func-names */

  /**
   * @ignore
   */
  const FIELD$l = defineField('filter');
  /**
   * @ignore
   */
  var filter = (iterable, predicate) => {
    IterablePredicateCheck(iterable, predicate, FIELD$l);
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
  const FIELD$m = defineField('first');
  /**
   * @ignore
   */
  const defaultTest = () => true;
  /**
   * @ignore
   */
  var first = (iterable, predicate) => {
    IterableCheck(iterable, 1, FIELD$m);

    let fn = predicate;

    if (!isUndefined(fn)) {
      FunctionCheck(predicate, 2, FIELD$m);
    } else {
      fn = defaultTest;
    }

    return new Iterable(function* () {
      for (const i of iterable) {
        if (fn(i)) {
          yield i;
          return;
        }
      }
    });
  };

  /**
   * @ignore
   */
  const FIELD$n = defineField('flatMap');
  /**
   * @ignore
   */
  var flatMap = (iterable, mapper) => {
    IterablePredicateCheck(iterable, mapper, FIELD$n);
    return flat(map(iterable, mapper));
  };

  /* eslint-disable func-names */
  /**
   * @ignore
   */
  const FIELD$o = defineField('reduce');
  /**
   * @ignore
   */
  var reduce = (iterable, predicate) => {
    IterablePredicateCheck(iterable, predicate, FIELD$o);
    return new Iterable(function* () {
      let acc;

      for (const i of iterable) {
        acc = predicate(acc, i);
      }

      yield acc;
    });
  };

  /* eslint-disable no-restricted-syntax */
  /**
   * @ignore
   */
  const FIELD$p = defineField('intercalate');
  /**
   * @ignore
   */
  var intercalate = (iterable, other) => {
    DoubleIterableCheck(iterable, other, FIELD$p);

    return reduce(iterable, (acc, item) => {
      if (typeof acc === 'undefined') {
        return [item];
      }
      for (const i of iterable) {
        acc.push(i);
      }
      acc.push(item);
      return acc;
    });
  };

  /* eslint-disable func-names */
  /**
   * @ignore
   */
  const FIELD$q = defineField('intersect');
  /**
   * @ignore
   */
  var intersect = (iterable, other) => {
    DoubleIterableCheck(iterable, other, FIELD$q);

    return new Iterable(function* () {
      for (const i of iterable) {
        for (const o of other) {
          if (i === o) {
            yield i;
          }
        }
      }
    });
  };

  /**
   * @ignore
   */
  const FIELD$r = defineField('intersperse');
  /**
   * @ignore
   */
  var intersperse = (iterable, value) => {
    IterableCheck(iterable, 1, FIELD$r);

    return reduce(iterable, (acc, item) => {
      if (typeof acc === 'undefined') {
        return [item];
      }
      acc.push(value);
      acc.push(item);
      return acc;
    });
  };

  /* eslint-disable no-unused-vars */
  /**
   * @ignore
   */
  const FIELD$s = defineField('isEmpty');
  /**
   * @ignore
   */
  var isEmpty = (iterable) => {
    IterableCheck(iterable, 1, FIELD$s);

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
  var just = x => new Iterable([x]);

  /* eslint-disable func-names */
  /**
   * @ignore
   */
  const FIELD$t = defineField('last');
  /**
   * @ignore
   */
  const defaultTest$1 = () => true;
  /**
   * @ignore
   */
  var last = (iterable, predicate) => {
    IterableCheck(iterable, 1, FIELD$t);

    let fn = predicate;

    if (!isUndefined(fn)) {
      FunctionCheck(predicate, 2, FIELD$t);
    } else {
      fn = defaultTest$1;
    }
    return new Iterable(function* () {
      let v;
      for (const i of iterable) {
        if (fn(i)) {
          v = i;
        }
      }
      yield v;
    });
  };

  /* eslint-disable func-names */

  const { max } = Math;
  /**
   * @ignore
   */
  const FIELD$u = defineField('max');
  /**
   * @ignore
   */
  var max$1 = (iterable) => {
    IterableCheck(iterable, FIELD$u);
    return new Iterable(function* () {
      let acc;

      for (const i of iterable) {
        if (isUndefined(acc)) {
          acc = i;
        } else {
          acc = max(acc, i);
        }
      }

      yield acc;
    });
  };

  /* eslint-disable func-names */

  const { min } = Math;
  /**
   * @ignore
   */
  const FIELD$v = defineField('min');
  /**
   * @ignore
   */
  var min$1 = (iterable) => {
    IterableCheck(iterable, FIELD$v);
    return new Iterable(function* () {
      let acc;

      for (const i of iterable) {
        if (isUndefined(acc)) {
          acc = i;
        } else {
          acc = min(acc, i);
        }
      }

      yield acc;
    });
  };

  /* eslint-disable no-restricted-syntax */
  /**
   * @ignore
   */
  const FIELD$w = defineField('onDone');
  /**
   * @ignore
   */
  var onDone = (iterable, fn) => {
    IterablePredicateCheck(iterable, fn, FIELD$w);
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
  const FIELD$x = defineField('onStart');
  /**
   * @ignore
   */
  var onStart = (iterable, fn) => {
    IterablePredicateCheck(iterable, fn, FIELD$x);
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
  const FIELD$y = defineField('onYield');
  /**
   * @ignore
   */
  var onYield = (iterable, fn) => {
    IterablePredicateCheck(iterable, fn, FIELD$y);
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
  const FIELD$z = defineField('partition');
  /**
   * @ignore
   */
  var partition = (iterable, predicate) => {
    IterablePredicateCheck(iterable, predicate, FIELD$z);
    return [
      filter(iterable, predicate),
      filter(iterable, x => !predicate(x)),
    ];
  };

  /* eslint-disable func-names */
  /**
   * @ignore
   */
  const FIELD$A = defineField('range');
  /**
   * @ignore
   */
  const range = (start, end, steps) => {
    NumberCheck(start, 1, FIELD$A);
    NumberCheck(end, 2, FIELD$A);

    let step = steps;

    if (!isUndefined(steps)) {
      NumberCheck(steps, 3, FIELD$A);
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
  const FIELD$B = defineField('repeat');
  /**
   * @ignore
   */
  var repeat = (iterable, count) => {
    IterablePositiveNumberCheck(iterable, count, FIELD$B);
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
  const FIELD$C = defineField('replace');
  /**
   * @ignore
   */
  var replace = (iterable, index, value) => {
    IterablePositiveNumberCheck(iterable, index, FIELD$C);
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
  const FIELD$D = defineField('reverse');
  /**
   * @ignore
   */
  var reverse = (iterable) => {
    IterableCheck(iterable, 1, FIELD$D);
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
  const FIELD$E = defineField('scan');
  /**
   * @ignore
   */
  var scan = (iterable, predicate) => {
    IterablePredicateCheck(iterable, predicate, FIELD$E);
    return new Iterable(function* () {
      let acc;

      for (const i of iterable) {
        acc = predicate(acc, i);
        yield acc;
      }
    });
  };

  /* eslint-disable func-names */
  /**
   * @ignore
   */
  const FIELD$F = defineField('skip');
  /**
   * @ignore
   */
  var skip = (iterable, count) => {
    IterablePositiveNumberCheck(iterable, count, FIELD$F);
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
  const FIELD$G = defineField('skipLast');
  /**
   * @ignore
   */
  var skipLast = (iterable, count) => {
    IterablePositiveNumberCheck(iterable, count, FIELD$G);
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
  const FIELD$H = defineField('skipWhile');
  /**
   * @ignore
   */
  var skipWhile = (iterable, predicate) => {
    IterablePredicateCheck(iterable, predicate, FIELD$H);
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

  /**
   * @ignore
   */
  const FIELD$I = defineField('sort');
  /**
   * @ignore
   */
  const defaultComparator = (a, b) => a - b;
  /**
   * @ignore
   */
  var sort = (iterable, comparator) => {
    IterableCheck(iterable, 1, FIELD$I);

    let fn = comparator;

    if (!isUndefined(fn)) {
      FunctionCheck(comparator, 2, FIELD$I);
    } else {
      fn = defaultComparator;
    }

    return new Iterable(toArray(iterable).sort(fn));
  };

  /* eslint-disable func-names */
  /**
   * @ignore
   */
  const FIELD$J = defineField('sorted');
  /**
   * @ignore
   */
  const defaultComparator$1 = (a, b) => a - b;
  /**
   * @ignore
   */
  var sorted = (iterable, comparator) => {
    IterableCheck(iterable, 1, FIELD$J);

    let fn = comparator;

    if (!isUndefined(fn)) {
      FunctionCheck(comparator, 2, FIELD$J);
    } else {
      fn = defaultComparator$1;
    }

    return new Iterable(function* () {
      let prev;

      for (const i of iterable) {
        if (typeof prev !== 'undefined' && comparator(prev, i) > 0) {
          yield false;
          return;
        }
        prev = i;
      }
      yield true;
    });
  };

  /* eslint-disable func-names */
  /**
   * @ignore
   */
  const FIELD$K = defineField('takeWhile');
  /**
   * @ignore
   */
  var takeWhile = (iterable, predicate) => {
    IterablePredicateCheck(iterable, predicate, FIELD$K);
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
  const FIELD$L = defineField('spanWith');
  /**
   * @ignore
   */
  var spanWith = (iterable, predicate) => {
    IterablePredicateCheck(iterable, predicate, FIELD$L);
    return [
      takeWhile(iterable, predicate),
      skipWhile(iterable, predicate),
    ];
  };

  /* eslint-disable func-names */
  /**
   * @ignore
   */
  const FIELD$M = defineField('take');
  /**
   * @ignore
   */
  var take = (iterable, count) => {
    IterablePositiveNumberCheck(iterable, count, FIELD$M);
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
  const FIELD$N = defineField('split');
  /**
   * @ignore
   */
  var split = (iterable, count) => {
    IterablePositiveNumberCheck(iterable, count, FIELD$N);
    return [take(iterable, count), skip(iterable, count)];
  };

  /**
   * @ignore
   */
  const FIELD$O = defineField('startWith');
  /**
   * @ignore
   */
  var startWith = (iterable, ...iterables) => {
    IterableCheck(iterable, 1, FIELD$O);
    return concat(...iterables, iterable);
  };

  /* eslint-disable no-restricted-syntax */
  /**
   * @ignore
   */
  const FIELD$P = defineField('step');
  /**
   * @ignore
   */
  var step = (iterable, count) => {
    IterablePositiveNumberCheck(iterable, count, FIELD$P);
    return new Iterable(function* () {
      let c = 0;
      for (const i of iterable) {
        if (c % count === 0) {
          yield i;
        }
        c += 1;
      }
    });
  };

  /* eslint-disable func-names */
  /**
   * @ignore
   */
  const FIELD$Q = defineField('sum');
  /**
   * @ignore
   */
  var sum = (iterable) => {
    IterableCheck(iterable, FIELD$Q);
    return new Iterable(function* () {
      let acc = 0;

      for (const i of iterable) {
        acc += i;
      }

      yield acc;
    });
  };

  /* eslint-disable func-names */
  /**
   * @ignore
   */
  const FIELD$R = defineField('takeLast');
  /**
   * @ignore
   */
  var takeLast = (iterable, count) => {
    IterablePositiveNumberCheck(iterable, count, FIELD$R);
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
  const FIELD$S = defineField('zip');
  /**
   * @ignore
   */
  const defaultZipper = x => x;
  /**
   * @ignore
   */
  const zip = (iterables, fn) => {
    if (!(iterables instanceof Array)) {
      throw new BadArgumentError(1, FIELD$S, 'Array');
    }

    let zipper = fn;

    if (!isUndefined(fn)) {
      if (!isFunction(fn)) {
        FunctionCheck(fn, 2, FIELD$S);
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
        /**
         * @ignore
         */
        this.it = it;
      } else if (isIterable(it)) {
        /**
         * @ignore
         */
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
          if (isNumber(index)) {
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
      let s = 0;
      for (const i of it) {
        if (s === index) {
          return i;
        }
        s += 1;
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
     * @param {!function(item: any):boolean} predicate
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
     * @param {!function(item: any):boolean} predicate
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
     * @param {!function(item: any):boolean} predicate
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
     * @param {!function(item: any):boolean} predicate
     * @throws {BadArgumentError}
     * throws error if the given predicate is not a function
     * @returns {Iterable}
     */
    any(predicate) {
      return any(this.it, predicate);
    }

    /**
     * Returns an Iterable that yields the average value of
     * the source Iterable's yields.
     * @param {!Iterable} it
     * @throws {BadArgumentError}
     * throws error if the given Iterable doesn't implement the Iteration Protocol
     * @returns {Iterable}
     */
    static average(it) {
      return average(it);
    }

    /**
     * Returns an Iterable that yields the average value of
     * this Iterable's yields.
     * @returns {Iterable}
     */
    average() {
      return average(this.it);
    }

    /**
     * Returns an Iterable that yields Iterable buffers of items
     * it collects from the source Iterable.
     * @param {!Iterable} it
     * @param {!number} amount
     * @returns {Iterable}
     */
    static buffer(it, amount) {
      return buffer(it, amount);
    }

    /**
     * Returns an Iterable that yields Iterable buffers of items
     * it collects from this Iterable.
     * @param {!number} amount
     * @returns {Iterable}
     */
    buffer(amount) {
      return buffer(this.it, amount);
    }

    /**
     * Split an Iterable into a longest prefix such that all
     * the elements of it do not satisfy a given predicate,
     * and the rest of the Iterable following them.
     * @param {!Iterable} it
     * @param {!function(item: any):boolean} predicate
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
     * @param {!function(item: any):boolean} predicate
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
     * @throws {BadArgumentError}
     * throws error if the given Iterable doesn't implement the Iteration Protocol
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
     * Returns an Iterable that yields the items yielded by
     * the source Iterable or a specified default item if
     * the source Iterable is empty.
     * @param {!Iterable} it
     * @param {any} value
     * @throws {BadArgumentError}
     * throws error if the given Iterable doesn't implement the Iteration Protocol
     * @returns {Iterable}
     */
    static defaultIfEmpty(it, value) {
      return defaultIfEmpty(it, value);
    }

    /**
     * Returns an Iterable that yields the items yielded by
     * the source Iterable or a specified default item if
     * the source Iterable is empty.
     * @param {any} value
     * @throws {BadArgumentError}
     * throws error if the given Iterable doesn't implement the Iteration Protocol
     * @returns {Iterable}
     */
    defaultIfEmpty(value) {
      return defaultIfEmpty(this.it, value);
    }

    /**
     * Returns an Iterable that yields all items yielded by the
     * source Iterable that are distinct based on the strict equality
     * comparison.
     * @param {!Iterable} it
     * @throws {BadArgumentError}
     * throws error if the given Iterable doesn't implement the Iteration Protocol
     * @returns {Iterable}
     */
    static distinct(it) {
      return distinct(it);
    }

    /**
     * Returns an Iterable that yields all items yielded by this Iterable
     * that are distinct based on the strict equality comparison.
     * @returns {Iterable}
     */
    distinct() {
      return distinct(this.it);
    }

    /**
     * Returns an Iterable that yields all items yielded by the
     * source Iterable that are distinct from their immediate
     * predecessors based on strict equality comparison.
     * @param {!Iterable} it
     * @throws {BadArgumentError}
     * throws error if the given Iterable doesn't implement the Iteration Protocol
     * @returns {Iterable}
     */
    static distinctAdjacent(it) {
      return distinctAdjacent(it);
    }

    /**
     * Returns an Iterable that yields all items yielded by this
     * Iterable that are distinct from their immediate predecessors
     * based on strict equality comparison.
     * @returns {Iterable}
     */
    distinctAdjacent() {
      return distinctAdjacent(this.it);
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
     * Returns an Iterable that doesn't yield any value.
     * @returns {Iterable}
     */
    empty() {
      return empty(this);
    }

    /**
     * Returns an Iterable that yields true if the source Iterable
     * has the same exact sequence as the other Iterable.
     * @param {!Iterable} it
     * @param {!Iterable} other
     * @throws {BadArgumentError}
     * throws error if the given Iterable doesn't implement the Iteration Protocol
     * @throws {BadArgumentError}
     * throws error if the other given Iterable doesn't implement the Iteration Protocol
     * @returns {Iterable}
     */
    static equal(it, other) {
      return equal(it, other);
    }

    /**
     * Returns an Iterable that yields true if the source Iterable
     * has the same exact sequence as the other Iterable.
     * @param {!Iterable} other
     * @throws {BadArgumentError}
     * throws error if the other given Iterable doesn't implement the Iteration Protocol
     * @returns {Iterable}
     */
    equal(other) {
      return equal(this.it, other);
    }

    /**
     * Filters the yields of a source Iterable with a filter function.
     *
     * @param {!Iterable} it
     * @param {!function(item: any):boolean} fn
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
     * @param {!function(item: any):boolean} fn
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
     * @param {!function(item: any):boolean} predicate
     * @throws {BadArgumentError}
     * throws error if the given Iterable doesn't implement the Iteration Protocol
     * @returns {Iterable}
     */
    static find(it, predicate) {
      return find(it, predicate);
    }

    /**
     * Finds the index of the first element that satisfy a predicate.
     * @param {!function(item: any):boolean} predicate
     * @returns {Iterable}
     */
    find(predicate) {
      return find(this.it, predicate);
    }

    /**
     * Returns an Iterable that yields the first value of the source
     * Iterable that satisfy a predicate(optional).
     * @param {!Iterable} it
     * @param {function(item: any):boolean} predicate
     * @throws {BadArgumentError}
     * throws error if the given Iterable doesn't implement the Iteration Protocol
     * @throws {BadArgumentError}
     * throws error if the given predicate is not a function or undefined
     * @returns {Iterable}
     */
    static first(it, predicate) {
      return first(it, predicate);
    }

    /**
     * Returns an Iterable that yields the first value of the source
     * Iterable that satisfy a predicate(optional).
     * @param {function(item: any):boolean} predicate
     * @throws {BadArgumentError}
     * throws error if the given predicate is not a function or undefined
     * @returns {Iterable}
     */
    first(predicate) {
      return first(this.it, predicate);
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
     * @param {!function(item: any):Iterable} mapper
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
     * @param {!function(item: any):Iterable} mapper
     * @throws {BadArgumentError}
     * throws error if the given mapper is not a function
     * @returns {Iterable}
     */
    flatMap(mapper) {
      return flatMap(this.it, mapper);
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
     * Inserts the yields of the other Iterable in between
     * the source Iterable adjacent yields.
     * @param {!Iterable} it
     * @param {!Iterable} other
     * @throws {BadArgumentError}
     * throws error if the given Iterable doesn't implement the Iteration Protocol
     * @throws {BadArgumentError}
     * throws error if the other given Iterable doesn't implement the Iteration Protocol
     * @returns {Iterable}
     */
    static intercalate(it, other) {
      return intercalate(it, other);
    }

    /**
     * Inserts the yields of the other Iterable in between
     * this Iterable adjacent yields.
     * @param {!Iterable} other
     * @throws {BadArgumentError}
     * throws error if the other given Iterable doesn't implement the Iteration Protocol
     * @returns {Iterable}
     */
    intercalate(other) {
      return intercalate(this.it, other);
    }

    /**
     * Returns an Iterable that yields the items that the source Iterable
     * and the other Iterable has in common.
     * @param {!Iterable} it
     * @param {!Iterable} other
     * @throws {BadArgumentError}
     * throws error if the given Iterable doesn't implement the Iteration Protocol
     * @throws {BadArgumentError}
     * throws error if the other given Iterable doesn't implement the Iteration Protocol
     * @returns {Iterable}
     */
    static intersect(it, other) {
      return intersect(it, other);
    }

    /**
     * Returns an Iterable that yields the items that the source Iterable
     * and the other Iterable has in common.
     * @param {!Iterable} other
     * @throws {BadArgumentError}
     * throws error if the other given Iterable doesn't implement the Iteration Protocol
     * @returns {Iterable}
     */
    intersect(other) {
      return intersect(this.it, other);
    }

    /**
     * Inserts the given value in between
     * the source Iterable adjacent yields.
     * @param {!Iterable} it
     * @param {any} value
     * @throws {BadArgumentError}
     * throws error if the given Iterable doesn't implement the Iteration Protocol
     * @throws {BadArgumentError}
     * throws error if the other given Iterable doesn't implement the Iteration Protocol
     * @returns {Iterable}
     */
    static intersperse(it, value) {
      return intersperse(it, value);
    }

    /**
     * Inserts the yields of the other Iterable in between
     * this Iterable adjacent yields.
     * @param {any} value
     * @throws {BadArgumentError}
     * throws error if the other given Iterable doesn't implement the Iteration Protocol
     * @returns {Iterable}
     */
    intersperse(value) {
      return intersperse(this.it, value);
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
     * Iterable that satisfy a predicate(optional).
     * @param {!Iterable} it
     * @param {function(item: any):boolean} predicate
     * @throws {BadArgumentError}
     * throws error if the given Iterable doesn't implement the Iteration Protocol
     * @throws {BadArgumentError}
     * throws error if the given predicate is not a function or undefined
     * @returns {Iterable}
     */
    static last(it, predicate) {
      return last(it, predicate);
    }

    /**
     * Returns an Iterable that yields the last value of the source
     * Iterable that satisfy a predicate(optional).
     * @param {function(item: any):boolean} predicate
     * @throws {BadArgumentError}
     * throws error if the given predicate is not a function or undefined
     * @returns {Iterable}
     */
    last(predicate) {
      return last(this.it, predicate);
    }

    /**
     * Applies a mapping function to each yielded value of the source
     * Iterable.
     * @param {!Iterable} it
     * @param {!function(item: any):any} fn
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
     * @param {!function(item: any):any} fn
     * @throws {BadArgumentError}
     * throws error if the given predicate is not a function
     * @returns {Iterable}
     */
    map(fn) {
      return map(this.it, fn);
    }

    /**
     * Returns an Iterable that yields the maximum value of
     * the source Iterable's yields.
     * @param {!Iterable} it
     * @throws {BadArgumentError}
     * throws error if the given Iterable doesn't implement the Iteration Protocol
     * @returns {Iterable}
     */
    static max(it) {
      return max$1(it);
    }

    /**
     * Returns an Iterable that yields the maximum value of
     * this Iterable's yields.
     * @returns {Iterable}
     */
    max() {
      return max$1(this.it);
    }

    /**
     * Returns an Iterable that yields the minimum value of
     * the source Iterable's yields.
     * @param {!Iterable} it
     * @throws {BadArgumentError}
     * throws error if the given Iterable doesn't implement the Iteration Protocol
     * @returns {Iterable}
     */
    static min(it) {
      return min$1(it);
    }

    /**
     * Returns an Iterable that yields the minimum value of
     * this Iterable's yields.
     * @returns {Iterable}
     */
    min() {
      return min$1(this.it);
    }

    /**
     * Attaches a callback to a source Iterable that is
     * executed when the Iterable finishes the iteration
     * process.
     * @param {!Iterable} it
     * @param {!function} fn
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
     * @param {!function} fn
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
     * @param {!function} fn
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
     * @param {!function} fn
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
     * @param {!function(item: any)} fn
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
     * @param {!function(item: any)} fn
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
     * @param {!function(item: any):boolean} predicate
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
     * @param {!function(item: any):boolean} predicate
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
     * Returns an Iterable that applies a specified accumulator function
     * to the first item yielded by a source Iterable, then feeds the
     * result of that function along with the second item yielded by
     * the source Iterable into the same function, and so on until all
     * items have been yielded by the finite source Iterable, and yields
     * the final result from the final call to your function as its sole item.
     * @param {!Iterable} it
     * @param {!function(acc: any, item: any):any} reducer
     * @throws {BadArgumentError}
     * throws error if the given Iterable doesn't implement the Iteration Protocol
     * @throws {BadArgumentError}
     * throws error if the given reducer is not a function
     * @returns {Iterable}
     */
    static reduce(it, reducer) {
      return reduce(it, reducer);
    }

    /**
     * Returns an Iterable that applies a specified accumulator function
     * to the first item yielded by a source Iterable, then feeds the
     * result of that function along with the second item yielded by
     * the source Iterable into the same function, and so on until all
     * items have been yielded by the finite source Iterable, and yields
     * the final result from the final call to your function as its sole item.
     * @param {!function(acc: any, item: any):any} reducer
     * @throws {BadArgumentError}
     * throws error if the given reducer is not a function
     * @returns {Iterable}
     */
    reduce(reducer) {
      return reduce(this.it, reducer);
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
     * Returns an Iterable that applies a specified accumulator function
     * to the first item yielded by a source Iterable, then feeds the result
     * of that function along with the second item yielded by the source
     * Iterable into the same function, and so on until all items have been
     * yielded by the source Iterable, yielding the result of each of these iterations.
     * @param {!Iterable} it
     * @param {!function(acc: any, item: any):any} reducer
     * @throws {BadArgumentError}
     * throws error if the given Iterable doesn't implement the Iteration Protocol
     * @throws {BadArgumentError}
     * throws error if the given reducer is not a function
     * @returns {Iterable}
     */
    static scan(it, reducer) {
      return scan(it, reducer);
    }

    /**
     * Returns an Iterable that applies a specified accumulator function
     * to the first item yielded by a source Iterable, then feeds the result
     * of that function along with the second item yielded by the source
     * Iterable into the same function, and so on until all items have been
     * yielded by the source Iterable, yielding the result of each of these iterations.
     * @param {!function(acc: any, item: any):any} reducer
     * @throws {BadArgumentError}
     * throws error if the given reducer is not a function
     * @returns {Iterable}
     */
    scan(reducer) {
      return scan(this.it, reducer);
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
     * @param {!function(item: any):boolean} predicate
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
     * @param {!function(item: any):boolean} predicate
     * @throws {BadArgumentError}
     * throws error if the given predicate is not a function
     * @returns {Iterable}
     */
    skipWhile(predicate) {
      return skipWhile(this.it, predicate);
    }

    /**
     * Returns a new sorted Iterable base from the source Iterable.
     * which returns a signum can be provided.
     * @param {!Iterable} it
     * @param {!function(a: any, b: any):number} comparator
     * @throws {BadArgumentError}
     * throws error if the given iterables is not an array
     * @throws {BadArgumentError}
     * throws error if the given predicate is not a function or undefined
     * @returns {Iterable}
     */
    static sort(it, comparator) {
      return sort(it, comparator);
    }

    /**
     * Returns a new sorted Iterable base from this Iterable.
     * A comparator function which returns a signum can be provided.
     * @param {!function(a: any, b: any):number} comparator
     * @throws {BadArgumentError}
     * throws error if the given predicate is not a function or undefined
     * @returns {Iterable}
     */
    sort(comparator) {
      return sort(this.it, comparator);
    }

    /**
     * Returns an Iterable that yields true if the source Iterable
     * (with an optional comparator) is sorted.
     * @param {!Iterable} it
     * @param {!function(a: any, b: any):number} comparator
     * @throws {BadArgumentError}
     * throws error if the given iterables is not an array
     * @throws {BadArgumentError}
     * throws error if the given predicate is not a function or undefined
     * @returns {Iterable}
     */
    static sorted(it, comparator) {
      return sorted(it, comparator);
    }

    /**
     * Returns an Iterable that yields true if the source Iterable
     * (with an optional comparator) is sorted.
     * @param {!function(a: any, b: any):number} comparator
     * @throws {BadArgumentError}
     * throws error if the given predicate is not a function or undefined
     * @returns {Iterable}
     */
    sorted(comparator) {
      return sorted(this.it, comparator);
    }

    /**
     * Split an Iterable into a longest prefix such that all
     * the elements of it do satisfy a given predicate,
     * and the rest of the Iterable following them.
     * @param {!Iterable} it
     * @param {!function(item: any):boolean} predicate
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
     * @param {!function(item: any):boolean} predicate
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
     * Returns an Iterable that yields only the elements whose indices
     * are divisible by the given amount
     * @param {!Iterable} it
     * @param {!number} amount
     * @throws {BadArgumentError}
     * throws error if the given Iterable doesn't implement the Iteration Protocol
     * @throws {BadArgumentError}
     * throws error if the given amount is not a number.
     * @returns {Iterable}
     */
    static step(it, amount) {
      return step(it, amount);
    }

    /**
     * Returns an Iterable that yields only the first count items yielded by
     * this Iterable.
     * @param {!number} amount
     * @throws {BadArgumentError}
     * throws error if the given amount is not a number.
     * @returns {Iterable}
     */
    step(amount) {
      return step(this.it, amount);
    }

    /**
     * Returns an Iterable that yields the summation of
     * the source Iterable's yields.
     * @param {!Iterable} it
     * @throws {BadArgumentError}
     * throws error if the given Iterable doesn't implement the Iteration Protocol
     * @returns {Iterable}
     */
    static sum(it) {
      return sum(it);
    }

    /**
     * Returns an Iterable that yields the summation of
     * this Iterable's yields.
     * @returns {Iterable}
     */
    sum() {
      return sum(this.it);
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
     * @param {!function(item: any):boolean} predicate
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
     * @param {!function(item: any):boolean} predicate
     * @throws {BadArgumentError}
     * throws error if the given predicate is not a function
     * @returns {Iterable}
     */
    takeWhile(predicate) {
      return takeWhile(this.it, predicate);
    }

    /**
     * Converts the source Iterable into an array of its yield
     * sequence.
     * @param {!Iterable} it
     * @throws {BadArgumentError}
     * throws error if the given Iterable doesn't implement the Iteration Protocol
     * @returns {Array}
     */
    static toArray(it) {
      return toArray(it);
    }

    /**
     * Converts this Iterable into an array of its yield
     * sequence.
     * @returns {Array}
     */
    toArray() {
      return toArray(this.it);
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
     * @ignore
     */
    [ITERATOR]() {
      return this.it[ITERATOR]();
    }
  }

  return Iterable;

}(Iterable$1));
