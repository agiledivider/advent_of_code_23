import {Range} from "./range.ts";

export class SeedIterator implements IterableIterator<number> {
    private ranges: Range[] = [];
    private readonly highestNumber: number
    private readonly lowestNumber: number;
    private previousNumber: number
    private counting = false
    private count: number = 0

    constructor(ranges: Range[]) {
        this.ranges = ranges
        let x: number[] = this.ranges.reduce((previous, range) => {
            return [Math.min(previous[0], range.start), Math.max(previous[1], range.end)]
        }, [Number.MAX_VALUE, 0])
        this.highestNumber = x[1]
        this.lowestNumber = x[0]
        this.previousNumber = this.lowestNumber - 1

    }


    next(): { done: boolean, value: number } {
        if (!this.previousNumber) this.previousNumber = this.lowestNumber
        else this.nextNumber()
        return {
            done: this.done(),
            value: this.previousNumber
        };
    }

    [Symbol.iterator](): IterableIterator<number> {
        return this;
    }

    private done() {
        return this.previousNumber > this.highestNumber
    }

    private nextNumber() {
        this.previousNumber++
        this.count++
        if (!this.counting) {
            this.counting = true
            console.log("counting from", this.previousNumber)
        }
        if (this.count % 1000000 == 0) console.write(".")
        if (this.count % 10000000 == 0) console.log(this.previousNumber)
        let skipping = false;
        while (!this.done() && !this.ranges.find(range => range.has(this.previousNumber))) {
            this.counting = false
            this.previousNumber++
            if (!skipping) {
                console.log("skipping from: ", this.previousNumber)
                skipping = true
            }
            if (this.count % 1000000 == 0) console.write(".")
        }
        return
    }
}