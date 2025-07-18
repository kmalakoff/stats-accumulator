const test = require('tape');

const Stats = require('stats-accumulator');
const sl = require('stats-lite');

const input = [1, 23.9, -30, '33.2', 150, -150, 'cat'];

// biome-ignore lint/complexity/useArrowFunction: Legacy
test('simple', function (t) {
  t.goodEnuf = function (obs, expect, msg) {
    this.equals(obs.toPrecision(7), expect.toPrecision(7), msg);
  };

  const s = new Stats();
  t.deepEqual(s.toJSON(), null, 'nothing yet');
  t.equals(s.n, 0);

  s.update(1);
  t.equals(s.n, 1, 'count correct');
  t.equals(s.min, 1, 'min');
  t.equals(s.max, 1, 'max');
  t.equals(s.mean, 1, 'mean');
  t.equals(s.sum, 1, 'sum');
  t.equals(s.variance(), 0, 'variance');
  t.equals(s.stddev(), 0, 'stddev');

  s.update(23.9);
  t.equals(s.n, 2, 'count correct');
  t.equals(s.min, 1, 'min');
  t.equals(s.max, 23.9, 'max');
  t.equals(s.mean, sl.mean(input.slice(0, s.n)), 'mean');
  t.equals(s.sum, sl.sum(input.slice(0, s.n)), 'sum');
  t.equals(s.variance(), sl.variance(input.slice(0, s.n)), 'variance');
  t.equals(s.stddev(), sl.stdev(input.slice(0, s.n)), 'stddev');

  s.update(-30);
  t.equals(s.n, 3, 'count correct');
  t.equals(s.min, -30, 'min');
  t.equals(s.max, 23.9, 'max');
  t.goodEnuf(s.mean, sl.mean(input.slice(0, s.n)), 'mean');
  t.equals(s.sum, sl.sum(input.slice(0, s.n)), 'sum');
  t.equals(s.variance(), sl.variance(input.slice(0, s.n)), 'variance');
  t.equals(s.stddev(), sl.stdev(input.slice(0, s.n)), 'stddev');

  s.update('33.2');
  t.equals(s.n, 4, 'count correct');
  t.equals(s.min, -30, 'min');
  t.equals(s.max, 33.2, 'max');
  t.equals(s.mean, sl.mean(input.slice(0, s.n)), 'mean');
  t.equals(s.sum, sl.sum(input.slice(0, s.n)), 'sum');
  t.equals(s.variance(), sl.variance(input.slice(0, s.n)), 'variance');
  t.equals(s.stddev(), sl.stdev(input.slice(0, s.n)), 'stddev');

  s.update(150);
  t.equals(s.n, 5, 'count correct');
  t.equals(s.min, -30, 'min');
  t.equals(s.max, 150, 'max');
  t.equals(s.mean, sl.mean(input.slice(0, s.n)), 'mean');
  t.equals(s.sum, sl.sum(input.slice(0, s.n)), 'sum');
  t.equals(s.variance(), sl.variance(input.slice(0, s.n)), 'variance');
  t.equals(s.stddev(), sl.stdev(input.slice(0, s.n)), 'stddev');

  s.update(-150);
  t.equals(s.n, 6, 'count correct');
  t.equals(s.min, -150, 'min');
  t.equals(s.max, 150, 'max');
  t.goodEnuf(s.mean, sl.mean(input.slice(0, s.n)), 'mean');
  t.equals(s.sum, sl.sum(input.slice(0, s.n)), 'sum');
  t.goodEnuf(s.variance(), sl.variance(input.slice(0, s.n)), 'variance');
  t.equals(s.stddev(), sl.stdev(input.slice(0, s.n)), 'stddev');

  s.update('cat');
  t.equals(s.n, 6, 'skipped NaN "cat"');
  t.equals(s.min, -150, 'min');
  t.equals(s.max, 150, 'max');
  t.goodEnuf(s.mean, sl.mean(input.slice(0, s.n)), 'mean');
  t.equals(s.sum, sl.sum(input.slice(0, s.n)), 'sum');
  t.goodEnuf(s.variance(), sl.variance(input.slice(0, s.n)), 'variance');
  t.equals(s.stddev(), sl.stdev(input.slice(0, s.n)), 'stddev');

  t.end();
});

// biome-ignore lint/complexity/useArrowFunction: Legacy
test('zero', function (t) {
  const s = new Stats();
  s.update(0);
  t.equals(s.n, 1);
  t.equals(s.min, 0);
  t.equals(s.max, 0);
  t.equals(s.sum, 0);
  t.end();
});

// biome-ignore lint/complexity/useArrowFunction: Legacy
test('sma of different size', function (t) {
  t.goodEnuf = function (obs, expect, msg) {
    this.equals(obs.toPrecision(7), expect.toPrecision(7), msg);
  };

  const s = new Stats(10);
  for (let i = 0; i < 100; i++) {
    s.update(i);
  }
  t.equals(s.n, 100, '100 entries');
  t.equals(s.min, 0, 'min');
  t.equals(s.max, 99, 'max');
  t.goodEnuf(s.mean, 49.5, 'mean');
  t.equals(s.sum, 4950, 'sum');
  t.goodEnuf(s.variance(), 833.25, 'variance');
  t.equals(s.stddev(), 28.86607004772212, 'stddev');
  t.end();
});

test.onFinish(() => process.exit(0));
