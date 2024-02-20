export default class Stats {
    n: number;
    min: number;
    max: number;
    sum: number;
    mean: number;
    q: number;
    update(value: any): void;
    variance(): number;
    stddev(): number;
    toJSON(): {
        n: number;
        min: number;
        max: number;
        sum: number;
        mean: number;
        variance: number;
        stddev: number;
    };
}
