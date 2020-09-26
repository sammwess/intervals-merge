export class Interval {

    private _start: number;
    private _end: number;

    get start(): number {
        return this._start;
    }

    get end(): number {
        return this._end;
    }

    constructor(start: number, end: number) {
        this._start = start;
        this._end = end;
    }

    public equals(interval: Interval): boolean {

        if (!interval) {
            return false;
        }

        return this.start === interval.start && this.end === interval.end;
    }
}
