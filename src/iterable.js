/* eslint-disable no-restricted-syntax */
import { isIterable, ITERATOR } from './internal/utils';
import {
  map, filter, concat, just, first, last, repeat,
  startWith, zip, flat, all, any, isEmpty, 
} from './internal/dependency';


export default class Iterable {
  constructor(iterable) {
    const it = iterable;
    if (it.constructor.name === 'GeneratorFunction') {
      it[ITERATOR] = it;
    }
    this.it = it;
  }

  get(index) {
    const { it } = this;
    let step = index;
    for (const i of it) {
      step -= 1;
      if (step === 0) {
        return i;
      }
    }
    return undefined;
  }

  set(index, value) {
    const { it } = this;
    // eslint-disable-next-line func-names
    const gen = function* () {
      let step = index;
      for (const i of it) {
        step -= 1;
        if (step === 0) {
          yield value;
        } else {
          yield i;
        }
      }
    };

    gen[ITERATOR] = gen;

    return new Iterable(gen);
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
   * @param {Iterable} it
   * @param {Function(x: any):boolean} predicate
   * @returns {Iterable}
   */
  static all(it, predicate) {
    return all(it, predicate);
  }

  /**
   * Returns an Iterable that yields true if all of the yields of
   * this Iterable passes the predicate function, false if not.
   * @param {Function(x: any):boolean} predicate
   * @returns {Iterable}
   */
  all(predicate) {
    return all(this.it, predicate);
  }

  /**
   * Returns an Iterable that yields true if any of the yields of the
   * source Iterable passes the predicate function, false if not.
   * @param {Iterable} it
   * @param {Function(x: any):boolean} predicate
   * @returns {Iterable}
   */
  static any(it, predicate) {
    return any(it, predicate);
  }

  /**
   * Returns an Iterable that yields true if any of the yields of
   * this Iterable passes the predicate function, false if not.
   * @param {Function(x: any):boolean} predicate
   * @returns {Iterable}
   */
  any(predicate) {
    return any(this.it, predicate);
  }

  /**
   * Concatenates the given set of Iterables into a single Iterable.
   * @param  {...Iterable} its
   * @returns {Iterable}
   */
  static concat(...its) {
    return concat(...its);
  }

  /**
   * Concatenates the given Iterables to this Iterable.
   * @param  {...Iterable} its
   * @returns {Iterable}
   */
  concat(...its) {
    return concat(this.it, ...its);
  }

  /**
   * Filters the yields of a given Iterable with a filter function.
   *
   * @param {Iterable} it
   * @param {Function(x: any):boolean} fn
   * @returns {Iterable}
   */
  static filter(it, fn) {
    return filter(it, fn);
  }

  /**
   * Filters the yields of this Iterable with a filter function.
   * @param {Function(x: any):boolean} fn
   * @returns {Iterable}
   */
  filter(fn) {
    return filter(this.it, fn);
  }

  /**
   * Creates an Iterable that yields the first value of the given
   * Iterable.
   * @param {Iterable} it
   * @returns {Iterable}
   */
  static first(it) {
    return first(it);
  }

  /**
   * Creates an Iterable that yields the first value of this
   * Iterable.
   * @returns {Iterable}
   */
  first() {
    return first(this.it);
  }

  /**
   * Flattens the given Iterable by removing a single layer of
   * nesting for the yielded Iterables.
   * @param {Iterable} it
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
   * Creates an Iterable that yields the true if this
   * Iterable is empty.
   * @param {Iterable} it
   * @returns {Iterable}
   */
  static isEmpty(it) {
    return isEmpty(it);
  }

  /**
   * Creates an Iterable that yields the true if this
   * Iterable is empty.
   * @returns {Iterable}
   */
  isEmpty() {
    return isEmpty(this.it);
  }

  /**
   * Creates an Iterable that yields a single value.
   * @returns {Iterable}
   */
  static just(value) {
    return just(value);
  }

  /**
   * Creates an Iterable that yields the last value of the given
   * Iterable.
   * @returns {Iterable}
   */
  static last(it) {
    return last(it);
  }

  /**
   * Creates an Iterable that yields the last value of this
   * Iterable.
   * @returns {Iterable}
   */
  last() {
    return last(this.it);
  }


  /**
   * Applies a mapping function to each yielded value of the given
   * Iterable.
   * @param {Iterable} it
   * @param {Function(x: any):any} fn
   * @returns {Iterable}
   */
  static map(it, fn) {
    return map(it, fn);
  }

  /**
   * Applies a mapping function to each yielded value of this
   * Iterable.
   * @param {Iterable} it
   * @param {Function(x: any):any} fn
   * @returns {Iterable}
   */
  map(fn) {
    return map(this.it, fn);
  }

  /**
   * Repeats the yielded values of a given Iterable by a certain
   * amount.
   * @param {Iterable} it
   * @param {number} count
   * @returns {Iterable}
   */
  static repeat(it, count) {
    return repeat(it, count);
  }

  /**
   * Repeats the yielded values of this Iterable by a certain
   * amount.
   * @param {number} count
   * @returns {Iterable}
   */
  repeat(count) {
    return repeat(this.it, count);
  }

  /**
   * Same to concat, except that it prefixes the given Iterable
   * to a set of Iterables into a single Iterable.
   * @param {Iterable} it
   * @param  {...Iterable} its
   * @returns {Iterable}
   */
  static startWith(it, ...its) {
    return startWith(it, ...its);
  }

  /**
   * Same to concat, except that it prefixes this Iterable
   * to a set of Iterables into a single Iterable.
   * @param {Iterable} it
   * @param  {...Iterable} its
   * @returns {Iterable}
   */
  startWith(...its) {
    return startWith(this.it, ...its);
  }

  /**
   * combine the yields of multiple Iterables together via a specified function and
   * yields single items for each combination based on the results of this function.
   * @param {Iterable} its
   * @param {Function(yields: Array):any} fn
   * @returns {Iterable}
   */
  static zip(its, fn) {
    return zip(its, fn);
  }

  /**
   * combine the yields of this Iterable with multiple Iterables together via a specified
   * function and yields single items for each combination based on the results of this
   * function.
   * @param {Iterable} its
   * @param {Function(yields: Array):any} fn
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
