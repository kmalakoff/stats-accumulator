'use strict';

function Stats() {
  if (!(this instanceof Stats)) return new Stats();
  this.n = 0;
  this.min = Number.MAX_VALUE;
  this.max = -Number.MAX_VALUE;
  this.sum = 0;
  this.mean = 0;
  this.q = 0;
}

Stats.prototype.update = function update(value) {
  var num = parseFloat(value);
  if (isNaN(num)) return;
  this.n++;
  this.min = Math.min(this.min, num);
  this.max = Math.max(this.max, num);
  this.sum += num;
  var prevMean = this.mean;
  this.mean = this.mean + (num - this.mean) / this.n;
  this.q = this.q + (num - prevMean) * (num - this.mean);
};

Stats.prototype.variance = function variance() {
  return this.q / this.n;
};

Stats.prototype.stddev = function stddev() {
  return Math.sqrt(this.q / this.n);
};

Stats.prototype.toJSON = function toJSON() {
  if (this.n === 0) return null;
  return {
    n: this.n,
    min: this.min,
    max: this.max,
    sum: this.sum,
    mean: this.mean,
    variance: this.variance(),
    stddev: this.stddev(),
  };
};

module.exports = Stats;
