import {describe, expect, test} from "bun:test";
import { ScratchCardSet } from "./scratchCardSet";
import testdata from "./testdata.txt"

describe("Day 04", () => {

    describe("Part 1 - single card", () => {
        test.each([
            ["Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53", 8],
            ["Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19", 2],
            ["Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1", 2],
            ["Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36", 0],
        ])('"%s", expected: %d', (gameData: string, expected: Number) => {
                let sut = new ScratchCardSet(gameData);
                expect(sut.points()).toBe(expected);
            }
        )
    })

    describe("Part 1 - multi cards", () => {
        test.each([
            ["Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19", 10],
        ])('"%s", expected: %d', (gameData: string, expected: Number) => {
                let sut = new ScratchCardSet(gameData);
                expect(sut.points()).toBe(expected);
            }
        )
    })



    describe("Part 1", () => {
        test('demo', () => {
            let demo = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`
                let sut = new ScratchCardSet(demo);
                expect(sut.points()).toBe(13);
            }
        )

        test('testdata', () => {
                let sut = new ScratchCardSet(testdata);
                expect(sut.points()).toBe(23847);
            }
        )
    })
});
