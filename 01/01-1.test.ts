import testdata_dev from "./testdata-dev.txt";
import testdata_dev2 from "./testdata-dev2.txt";
import testdata from "./testdata.txt";
import {describe, expect, test} from "bun:test";
import {calculateFirstAndLastNumberSum} from "./calculateFirstAndLastNumberSum.ts";


describe("part1, numbers only", () => {
    test.each([
        ["1", 11],
        ["treb7uchet", 77],
    ])('single number (%s, %i)', (line: string, expected) => {
        expect(calculateFirstAndLastNumberSum(line)).toBe(expected);
    });

    test("no number", () => {
        expect(calculateFirstAndLastNumberSum("jdfskjh")).toBe(0);
    })

    test.each([
        ["12", 12],
        ["1abc2", 12],
        ["pqr3stu8vwx", 38]
    ])('two numbers (%s, %i)', (line: string, expected) => {
        expect(calculateFirstAndLastNumberSum(line)).toBe(expected);
    });

    test("multiple numbers", () => {
        expect(calculateFirstAndLastNumberSum("a1b2c3d4e5f")).toBe(15);
    })

})

describe("part2, word digits", () => {
    test("single word digit", () => {
        expect(calculateFirstAndLastNumberSum("one")).toBe(11)
    })

    test.each([
        ["twoone", 21],
        ["eightwothree", 83],
        ["two1nine", 29],
        ["xtwone3four", 24],
        ["abcone2threexyz", 13]
    ])('two word digits (%s, %i)', (line: string, expected) => {
        expect(calculateFirstAndLastNumberSum(line)).toBe(expected);
    });

    test.each([
        ["4nineeightseven2", 42],
        ["zoneight234", 14],
        ["qbfvpnxsix3four1lfone", 61],
        ["sixgddsix7", 67],
        ["oneight", 18],
        ["seven7", 77],
        ["seven", 77],
        ["twohbkkrzvpxeighttczsls4six5nineeight", 28],
        ["7pqrstsixteen", 76],
    ])('mixed wor and number digits (%s, %i)', (line: string, expected) => {
        expect(calculateFirstAndLastNumberSum(line)).toBe(expected);
    });
})
describe("Sum up all values", () => {
    test("part 1", () => {
        expect(calculateFirstAndLastNumberSum(testdata_dev)).toBe(142)
    })
    test("part 2", () => {
        expect(calculateFirstAndLastNumberSum(testdata_dev2)).toBe(281)
    })
})

test("last word number", () => {
    expect(calculateFirstAndLastNumberSum("onetwone")).toBe(11);
})


describe("sum up real values", () => {
    test("test with large dataset", () => {
        expect(calculateFirstAndLastNumberSum(testdata)).toBe(54078)
    })
})



