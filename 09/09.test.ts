import {describe, expect, test} from "bun:test";
import testdata from "./testdata.txt";

function rowRight(sensorData: string) {
    if (!sensorData) return 0
    let dataPoints = sensorData.trim().split(/ +/);
    let last = dataPoints[dataPoints.length - 1];
    let diffs = []
    for (let i = 0; i < dataPoints.length - 1; i++) {
        let diff = Number(dataPoints[i+1]) - Number(dataPoints[i]);
        diffs.push(diff)
    }
    let result = 0;
    if (diffs[diffs.length - 1] !== 0) {
        result = rowRight(diffs.join(" "))
    }

    return Number(last) + result;
}

function rowLeft(sensorData: string) {
    if (!sensorData) return 0
    let dataPoints = sensorData.trim().split(/ +/);
    let last = dataPoints[0];
    let diffs = []
    for (let i = 0; i < dataPoints.length - 1; i++) {
        let diff = Number(dataPoints[i+1]) - Number(dataPoints[i]);
        diffs.push(diff)
    }
    let result = 0;
    if (diffs.filter(item => item !== 0).length > 0) {

        result = rowLeft(diffs.join(" "))
    }

    return Number(last) - result;
}

class Seonsor {
    private sensorData: string[];
    constructor(sensorData: string) {
        this.sensorData = sensorData.split("\n")
    }

    part1() {
        let sum = 0
        this.sensorData.forEach(line => {
            sum = sum + rowRight(line)
        })
        return sum;
    }

    part2() {
        let sum = 0
        this.sensorData.forEach(line => {
            sum = sum + rowLeft(line)
        })
        return sum;
    }
}

describe("Day 09", () => {
    describe("Part 1", () => {

        test.each([
            ["1   3   6  10  15  21", 28],
            ["0   3   6   9  12  15", 18],
            ["10  13  16  21  30  45", 68],
            ["0 3 6 9 12 15\n" +
            "1 3 6 10 15 21\n" +
            "10 13 16 21 30 45", 114]
        ])("data: %s", (sensorData: string, expected: number) => {
            let sut = new Seonsor(sensorData)
            expect(sut.part1()).toBe(expected)
        })


        test("final sensor", () => {
            let sut = new Seonsor(testdata)
            expect(sut.part1()).toBe(1938731307)
        })
    })

    describe("Part 2", () => {
        test.each([
            ["10  13  16  21  30  45", 5],
            ["0   3   6   9  12  15", -3],
            ["0 3 6 9 12 15\n" +
            "1 3 6 10 15 21\n" +
            "10 13 16 21 30 45", 2]
        ])("data: %s", (sensorData: string, expected: number) => {
            let sut = new Seonsor(sensorData)
            expect(sut.part2()).toBe(expected)
        })

        test("final sensor", () => {
            let sut = new Seonsor(testdata)
            expect(sut.part2()).toBe(948)
        })
    })
})