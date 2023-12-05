export class Range {
    private start: number;
    private end: number;

    constructor(start: number, end: number) {
        this.start = start
        this.end = end
    }

    has(thisNumber: number) {
        return thisNumber >= this.start && thisNumber <= this.end;
    }
}