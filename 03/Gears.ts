import {Matrix} from "./matrix.ts";

type Position = {
    row: number
    column: number
}



export class Gears {
    private matrix: Matrix;
    constructor(data: string) {
        this.matrix = new Matrix(data)
    }

    public findPossibleGears(): Array<Position> {
        var results: Array<Position> = []

        for (let row = 0; row < this.matrix.height; row++) {
            for (let column = 0; column < this.matrix.width; column++) {
                if (this.matrix.get(row, column) == "*") {
                    results.push({row, column})
                }
            }
        }

        return results;
    }

    private findAdjacentNumbers(row: number, col: number) {
        let result = []

        result.push(... this.findNumberInRow(row, col))
        result.push(... this.findNumberInRow(row-1, col));
        result.push(... this.findNumberInRow(row+1, col));

        return result
    }



    private findNumberInRow(row: number, column: number): number[] {
        let value = []

        if (this.isNumber(row, column-1)) {
            let v = this.matrix.get(row, column-1)
            let right = this.getRightNumberpart(row, column-1)
            let left = this.getLeftNumberpart(row,column-1)
            value.push(parseInt(left + v + right))
        }

        if (!this.isNumber(row, column - 1)
            && this.isNumber(row, column)
        ) {
            let v = this.matrix.get(row, column)
            let right = this.getRightNumberpart(row, column)
            let left = this.getLeftNumberpart(row,column)
            value.push(parseInt(left + v + right))
        }

        if (!this.isNumber(row, column)
            && this.isNumber(row, column + 1)
        ) {
            let v = this.matrix.get(row, column +1)
            let right = this.getRightNumberpart(row, column +1)
            let left = this.getLeftNumberpart(row,column+1)
            value.push(parseInt(left + v + right))
        }

        return value
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

    isNumber(row: number, column: number) :Boolean {
        return this.matrix.exists(row,column)
        && Number.isInteger(parseInt(this.matrix.get(row,column)))
    }

    private getRightNumberpart(row: number, column: number) : string {
        return this.getNumberpart(column, row, 1);
    }

    private getLeftNumberpart(row: number, column: number) : string {
        return this.getNumberpart(column, row, -1);
    }

    private getNumberpart(column: number, row: number, direction: number) {
        let x = column
        let numberpart = ""
        while (this.matrix.exists(row, x=x+direction)
            && Number.isInteger(parseInt(this.matrix.get(row, x)))
            ) {
            if (direction > 0) {
                numberpart += this.matrix.get(row, x)
            } else {
                numberpart = this.matrix.get(row, x) + numberpart
            }
        }
        return numberpart;
    }

    gearsRatio() :number {
        let x = this.findGearNumbers()
        let ratio = 0;
        x.forEach(gearset => {
            if(gearset.length == 2) {
                ratio += gearset[0]*gearset[1]
            }
        })
        return ratio;
    }
}


