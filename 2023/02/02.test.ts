import {describe, expect, test} from "bun:test";
import {cubeGameCounter} from "./cubeGameCounter.ts";
import testdata from "./testdata.txt";
import {power} from "./power.ts";

describe("no dice drawn, so every game counts", () => {


    describe("different game values", () => {
        test.each([
            ["Game 1:", 1],
            ["Game 2:", 2],
            ["Game 27:", 27],
            ["Game 27:\nGame 30:", 57],
        ])('"%s", expected: %d', (gameData: string, expected: Number) => {
                let cubeCount = {red: 0, green: 0, blue: 0}
                expect(cubeGameCounter(gameData, cubeCount)).toBe(expected);
            }
        )
    })
});

describe("only one color", () => {

    describe("not enough", () => {
        test.each([
            ["Game 1: 1 red", 0],
            ["Game 17: 1 blue", 0],
            ["Game 17: 1 green", 0],
        ])('"%s", expected: %d', (gameData: string, expected: Number) => {
                let cubeCount = {red: 0, green: 0, blue: 0}
                expect(cubeGameCounter(gameData, cubeCount)).toBe(expected);
            }
        )
    })

    describe("enough", () => {
        test.each([
            ["Game 1: 1 red", 1],
            ["Game 7: 10 red", 7],
            ["Game 7: 10 red\nGame 6: 5 red", 13],
        ])('"%s", expected: %d', (gameData: string, expected: Number) => {
                let cubeCount = {red: 10, green: 7, blue: 1}
                expect(cubeGameCounter(gameData, cubeCount)).toBe(expected);
            }
        )
    })

    describe("demo", () => {
        test.each([
            [`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`, 8],
        ])('"%s", expected: %d', (gameData: string, expected: Number) => {
                let cubeCount = {red: 12, green: 13, blue: 14}
                expect(cubeGameCounter(gameData, cubeCount)).toBe(expected);
            }
        )
    })

});

describe("part 2", () => {
    test("single power", () => {
        expect(power("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green")).toBe(48)
    })

    test("single power", () => {
        expect(power("Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue")).toBe(12)
    })

    test("multi power", () => {
        expect(power(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`)).toBe(2286)
    })
})

describe("part 1", () => {
    test('lets see', () => {
            let cubeCount = {red: 12, green: 13, blue: 14}
            expect(cubeGameCounter(testdata, cubeCount)).toBe(2283);
        }
    )
})

describe("part 2", () => {
    test('lets see', () => {
            expect(power(testdata)).toBe(78669);
        }
    )
})
