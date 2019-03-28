# iterable-js

An extensions for objects with Iteration Protocol for JS

| Platform | Build Status |
| --- | --- |
| Linux | [![Build Status](https://travis-ci.org/LXSMNSYC/iterable-js.svg?branch=master)](https://travis-ci.org/LXSMNSYC/iterable-js) |
| Windows | [![Build status](https://ci.appveyor.com/api/projects/status/272hv6jnglgamb0g?svg=true)](https://ci.appveyor.com/project/LXSMNSYC/iterable-js) |

[![codecov](https://codecov.io/gh/LXSMNSYC/iterable-js/branch/master/graph/badge.svg)](https://codecov.io/gh/LXSMNSYC/iterable-js)


### Introduction

### Iterations Protocol

ES2015 introduces a new feature, namely the [Iterations Protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols). The protocol consists of 2 protocols:

* The iterable protocol allows JavaScript objects to define or customize their iteration behavior, such as what values are looped over in a for..of construct. Some built-in types are built-in iterables with a default iteration behavior, such as Array or Map, while other types (such as Object) are not.
  
  In order to be iterable, an object must implement the @@iterator method, meaning that the object (or one of the objects up its prototype chain) must have a property with a @@iterator key which is available via constant Symbol.iterator:

  * ```[Symbol.iterator]``` 
    * A zero arguments function that returns an object, conforming to the iterator protocol.

  Whenever an object needs to be iterated (such as at the beginning of a for..of loop), its @@iterator method is called with no arguments, and the returned iterator is used to obtain the values to be iterated.

* The iterator protocol defines a standard way to produce a sequence of values (either finite or infinite), and potentially a return value when all values have been generated.
  
  An object is an iterator when it implements a next() method with the following semantics:

  * next
    * A zero arguments function that returns an object with at least the following two properties: 
      * ```done``` (boolean)
        * Has the value ```true``` if the iterator is past the end of the iterated sequence. In this case ```value``` optionally specifies the return value of the iterator.
        * Has the value ```false``` if the iterator was able to produce the next value in the sequence. This is equivalent of not specifying the done property altogether.
      * ```value``` 
        * any JavaScript value returned by the iterator.
        * Can be omitted when ```done``` is ```true```.
    * The next method always has to return an object with appropriate properties including ```done``` and ```value```.
    * If a non-object value gets returned (such as ```false``` or ```undefined```), a TypeError ("iterator.next() returned a non-object value") will be thrown.

### Iterable and Iteration Protocol

Iterable intends to unify all iterable objects, be it a built-in iterable (e.g. Array, String, Map) or a user-made iterable (e.g. user-defined generators, objects with Symbol.iterator property), acting as the de-facto superset.

By taking advantage of the Iteration Protocol, Iterable can provide operators that allows to transform any iterable objects.

Iterable operators are not strict to Iterable instance, they expect the first parameters to be an iterable object, regardless of the implementation. For example,

```js
Iterable.concat('Hello', [1, 2, 3, 4, 5]);
```

creates an iterable that yields the characters of 'Hello' and the values of ```[1, 2, 3, 4, 5]``` sequentially.

### Iterable vs IxJS

First, I would like to point out that at the time I have written almost half of the library, I stumbled upon the library [IxJS](https://github.com/ReactiveX/IxJS) while looking for Rx libraries, and to my surprise, it has the same goal as my library's.

So, what are the differences?

Iterable doesn't/isn't:

* support async.
* expose the operators as an individual module.
* written in TypeScript.
* have operators that returns a single value from an aggregation (e.g reduce), instead, they are considered as a singular Iterable (an Iterable with one element).
* handle errors.

Iterable does/is:

* support chaining operators for an Iterable as well as provide these operators as a static member, allowing class deconstruction.
* allow bracket notation for accessing the nth-yield of the Iterable.
* throw runtime errors. If an error occurs, the errors are thrown synchronously on iteration.
* know if an object is iterable by concept or not, allowing non-Iterable instances to have access with the Iterable operators.

Method Counterparts

| Iterable | IxJS | Notes |
| --- | --- | --- |
| ```all``` | ```every``` | Returns a singular Iterable that yields the boolean result. |
| ```any``` | ```some``` | Returns a singular Iterable that yields the boolean result.  |
| ```average``` | ```average``` | Returns a singular Iterable that yields the number result. |
| ```breadthFirst``` | | |
| ```breakWith``` | | |
| ```buffer``` | ```buffer``` | Doesn't have the skip mechanism. |
| ```cache``` | | |
| ```compose``` | ```pipe``` | Iterable ```compose``` doesn't bind to the given transformer. |
| ```concat``` | ```concat```, ```of```, ```endWith``` | Unlike the IxJS ```concat```, Iterable ```concat``` allows to concat non-Iterable values. |
| ```contains``` | ```includes``` | Doesn't have the skip mechanism. Returns a singular Iterable that yields the boolean result. |
| ```count``` | ```count``` | Returns a singular Iterable that yields the number result. |
| ```defaultIfEmpty``` | ```defaultIfEmpty``` | |
| ```depthFirst``` | | |
| ```diff``` | | |
| ```distinct``` | ```distinct``` | Doesn't have the compare mechanism. Strict equality is used. |
| ```distinctAdjacent``` | ```distinctUntilChanged``` | Doesn't have the compare mechanism. Strict equality is used. |
| ```doWhile``` | ```doWhile``` | |
| ```elementAt``` | ```elementAt``` | Returns a singular Iterable that yields the result. |
| ```empty``` | ```empty``` | |
| ```equal``` | ```sequenceEqual``` | Returns a singular Iterable that yields the boolean result. |
| ```filter``` | ```filter``` | |
| ```find``` | ```find``` | Instead of yielding the passing value, ```find`` yields the index. Returns a singular Iterable that yields the number result. |
| ```first``` | ```first``` | Returns a singular Iterable that yields the result. |
| ```flat``` | ```flatten``` | Iterable ```flat``` only flattens a single layer. To flatten all layers, use ```depthFirst``` |
| ```flatMap``` | ```flatMap``` | |
| ```ignoreElements``` | ```ignoreElements``` | |
| ```indexOf``` | | |
| ```innerJoin``` | ```innerJoin``` | |
| ```intercalate``` | | |
| ```intersect``` | ```intersect``` | |
| ```intersperse``` | | |
| ```isEmpty``` | ```isEmpty``` | Returns a singular Iterable that yields the boolean result. |
| ```just``` | | |
| ```last``` | ```last``` | |
| ```leftJoin``` | | |
| ```map``` | ```map``` | |
| ```max``` | ```max``` | Returns a singular Iterable that yields the result. |
| ```min``` | ```min``` | Returns a singular Iterable that yields the result. |
| ```onDone``` | | |
| ```onStart``` | | |
| ```onYield``` | | |
| ```outerJoin``` | | |
| ```partition``` | ```partition``` | |
| ```range``` | ```range``` | Unlike IxJS, Iterable ```range``` allows negative slope, and custom step size. |
| ```reduce``` | ```reduce``` | Returns a singular Iterable that yields the result. |
| ```reduceRight``` | ```reduceRight``` | Returns a singular Iterable that yields the result. |
| ```repeat``` | ```repeat``` | |
| ```replace``` | | |
| ```reverse```  |```reverse``` | |
| ```scan``` | ```scan``` | |
| ```scanRight``` | ```scanRight``` | |
| ```skip``` | ```skip``` | |
| ```skipLast``` | ```skipLast``` | |
| ```skipUntil``` | | |
| ```skipWhile``` | ```skipWhile``` | |
| ```sort``` | ```orderBy``` | |
| ```sorted``` | | Returns a singular Iterable that yields the boolean result. |
| ```spanWith``` | | |
| ```split``` | | |
| ```startWith``` | ```startWith``` | |
| ```step``` | | |
| ```sum``` | ```sum``` | Returns a singular Iterable that yields the result. |
| ```take``` | ```take``` | |
| ```takeLast``` | ```takeLast``` | |
| ```takeUntil``` | | |
| ```takeWhile``` | ```takeWhile``` | |
| ```toArray``` | ```toArray``` | |
| ```whileDo``` | ```while``` | |
| ```zip``` | ```zip``` | |
| | ```case``` | |
| | ```catch``` | Iterable throws the error synchronously. |
| | ```catchWith``` | Iterable throws the error synchronously. |
| | ```chain``` | |
| | ```concatAll``` | |
| | ```defer``` | Meh |
| | ```expand``` | |
| | ```find``` | |
| | ```for``` | |
| | ```generate``` | Iterable supports Generators. |
| | ```groupBy``` | |
| | ```groupJoin``` | |
| | ```if``` | |
| | ```memoize``` | |
| | ```ofEntries``` | Use ```Object.entries``` instead. |
| | ```ofKeys``` | Use ```Object.keys``` instead. |
| | ```ofValues``` | Use ```Object.values``` instead. |
| | ```onErrorResumeNext``` | Iterable doesn't support fallbacks. |
| | ```pairwise``` | |
| | ```pluck``` | |
| | ```publish``` | |
| | ```retry``` | Iterable doesn't support fallbacks. |
| | ```share``` | |
| | ```single``` | Isn't encouraged. |
| | ```tap``` | use the ```doXXXX``` operators. |
| | ```union``` | |

## Usage

### Installing

NPM
```
npm install iterable-js
```

CDN

* jsDelivr
  
```html
<script src="https://cdn.jsdelivr.net/npm/rx-single/dist/index.min.js"></script>
```

* unpkg
  
```html
<script src="https://unpkg.com/rx-single/dist/index.min.js"></script>
```


### Loading the module

#### CommonJS

```js
const Iterable = require('iterable-js');
```

Loading the CommonJS module provides the Iterable class.

#### Browser

Loading the JavaScript file for the iterable-js provides the Iterable class.

### Example

Creates a partition of iterables in which the first iterable yields the even numbers, while the second iterable yields the odd numbers.
```js
const evenOdd = Iterable.range(1, 200).partition(x => x % 2 === 0);

for (const i of evenOdd[0].map(x => `Next Even: ${x}`)) {
  console.log(i);
}
for (const i of evenOdd[1].map(x => `Next Odd: ${x}`)) {
  console.log(i);
}
```

### Static and non-Static

All operators of Iterable are both static and non-static (except for a few ones), allowing chainable and direct transformations.

Both examples below does the same thing.

```js
for (const i of Iterable.filter('Hello World', x => x === x.toUpperCase())) {
  console.log(i);
}
```

```js
for (const i of new Iterable('Hello World').filter(x => x === x.toUpperCase())) {
  console.log(i);
}
```

### Generators

Iterable treats generator functions as an iterable object, even if it doesn't implement the iterable protocol.

```js
const iterable = new Iterable(function* () {
  yield 1;
  yield 2;
  yield 3;
});
for (const i of iterable) {
  console.log(i);
}
```

### Creating your own operators

To create your own operator, you must pass functions to the ```compose``` method. The functions provided must receive a single parameter, which refers to the chained Iterable, and must return an Iterable.

```js
const getOdds = source => source.filter(x => x % 2 === 1);

for (const i of Iterable.range(1, 1000).compose(getOdds)) {
  console.log(i);
}
```

```compose``` can accept multiple functions, allowing to build pipelines of operators.

## Build

Clone the repo then run

```bash
npm install
```

To build distributables, coverages and tests:
```bash
npm run build
```
