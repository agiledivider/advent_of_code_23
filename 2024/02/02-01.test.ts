import {describe, expect, test} from "bun:test";
import {calculateDampenedReportSafetyCount, calculateReportSafetyCount} from "./calculate-report-safety-count.ts";
import testdata_dev from "./testdata_02.txt";
import data from "./data.txt";
describe('Day 02 - part 1', () => {

    test.each([
        ["1 2 7 8 9", 0],
        ["9 7 6 2 1", 0],
    ])("unsafe step distance", (data: string, expected) => {
        expect(calculateReportSafetyCount(data)).toBe(expected);
    })

    test.each([
        ["1 3 2 4 5", 0],
        ["8 6 4 4 1", 0],
    ])("direction change", (data: string, expected) => {
        expect(calculateReportSafetyCount(data)).toBe(expected);
    })

    test.each([
        ["7 6 4 2 1", 1],
        ["1 3 6 7 9", 1],
    ])("safe", (data: string, expected) => {
        expect(calculateReportSafetyCount(data)).toBe(expected);
    })

    test('testdata', () => {
        expect(calculateReportSafetyCount(testdata_dev)).toBe(2);
    })

    test('data', () => {
        expect(calculateReportSafetyCount(data)).toBe(472);
    })

})



describe('Day 02 - part 2', () => {

    test.each([
        ["1 3 2 4 5", 1],
        ["8 6 4 4 1", 1],
        ["1 2 7 8 9", 0],
    ])("unsafe step distance", (data: string, expected) => {
        expect(calculateDampenedReportSafetyCount(data)).toBe(expected);
    })

    test('testdata', () => {
        expect(calculateDampenedReportSafetyCount(testdata_dev)).toBe(4);
    })

    test('data', () => {
        expect(calculateDampenedReportSafetyCount(data)).toBe(520);
    })

})
