import {describe, expect, test} from "bun:test";
import {Range} from "./range.ts";
import {SeedIterator} from "./SeedIterator.ts";


describe("SeedGenerator", () => {
    test('thing', () => {
        let sut = new SeedIterator([new Range(2,5)])
        let actual = []
        for (const sutElement of sut) {
            actual.push(sutElement)
        }
        expect(actual).toEqual([2,3,4,5])
    })

    test('thing', () => {
        let sut = new SeedIterator([new Range(2,5),new Range(10,15)])
        let actual = []
        for (const sutElement of sut) {
            actual.push(sutElement)
        }
        expect(actual).toEqual([2,3,4,5,10,11,12,13,14,15])
    })

    test('thing', () => {
        let sut = new SeedIterator([new Range(10,12),new Range(5,7)])
        let actual = []
        for (const sutElement of sut) {
            actual.push(sutElement)
        }
        expect(actual).toEqual([5,6,7,10,11,12])
    })

    test('thing', () => {
        let sut = new SeedIterator([new Range(10,12),new Range(11,13)])
        let actual = []
        for (const sutElement of sut) {
            actual.push(sutElement)
        }
        expect(actual).toEqual([10,11,12,13])
    })

    test('thing', () => {
        let sut = new SeedIterator([new Range(10,12),new Range(11,13)])
        let actual = []
        for (const sutElement of sut) {
            actual.push(sutElement)
        }
        expect(actual).toEqual([10,11,12,13])
    })
})