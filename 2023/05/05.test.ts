import {describe, expect, test} from "bun:test";
import {Planter} from "./Planter.ts";
import sampledata from "./sampleData.txt"
import testdata from "./testdata.txt"


describe("Day 06", () => {
    describe("Part 1", () => {
        test.each([
            ["seeds: 1\nseed-to-soil map:\n10 20 2", 1],
            ["seeds: 2\nseed-to-soil map:\n10 20 2", 2],
            ["seeds: 2 4\nseed-to-soil map:\n10 20 2", 2],
            ["seeds: 22 5644 2 644\nseed-to-soil map:\n10 20 2", 2],
        ])('"%s", expected: %d', (data: string, expected: number) => {
                let sut = new Planter(data);
                expect(sut.lowestLocation()).toBe(expected);
            }
        )
    })

    test("sample data", () => {
        let sut = new Planter(sampledata);
        expect(sut.lowestLocation()).toBe(35)
    })

    test("final test", () => {
        let sut = new Planter(testdata);
        expect(sut.lowestLocation()).toBe(251346198)
    })


})
