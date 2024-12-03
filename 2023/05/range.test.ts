import {describe, expect, test} from "bun:test";
import {Range} from "./range.ts";

describe("Range", () => {
    test.each([
        [1,1,1,true],
        [1,2,3,false],
    ])('"%s", expected: %d', (start: number, end: number, testData: number, expected: boolean) => {
            let sut = new Range(start, end);
            expect(sut.has(testData)).toBe(expected);
        }
    )
})