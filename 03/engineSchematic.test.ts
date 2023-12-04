import {describe, expect, test} from "bun:test";
import {EngineSchematic} from "./engineSchematic.ts";
import testdata from "./testdata.txt";
import {Gears} from "./Gears.ts"

describe("Day 03 - engineSchematic", () => {
    describe("different game values", () => {
        test.each([
            ["............\n............", 0],
        ])('"%s", expected: %d', (data: string, expected: number) => {
            let sut = new EngineSchematic(data)
            expect(sut.partsSum()).toBe(expected)
        })
    })

    describe("single line", () => {
        test.each([
            [".....6*.......", 6],
            [".....9*.......", 9],
            ["...........9*", 9],
            ["1*...........9*", 10],
            ["1+...........9+", 10],
        ])('one digit symbol after: %s, %d', (data: string, expected: number) => {
            let sut = new EngineSchematic(data)
            expect(sut.partsSum()).toBe(expected)
        })

        test.each([
            ["....*6.......", 6],
            ["*3...........", 3],
            ["*3...........*5", 8],
            ["+3...........+5", 8],
        ])('one digit symbol before: %s, %d', (data: string, expected: number) => {
            let sut = new EngineSchematic(data)
            expect(sut.partsSum()).toBe(expected)
        })

        test.each([
            [".*6.", 6],
            [".+6.", 6],
            [".#6.", 6],
            [".$6.", 6],
            [".%6.", 6],
            [".§6.", 6],
            ["./6.", 6],
            [".\\6.", 6],
            [".=6.", 6],
            [".@6.", 6],
            [".-6.", 6],
            [".&6.", 6],

        ])('different symbols: %s, %d', (data: string, expected: number) => {
            let sut = new EngineSchematic(data)
            expect(sut.partsSum()).toBe(expected)
        })

        test.each([
            [".*63.", 63],
            ["...125+...", 125],
            ["...125+..%125", 250],
            ["...125..%125", 125],
        ])('multiple digits: %s, %d', (data: string, expected: number) => {
            let sut = new EngineSchematic(data)
            expect(sut.partsSum()).toBe(expected)
        })
    })

    describe("multi line", () => {
        test.each([
            ["..............\n.....6*.......", 6],
            ["1*..............\n.....9*.........", 10],
            ["10*..............\n.....90#.........", 100],
        ])('symbol after: %s, %d', (data: string, expected: number) => {
            let sut = new EngineSchematic(data)
            expect(sut.partsSum()).toBe(expected)
        })
        test.each([
            ["..............\n.....*6.......", 6],
            ["..............\n.....*65......", 65],
        ])('symbol after: %s, %d', (data: string, expected: number) => {
            let sut = new EngineSchematic(data)
            expect(sut.partsSum()).toBe(expected)
        })

        test.each([
            [".*.\n.6.", 6],
            ["..*..\n..9..", 9],
            ["..*..\n.999.", 999],
        ])('symbol above: %s, %d', (data: string, expected: number) => {
            let sut = new EngineSchematic(data)
            expect(sut.partsSum()).toBe(expected)
        })

        test.each([
            [".6.\n.*.", 6],
            ["..6..\n..*..", 6],
            ["..66..\n...*..", 66],
            ["..66..\n..*...", 66],
        ])('symbol below: %s, %d', (data: string, expected: number) => {
            let sut = new EngineSchematic(data)
            expect(sut.partsSum()).toBe(expected)
        })

        test.each([
            [".6.\n*..", 6],
            [".6.\n..*", 6],
            ["...\n.6.\n..*", 6],
            ["...\n.6.\n*..", 6],
            ["*..\n.6.\n...", 6],
            ["..*\n.6.\n...", 6],
            ["..6..\n*....", 0],
            ["..66..\n.*....", 66],
            ["..66..\n...*..", 66],
            ["..66..\n....*.", 66],
            ["..123..\n.....*.", 123],
        ])('symbol corner: %s, %d', (data: string, expected: number) => {
            let sut = new EngineSchematic(data)
            expect(sut.partsSum()).toBe(expected)
        })
    })

    test("expect Exception on unknown symbol", () => {
        expect(() => {new EngineSchematic("...a..")}).toThrow("Unknown character: a")
    })

    describe('Part 1', () => {

        test("Test", () => {
            const data =
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

            let sut = new EngineSchematic(data)
            expect(sut.partsSum()).toBe(4361)
        })

        test("Big Test", () => {
            let sut = new EngineSchematic(testdata)
            expect(sut.partsSum()).toBe(528819)
        })
    });
});

describe("Day 03 - gear ratio", () => {
    describe("none", () => {
        test.each([
            ["..........\n..........\n..........", 0],
        ])('"%s", expected: %d', (data: string, expected: number) => {
            let sut = new EngineSchematic(data)
            expect(sut.gearRatio()).toBe(expected)
        })
    })

    describe("none", () => {

        test.each([
            ["..........\n..........\n..........", []],
            ["*.........\n..........\n..........", [{row:0,column:0}]],
            ["*.........\n..........\n........*.", [{row:0,column:0},{row:2,column:8}]],
            ["*.........\n..........\n........*.", [{row:0,column:0},{row:2,column: 8}]]
        ])("two", (data, expected) => {
            expect((new Gears(data)).findPossibleGears()).toEqual(expected)
        })

        test("findAdjacentNumbers", () => {
            let sut : Gears = new Gears("");
            expect(sut.findGearNumbers()).toEqual([])
        })

        test("findAdjacentNumbers", () => {
            let sut : Gears = new Gears("*.........\n..........\n........*.");
            expect(sut.findGearNumbers()).toEqual([])
        })

        test("findAdjacentNumbers", () => {
            let sut : Gears = new Gears("*12.......\n..........\n........*.");
            expect(sut.findGearNumbers()).toEqual([[12]])
        })

        test("findAdjacentNumbers", () => {
            let sut : Gears = new Gears("..........\n*12.......\n........*.");
            expect(sut.findGearNumbers()).toEqual([[12]])
        })

        test("findAdjacentNumbers", () => {
            let sut : Gears = new Gears("..........\n...*12....\n........*.");
            expect(sut.findGearNumbers()).toEqual([[12]])
        })

        test("findAdjacentNumbers3", () => {
            let sut : Gears = new Gears("..........\n.......*12");
            expect(sut.findGearNumbers()).toEqual([[12]])
        })

        test("findAdjacentNumbers3", () => {
            let sut : Gears = new Gears("...........\n.......*123");
            expect(sut.findGearNumbers()).toEqual([[123]])
        })

        test("findAdjacentNumbers3", () => {
            let sut : Gears = new Gears("...........\n.......123*");
            expect(sut.findGearNumbers()).toEqual([[123]])
        })

        test("findGearNumbers", () => {
            let sut : Gears = new Gears("...........\n.......123*");
            expect(sut.findGearNumbers()).toEqual([[123]])
        })

        test("findGearNumbers", () => {
            let sut : Gears = new Gears("...........\n....123*456");
            expect(sut.findGearNumbers()).toEqual([[123, 456]])
        })

        test("findGearNumbers", () => {
            let sut : Gears = new Gears("...........\n....123*456\n...........\n....789*135");
            expect(sut.findGearNumbers()).toEqual([[123, 456],[789,135]])
        })
    })
})
