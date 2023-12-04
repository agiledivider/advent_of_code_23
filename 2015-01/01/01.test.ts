import {describe, expect, test} from "bun:test";
import testdata from "./testdata.txt"
function whichFloor(braces: string) : number{
    let braceList = braces.split("");
    let floor = 0
    braceList.forEach(brace => {
        if (brace == "(") {
            floor++
        } else if (brace == ")") {
            floor--
        }
    })
    return floor;
}

function basementPosition(braces: string) : number{
    let braceList = braces.split("");
    let floor = 0
    for (let index =0; index < braceList.length; index++)  {
        let brace = braceList[index]
        if (brace == "(") {
            floor++
        } else if (brace == ")") {
            floor--
        }
        if (floor == -1) {
            return index+1
        }
    }
    return 0;
}

describe("Day 01", () => {

    describe("Part 1 ", () => {
        test.each([
            ["",0],
            ["(",1],
            ["()",0],
            ["()()",0],
            ["(())",0],
            ["(()(()(",3],
            ["))(((((",3],
            [")())())",-3],
        ])('"%s", expected: %d', (braces: string, expected: Number) => {
                expect(whichFloor(braces)).toBe(expected);
            }
        )

        test('"%s", expected: %d', () => {
                expect(whichFloor(testdata)).toBe(138);
            }
        )

        test('"%s", expected: %d', () => {
                expect(basementPosition(testdata)).toBe(1771);
        })
    })
})