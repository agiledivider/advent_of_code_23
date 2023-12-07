import {describe, expect, test} from "bun:test";
import {PlanterPart2} from "./PlanterPart2.ts";
import sampledata from "./sampleData.txt"

class Breakpoints {
    private map: Map<number, number>;
    constructor() {
        this.map = new Map<number, number>()
    }
} 
describe("05-part2-try 2", () => {
    test.skip('thing', () => {
        //let sut = new PlanterPart2("seeds: 2\nseed-to-soil map:\n10 20 2\n30 40 1");
        let sut = new PlanterPart2(sampledata);

       expect(sut.testing(14, "temperature")).toBeTrue()
    })

})
