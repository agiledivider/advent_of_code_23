import testdata_dev from "./testdata_dev.txt";
import data_part1 from "./data_part1.txt";
import {describe, expect, test} from "bun:test";
import {calculateDistance} from "./calculateDistance.ts";

describe('Day 01 - part 1', () => {

    test("zero distance one line", () => {
        expect(calculateDistance("1 1")).toBe(0);
    })

    test.each([
        ["1 2", 1],
        ["2 1", 1],
    ])('1 distance one line', (line: string, expected) => {
        expect(calculateDistance(line)).toBe(expected);
    });

    test.each([
        ["1 1\n1 1", 0],
        ["1 2\n1 2", 2],
    ])('multi line', (line: string, expected) => {
        expect(calculateDistance(line)).toBe(expected);
    });

    test('test_data', () => {
        expect(calculateDistance(testdata_dev)).toBe(11);
    })

    test('part 1', () => {
        expect(calculateDistance(data_part1)).toBe(2164381);
    })
})

