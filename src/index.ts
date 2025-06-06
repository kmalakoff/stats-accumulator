const pf = Number.parseFloat || parseFloat;
const isString = (x: unknown): boolean => Object.prototype.toString.call(x) === '[object String]';

export interface StatsJSON {
  n: number;
  min: number;
  max: number;
  sum: number;
  mean: number;
  variance: number;
  stddev: number;
}

export default class Stats {
  n: number;
  min: number;
  max: number;
  sum: number;
  mean: number;
  q: number;

  constructor() {
    this.n = 0;
    this.min = Number.MAX_VALUE;
    this.max = -Number.MAX_VALUE;
    this.sum = 0;
    this.mean = 0;
    this.q = 0;
  }

  update(value: string | number): void {
    const num = isString(value) ? pf(value as string) : (value as number);
    if (Number.isNaN(num)) return;
    this.n++;
    this.min = Math.min(this.min, num);
    this.max = Math.max(this.max, num);
    this.sum += num;
    const prevMean = this.mean;
    this.mean = this.mean + (num - this.mean) / this.n;
    this.q = this.q + (num - prevMean) * (num - this.mean);
  }

  variance(): number {
    return this.q / this.n;
  }

  stddev(): number {
    return Math.sqrt(this.q / this.n);
  }

  toJSON(): StatsJSON | null {
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
