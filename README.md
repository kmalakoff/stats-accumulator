# stats-accumulator

[![NPM](https://nodei.co/npm/stats-accumulator.svg)](https://nodei.co/npm/stats-accumulator/)

A simple tool for calculating incremental stats on numeric streams. Forked from [stats-incremental](https://github.com/brycebaril/stats-incremental) for minimal memory and maximum portability.

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

var dice = require('dice');
var s = Stats();

var rolls = [];
for (var i = 0; i < 100; i++) {
  s.update(dice.sum(dice.roll('2d6')));
  console.log(s.toJSON());
}

/* E.g.
  { n: 97,
  min: 2,
  max: 12,
  sum: 673,
  mean: 6.938144329896907,
  variance: 5.851843979168881,
  stddev: 2.419058490233107 }
*/

console.log(s.mean);
console.log(s.stddev);
```

With streams:

```js
var spigot = require('stream-spigot');
var through2 = require('through2');
var terminus = require('terminus');

var Stats = require('stats-accumulator');
var s = Stats();

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

/*
  { n: 100000,
    min: 2.0884908735752106e-7,
    max: 0.9999937505926937,
    sum: 49861.06196602131,
    mean: 0.49861061966021336,
    variance: 0.08331362954827709,
    stddev: 0.28864100462040576 }
  { n: 200000,
    min: 2.0884908735752106e-7,
    max: 0.9999937505926937,
    sum: 99904.73041411326,
    mean: 0.49952365207056687,
    variance: 0.08316120223669865,
    stddev: 0.2883768406732736 }
*/
```

# API

## `const Stats = require("stats-accumulator")`

## `var stats = new Stats(smaBins)`

Create a new incremental stats aggregator. The `smaBins` argument is optional (default 50) and will choose the size of recent window to retain to calculate the Simple Moving Average on the recent data.

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

## `stats.variance`

The variance from the mean.

## `stats.stddev`

The standard deviation of the values from the mean.

## Alternatives

[stats-lite](http://npm.im/stats-lite) Operates on complete sets of numbers.

[stream-statistics](http://npm.im/stream-statistics) Is a similar module dedicated to streams.

[stats-incremental](http://npm.im/stats-incremental) Is the original module, but it accumulates a moving average.

# LICENSE

MIT
