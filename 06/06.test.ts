import {describe, expect, test} from "bun:test";
import {Race} from "./Race.ts";
import testdata from "./testdata.txt"
describe("Part 1", () => {
    test.each([
        [7, 9, 4],
        [15, 40, 8],
        [30, 200, 9],
    ])('"%s", expected: %d', (raceTime: number, recordDistance: number,expected: number) => {
        let sut = new Race("Time:      " + raceTime + "\nDistance:  " + recordDistance)
        expect(sut.part1()).toBe(expected)
    })




    test("Race", () => {
        let race = new Race("Time:      7  15\nDistance:  9  40")
        expect(race.part1()).toBe(32)
    })

    test("Race", () => {
        let race = new Race("Time:      7  15   30\nDistance:  9  40  200")
        expect(race.part1()).toBe(288)
    })

    test("final Race", () => {
        let race = new Race(testdata)
        expect(race.part1()).toBe(1660968)
    })
})


describe("Part 2", () => {
    test("Race", () => {
        let race = new Race("Time:      7  15   30\nDistance:  9  40  200")
        expect(race.part2()).toBe(71503)
    })

    test("final Race", () => {
        let race = new Race(testdata)
        expect(race.part2()).toBe(26499773)
    })
})