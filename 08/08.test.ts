import {describe, expect, test} from "bun:test";
import testdata from "./testdata.txt";

type MapInfo = {
    L: string;
    R: string;
}

class LRGame {
    private LRSeries: string[];
    private map: Map<string, MapInfo> = new Map()
    constructor(data: string) {
        let lines = data.split("\n") || []
        this.LRSeries = lines.shift().split("");
        lines.shift()
        lines.forEach(line => {
            let [, key,L, R] = line.match(/(\w+) = \((\w+), (\w+)\)/);
            if(key) {
                this.map.set(key, {
                    L: L,
                    R: R
                })
            }
        })
        console.log(this.map)

    }

    part1() {
        let key = "AAA";
        let steps = 0;
        let index = 0
        do {
            key = this.map.get(key)[this.LRSeries[steps % this.LRSeries.length]];
            steps++
        } while (key !== "ZZZ")
        return steps;
    }
}

describe("Day 08", () => {

    test.each([
        ["LR\n" +
        "\n" +
        "AAA = (ZZZ, BBB)", 1],
        ["LLR\n" +
        "\n" +
        "AAA = (BBB, BBB)\n" +
        "BBB = (AAA, ZZZ)\n" +
        "ZZZ = (ZZZ, ZZZ)", 6],
        ["RL\n" +
        "\n" +
        "AAA = (BBB, CCC)\n" +
        "BBB = (DDD, EEE)\n" +
        "CCC = (ZZZ, GGG)\n" +
        "DDD = (DDD, DDD)\n" +
        "EEE = (EEE, EEE)\n" +
        "GGG = (GGG, GGG)\n" +
        "ZZZ = (ZZZ, ZZZ)", 2]
    ])('"%s", expected: %d', (data: string, expected: number) => {
        let sut = new LRGame(data);
        expect(sut.part1()).toBe(expected)
    })

    test("final test", () => {
        let sut = new LRGame(testdata);
        expect(sut.part1()).toBe(20513)
    })
})