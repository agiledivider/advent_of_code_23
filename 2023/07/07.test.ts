import {describe, expect, test} from "bun:test";
import {CamelGame, sort} from "./camelGame.ts";
import testdata from "./testdata.txt";
import redditdata from "./redditdata.txt";
describe("Day 07", () => {

    let highCard_5 = "12345"
    let highCard_6 = "12346"
    let highCard_2nd_low = "12A46"
    let highCard_2nd_high = "1K346"
    let pair     = "11345"
    let pair_unordered = "13451"
    let pair_high = "61346"
    let three_of_a_kind_6 = "61646"
    test("high card", () => {
        expect(sort([highCard_5,highCard_6])).toEqual([highCard_5,highCard_6])
    })

    test("high card change", () => {
        expect(sort([highCard_6,highCard_5])).toEqual([highCard_5,highCard_6])
    })

    test("high card change", () => {
        expect(sort([highCard_2nd_low,highCard_5])).toEqual([highCard_5,highCard_2nd_low])
    })

    test("high card change", () => {
        expect(sort([highCard_2nd_low,highCard_2nd_high])).toEqual([highCard_2nd_low, highCard_2nd_high])
    })

    test("three of a kind", () => {
        expect(sort([three_of_a_kind_6,highCard_2nd_high])).toEqual([highCard_2nd_high,three_of_a_kind_6])
    })



    test.each([
        [[highCard_5, pair],[highCard_5, pair]],
        [[pair, highCard_5],[highCard_5, pair]],
        [[pair_unordered, highCard_5],[highCard_5, pair_unordered]],
        [[highCard_6, pair_unordered],[highCard_6, pair_unordered]],
        [[pair_high, pair_unordered],[pair_unordered, pair_high]]
    ])("pairs: %o to %o", (actual, expected) => {
        expect(sort(actual)).toEqual(expected)
    })



    test("same pair, different first card", () => {
        let low = "1K2K3"
        let high ="TK2K3"
        expect(sort([high,low])).toEqual([low,high])
    })

    test("two pairs", () => {
        let high = "2626K"
        let low ="TK2K3"
        expect(sort([high,low])).toEqual([low,high])
    })

    test("full house", () => {
        let high = "26262"
        let low ="KKKT2"
        expect(sort([high,low])).toEqual([low,high])
    })

    test("four of a kind", () => {
        let high = "22262"
        let low ="KKKTT"
        expect(sort([high,low])).toEqual([low,high])
    })

    test("five of a kind", () => {
        let high = "22222"
        let low ="KKKKT"
        expect(sort([high,low])).toEqual([low,high])
    })

    test("game", () => {
        let gameData = "32T3K 765";
        let game = new CamelGame(gameData)
        expect(game.value()).toBe(765)
    })

    test("2 hands", () => {
        let gameData = "32T3K 11\n12345 10";
        let game = new CamelGame(gameData)
        expect(game.value()).toBe(32)
    })

    test("2 hands", () => {
        let gameData = "28547 11\n62347 10";
        let game = new CamelGame(gameData)
        expect(game.value()).toBe(31)
    })

    test.each(
        [
            ["five kind, 2nd rule", "KKKKK 1\nAAAAA 2", 5],
            ["five kind, four of a kind", "KKKKK 2\nKAAAA 1", 5],
            ["five kind, three of a kind", "KKKKK 2\nKTAAA 1", 5],
            ["five kind, 2 pairs", "KKKKK 2\nKTATA 1", 5],
            ["five kind, 1 pairs", "KKKKK 2\nKT5TA 1", 5],
            ["five kind, nothing", "KKKKK 2\n23456 1", 5],
            ["four kind, 2nd rule", "AKKKK 2\nKAAAA 1", 5],
            ["four kind, three of a kind", "AKKKK 2\nKTAAA 1", 5],
            ["four kind, 2 pairs", "AKKKK 2\nKTATA 1", 5],
            ["four kind, 1 pairs", "AKKKK 2\nKTA5A 1", 5],
            ["four kind, nothing", "AKKKK 2\n23456 1", 5],
            ["three kind, 2nd rule", "A3KKK 2\n9KK5K 1", 5],
            ["three kind, 2 pairs", "A3KKK 2\n99K5K 1", 5],
            ["three kind, 1 pairs", "A3KKK 2\n98K5K 1", 5],
            ["three kind, nothing", "A3KKK 2\n65432 1", 5],
            ["2 pairs, 2nd rule", "KTKT3 2\nKTKT2 1", 5],
            ["2 pairs, 1 pair", "KTKT3 2\nKT8T2 1", 5],
            ["2 pairs, nothing", "KTKT3 2\nAKQJT 1", 5],
            ["1 pairs, 2nd rule", "K8KT3 2\n8KKT3 1", 5],
            ["1 pairs, nothing", "K8KT3 2\nT9876 1", 5],
            ["nothing, 2nd rule", "A2345 2\nK2345 1", 5],
            ["nothing, 2nd rule", "A2345 2\nQ2345 1", 5],
            ["nothing, 2nd rule", "2345A 2\nQ2345 1", 4],
        ]
    )("2 hands: %s", (title, gameData: string, expected: number) => {
        let game = new CamelGame(gameData)
        expect(game.value()).toBe(expected)
    })

    test.each(
        [
            ["five kind, 2nd rule", "AAAAA 3\nKKKKK 2\n67QTK 1", 14],
            ["five kind, 2nd rule", "AA7AA 3\nAA8AA 2\n67QTK 1", 13],
        ]
    )("3 hands: %s", (title, gameData: string, expected: number) => {
        let game = new CamelGame(gameData)
        expect(game.value()).toBe(expected)
    })

    test("demo test", () => {
        let gameData = "32T3K 765\n" +
            "T55J5 684\n" +
            "KK677 28\n" +
            "KTJJT 220\n" +
            "QQQJA 483";
        let game = new CamelGame(gameData)
        expect(game.value()).toBe(6440)
    })

    test("reddit test", () => {
        let game = new CamelGame(redditdata)
        expect(game.value()).toBe(6592)
    })

    test("final test", () => {
        let game = new CamelGame(testdata)
        expect(game.value()).toBe(249748283)
    })

})