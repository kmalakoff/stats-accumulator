const test = require('tape');
const Stats = require('stats-accumulator');

test('exports .cjs', (t) => {
  t.equals(typeof Stats, 'function');
  t.end();
});
