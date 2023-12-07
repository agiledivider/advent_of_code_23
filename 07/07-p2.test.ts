import {describe, expect, test} from "bun:test";
import {CamelGame2} from "./camelGame2.ts";
import {CamelGame} from "./camelGame.ts";
import testdata from "./testdata.txt";

describe("Day 07 part 2 - joker", () => {
    test.each(
        [
            ["five kind, 2nd rule", "JKKKK 1\nAAAAA 2", 5],
            ["five kind, 2nd rule", "JKKKK 1\n22222 2", 5],
            ["five kind, 2nd rule", "JJKKK 1\n22222 2", 5],
            ["five kind, 2nd rule", "JJJJJ 1\n22222 2", 5],
        ]
    )("2 hands: %s", (title, gameData: string, expected: number) => {
        let game = new CamelGame2(gameData)
        expect(game.value()).toBe(expected)
    })


    test("demo test", () => {
        let gameData = "32T3K 765\n" +
            "T55J5 684\n" +
            "KK677 28\n" +
            "KTJJT 220\n" +
            "QQQJA 483";
        let game = new CamelGame2(gameData)
        expect(game.value()).toBe(5905)
    })

    test("final test", () => {
        let game = new CamelGame2(testdata)
        expect(game.value()).toBe(248029057)
    })

})