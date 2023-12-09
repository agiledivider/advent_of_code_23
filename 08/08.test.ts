import {describe, expect, test} from "bun:test";
import testdata from "./testdata.txt";

type MapInfo = {
    L: string;
    R: string;
}


class LRGame {
    private readonly LRSeries: string[];
    private map: Map<string, MapInfo> = new Map()
    private startNodes: string[] = [];
    constructor(data: string) {
        let lines = data.split("\n") || []
        this.LRSeries = lines.shift()?.split("") || [];
        lines.shift()
        lines.forEach(line => {
            let [, key,L, R] = line.match(/(\w+) = \((\w+), (\w+)\)/);
            if(key) {
                this.map.set(key, {
                    L: L,
                    R: R
                })
            }
            if (key.at(2) === "A") {
                this.startNodes.push(key)
            }
        })
    }

    part1() {
        let key = "AAA";
        let steps = 0;
        do {
            key = this.map.get(key) ? this.map.get(key)[this.LRSeries[steps % this.LRSeries.length]] : "ZZZ";
            steps++
        } while (key !== "ZZZ")
        return steps;
    }

    part2() {
        let keys = this.startNodes
        let stepsAll = []
        for (let i = 0; i < keys.length; i++) {
            let steps = 0;
            let key = keys[i];
            do {
                let stepCommand = this.LRSeries[steps % this.LRSeries.length]
                key = this.map.get(key) ? this.map.get(key)[stepCommand] : "ZZZ";
                steps++
            } while (!key.endsWith("Z"))
            stepsAll.push(steps)
        }

        let smallestMultiple = stepsAll[0]
        for(let i=1;i<stepsAll.length;i++){
            smallestMultiple = this.smallestCommonMultiple(smallestMultiple, stepsAll[i]);
        }
        return smallestMultiple;
    }

    private smallestCommonMultiple(a: number, b: number): number {
        const greatestCommonDivisor = (a: number, b: number): number => (b === 0 ? a : greatestCommonDivisor(b, a % b));
        return (!a || !b) ? 0 : Math.abs((a * b) / greatestCommonDivisor(a, b));
    }

}

describe("Day 08", () => {
    describe("Part 1", () => {

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

    describe("Part 2", () => {
        test.each([
            ["LR\n" +
            "\n" +
            "AAA = (ZZZ, BBB)\n" +
            "ZZZ = (ZZZ, ZZZ)", 1],
            ["RL\n" +
            "\n" +
            "AAA = (BBB, CCC)\n" +
            "BBB = (DDD, EEE)\n" +
            "CCC = (ZZZ, GGG)\n" +
            "DDD = (DDD, DDD)\n" +
            "EEE = (EEE, EEE)\n" +
            "GGG = (GGG, GGG)\n" +
            "ZZZ = (ZZZ, ZZZ)", 2],
            ["LLR\n" +
            "\n" +
            "AAA = (BBB, BBB)\n" +
            "BBB = (AAA, ZZZ)\n" +
            "ZZZ = (ZZZ, ZZZ)", 6],
            ["LR\n" +
            "\n" +
            "11A = (11B, XXX)\n" +
            "11B = (XXX, 11Z)\n" +
            "11Z = (11B, XXX)\n" +
            "22A = (22B, XXX)\n" +
            "22B = (22C, 22C)\n" +
            "22C = (22Z, 22Z)\n" +
            "22Z = (22B, 22B)\n" +
            "XXX = (XXX, XXX)", 6],
        ])('"%s", expected: %d', (data: string, expected: number) => {
            let sut = new LRGame(data);
            expect(sut.part2()).toBe(expected)
        })

        test("final test", () => {
            let sut = new LRGame(testdata);
            expect(sut.part2()).toBe(15995167053923)
        })
    })
})