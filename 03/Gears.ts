import {numberOfDFGCompiles} from "bun:jsc";

type Position = {
    row: number
    column: number
}

export class Gears {
    private matrix: string[][]
    constructor(data: string) {
        if (!data) data = ""
        const lines = data.split("\n");
        var temp = [];
        for (let row = 0; row < lines.length; row++) {
            temp[row] = lines[row].split("")
        }
        this.matrix = temp;
    }

    public findPossibleGears(): Array<Position> {
        var results: Array<Position> = []

        this.matrix.forEach((line, row) => {
            line.forEach((value, column) => {
                if (value == "*") {
                    results.push({row, column})
                }
            })
        })

        return results;
    }

    private findAdjacentNumbers(row: number, col: number) {
        let y = row
        let x = col
        let result = []

        result.push(... this.findNumberToTheRight(row, col));
        result.push(... this.findNumberToTheLeft(row, col));

        return result
    }

    private findNumberToTheRight(row: number, column: number): number[] {
        let x = column
        let y = row
        let value :string = ""
        x--
        while (Number.isInteger(parseInt(this.matrix[y][x]))) {
            value = this.matrix[y][x] + value
            x--
        }
        if (value.length > 0) return [parseInt(value)]
        return []
    }

    private findNumberToTheLeft(row: number, column: number): number[] {
        let x = column
        let y = row
        let value :string = ""
        x++
        while (Number.isInteger(parseInt(this.matrix[y][x]))) {
            value += this.matrix[y][x]
            x++
        }
        if (value.length > 0) return [parseInt(value)]
        return []
    }

    findGearNumbers() {
        let result = []
        let possibleGears = this.findPossibleGears()
        possibleGears.forEach(gearPosition => {
            let x = this.findAdjacentNumbers(gearPosition.row,gearPosition.column)
            if (x.length > 0) {
                result.push(x)
            }
        })

        return result
    }
}