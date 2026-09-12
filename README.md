# stats-accumulator

[![NPM](https://nodei.co/npm/stats-accumulator.svg)](https://nodei.co/npm/stats-accumulator/)

A simple tool for calculating incremental stats on numeric streams. Forked from [stats-incremental](https://github.com/brycebaril/stats-incremental) for minimal memory and maximum portability.

```bash
npm install stats-accumulator
```

E.g. given a source of numbers of unknown length that you would like to at any given time know any of:

- count
- min
- max
- sum
- variance
- stddev

This module can be used either with Node `streams` via a wrapper such as `through2` or without being streaming.

## Example

Non-streaming:

```javascript
var Stats = require('stats-accumulator');

var s = new Stats();

for (var i = 1; i <= 6; i++) s.update(i);

/* E.g.
  { n: 6,
  min: 1,
  max: 6,
  sum: 21,
  mean: 3.5,
  variance: 2.9166666666666665,
  stddev: 1.707825127659933 }
*/

console.log(s.mean);
console.log(s.stddev());
```

With streams:

```js
var spigot = require('stream-spigot');
var through2 = require('through2');
var terminus = require('terminus');

var Stats = require('stats-accumulator');
var s = new Stats();

var statStream = through2.obj(function (chunk, encoding, callback) {
  s.update(chunk);
  if (s.n % 100000 === 0) {
    console.log(s.toJSON());
  }
  this.push(chunk);
  callback();
});

spigot
  .sync({ objectMode: true }, Math.random)
  .pipe(statStream)
  .pipe(terminus.devnull({ objectMode: true }));

// Prints a stats object each time the stream reaches another 100,000 values.
```

# API

## `const Stats = require("stats-accumulator")`

## `var stats = new Stats()`

Create a new incremental stats aggregator.

## `stats.update(value)`

Update the aggregator with a value. Converted to a Number via parseFloat. If this results in NaN the update is skipped.

## `stats.toJSON()`

Get a up-to-date clone of all of the stats stored.

E.g.

```js
{ n: 97,
  min: 2,
  max: 12,
  sum: 673,
  mean: 6.938144329896907,
  variance: 5.851843979168881,
  stddev: 2.419058490233107 }
```

## `stats.n`

The count of observations.

## `stats.min`

The min value observed.

## `stats.max`

The max value observed.

## `stats.sum`

The sum of all values observed.

## `stats.mean`

The arithmetic mean of the observations.

## `stats.variance()`

The variance from the mean.

## `stats.stddev()`

The standard deviation of the values from the mean.

## Alternatives

[stats-lite](http://npm.im/stats-lite) Operates on complete sets of numbers.

[stream-statistics](http://npm.im/stream-statistics) Is a similar module dedicated to streams.

[stats-incremental](http://npm.im/stats-incremental) Is the original module, but it accumulates a moving average.

# LICENSE

MIT
