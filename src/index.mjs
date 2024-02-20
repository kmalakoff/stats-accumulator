export default class Stats {
  constructor() {
    this.n = 0;
    this.min = Number.MAX_VALUE;
    this.max = -Number.MAX_VALUE;
    this.sum = 0;
    this.mean = 0;
    this.q = 0;
  }

  update(value) {
    const num = parseFloat(value);
    if (Number.isNaN(num)) return;
    this.n++;
    this.min = Math.min(this.min, num);
    this.max = Math.max(this.max, num);
    this.sum += num;
    const prevMean = this.mean;
    this.mean = this.mean + (num - this.mean) / this.n;
    this.q = this.q + (num - prevMean) * (num - this.mean);
  }

  variance() {
    return this.q / this.n;
  }

  stddev() {
    return Math.sqrt(this.q / this.n);
  }

  toJSON() {
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
  }
}
