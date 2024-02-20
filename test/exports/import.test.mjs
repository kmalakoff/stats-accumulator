import Stats from 'stats-accumulator';
import test from 'tape';

test('exports .mjs', (t) => {
  t.equals(typeof Stats, 'function');
  t.end();
});
