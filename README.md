# iterable-js

An extensions for objects with Iteration Protocol for JS

## What is Iterable

Iterable serves as the superset of all objects/values which implements the [Iteration Protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols), with this, Iterable aims to unify these objects.

Iterable provides operators that allows the user to transform and provide a new Iterable instance which is derived from its source, making Iterable an immutable class.

For example, the snippet below iterates from numbers 1 to 100:

```js
for (const i of Iterable.range(1, 100)) {
  console.log('Next: ', i);
}
```

List of JS Classes that are Iterable:

* String
* Array
* TypedArrays
* Set
* Map

## Iterable vs IxJS

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
| ```breakWith``` | | |
| ```buffer``` | ```buffer``` | Doesn't have the skip mechanism. |
| ```cache``` | | |
| ```compose``` | ```pipe``` | Iterable ```compose``` doesn't bind to the given transformer. |
| ```concat``` | ```concat```, ```of```, ```endWith``` | Unlike the IxJS ```concat```, Iterable ```concat``` allows to concat non-Iterable values. |
| ```contains``` | ```includes``` | Doesn't have the skip mechanism. Returns a singular Iterable that yields the boolean result. |
| ```count``` | ```count``` | Returns a singular Iterable that yields the number result. |
| ```distinct``` | ```distinct``` | Doesn't have the compare mechanism. Strict equality is used. |
| ```distinctAdjacent``` | ```distinctUntilChanged``` | Doesn't have the compare mechanism. Strict equality is used. |
| ```elementAt``` | ```elementAt``` | Returns a singular Iterable that yields the result. |
| ```empty``` | ```empty``` | |
| ```equal``` | ```sequenceEqual``` | Returns a singular Iterable that yields the boolean result. |
| ```filter``` | ```filter``` | |
| ```find``` | ```find``` | Instead of yielding the passing value, ```find`` yields the index. Returns a singular Iterable that yields the number result. |
| ```first``` | ```first``` | Returns a singular Iterable that yields the result. |
| ```flat``` | ```flatten``` | Iterable ```flat``` only flattens a single layer. |
| ```flatMap``` | ```flatMap``` | |
| ```indexOf``` | | |
| ```intercalate``` | | |
| ```intersect``` | | |
| ```intersperse``` | | |
| ```isEmpty``` | ```isEmpty``` | Returns a singular Iterable that yields the boolean result. |
| ```just``` | | |
| ```last``` | ```last``` | |
| ```map``` | ```map``` | |
| ```onDone``` | | |
| ```onStart``` | | |
| ```onYield``` | | |
| ```partition``` | ```partition``` | |
| ```range``` | ```range``` | Unlike IxJS, Iterable ```range``` allows negative slope, and custom step size. |
| ```reduce``` | ```reduce``` | Returns a singular Iterable that yields the result. |
| ```repeat``` | ```repeat``` | |
| ```replace``` | | |
| ```reverse``` | | |
| ```scan``` | ```scan``` | Iterable ```scan``` omits the seed mechanism. Returns a singular Iterable that yields the result. |
| ```skip``` | ```skip``` | |
| ```skipLast``` | ```skipLast``` | |
| ```skipUntil``` | | |
| ```skipWhile``` | ```skipWhile``` | |
| ```sort``` | ```orderBy``` | |
| ```sorted``` | | |
| ```spanWith``` | | |
| ```split``` | | |
| ```step``` | | |
| ```take``` | ```take``` | |
| ```takeLast``` | ```takeLast``` | |
| ```takeUntil``` | | |
| ```takeWhile``` | ```takeWhile``` | |
| ```toArray``` | ```toArray``` | |
| ```zip``` | ```zip``` | |
| | ```average``` | to be added. |
| | ```case``` | |
| | ```catch``` | Iterable throws the error synchronously. |
| | ```catchWith``` | Iterable throws the error synchronously. |
| | ```chain``` | |
| | ```concatAll``` | |
| | ```defaultIfEmpty``` | to be added. |
| | ```defer``` | Meh |
| | ```doWhile``` | to be added. |
| | ```expand``` | |
| | ```find``` | |
| | ```for``` | |
| | ```generate``` | Iterable supports Generators. |
| | ```groupBy``` | |
| | ```groupJoin``` | |
| | ```if``` | |
| | ```ignoreElements``` | to be added. |
| | ```innerJoin``` | |
| | ```intersect``` | |
| | ```max``` | to be added. |
| | ```memoize``` | |
| | ```min``` | to be added. |
| | ```ofEntries``` | Use ```Object.entries``` instead. |
| | ```ofKeys``` | Use ```Object.keys``` instead. |
| | ```ofValues``` | Use ```Object.values``` instead. |
| | ```onErrorResumeNext``` | Iterable doesn't support fallbacks. |
| | ```pairwise``` | |
| | ```pluck``` | |
| | ```publish``` | |
| | ```reduceRight``` | use ```reverse``` and ```reduce``` |
| | ```retry``` | Iterable doesn't support fallbacks. |
| | ```scanRight``` | use ```reverse``` and ```scan``` |
| | ```share``` | |
| | ```single``` | Isn't encouraged. |
| | ```slice``` | to be added. |
| | ```sum``` | to be added. |
| | ```tap``` | use the ```do``` operators. |
| | ```union``` | to be added. |
| | ```while``` | to be added. |

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

```js
const evenOdd = Iterable.range(1, 200).partition(x => x % 2 === 0);

for (const i of evenOdd[0].map(x => `Next Even: ${x}`)) {
  console.log(i);
}
for (const i of evenOdd[1].map(x => `Next Odd: ${x}`)) {
  console.log(i);
}
```
