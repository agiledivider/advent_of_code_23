export class EngineSchematic {
    private map: string[];
    private mapWidth: number;
    private mapHeight: number;
    private sum: number = 0;
    private symbolRegEx = new RegExp(/[*+#$%§/\\=@&-]/)

    constructor(data: string) {
        this.mapWidth = data.split("\n")[0].length
        this.mapHeight = data.split("\n").length
        this.map = data.replaceAll("\n","").split("")

        const isSymbol = (character: string) => {
            return Boolean(character.match(this.symbolRegEx))
        };
        const isBlank = (char: string) => {
            return char == '.'
        }
        const isDigit = (character: string) => {
            return Boolean(Number.isInteger(parseInt(character)))
        };

        const endOfNumber = (column: number, row: number) => {
            return column >= this.mapWidth -1 || !isDigit(this.map[row * this.mapWidth + column+1])  ;
        };

        let currentNumber = ""
        let isTouchedBySymbol = false

        for (let row = 0; row < this.mapHeight; row++) {
            for (let column = 0; column < this.mapWidth; column++) {
                let char = this.map[row * this.mapWidth + column]

                if (isDigit(char)) {
                    currentNumber += char
                    if (this.symbolAfter(column, row)
                        || this.symbolBefore(column, row)
                        || this.symbolAbove(column, row)
                        || this.symbolBelow(column, row)
                        || this.symbolCorner(column, row)
                    ){
                        isTouchedBySymbol = true
                    }
                    if (endOfNumber(column, row)) {
                        if (isTouchedBySymbol && currentNumber.length > 0) {
                            this.sum += parseInt(currentNumber)
                            isTouchedBySymbol = false
                        }
                        currentNumber = ""
                    }
                }

                if (!isBlank(char) && !isSymbol(char) && !isDigit(char)) {
                    throw new Error("Unknown character: " + char)
                }
            }
        }
    }

    private symbolBefore(column: number, row: number) : boolean {
        if (column == 0) return false
        return Boolean(this.map[row * this.mapWidth + (column - 1)].match(this.symbolRegEx));
    }

    private symbolAfter(column: number, row: number) : boolean {
        if (row + 1 > this.mapHeight) return false
        if (column + 1 >= this.mapWidth) return false
        return Boolean(this.map[row * this.mapWidth + column + 1].match(this.symbolRegEx));
    }

    private symbolAbove(column: number, row: number) : boolean {
        if (row < 1) return false
        return Boolean(this.map[(row - 1) * this.mapWidth + column].match(this.symbolRegEx));
    }

    private symbolBelow(column: number, row: number) : boolean {
        if (row + 1 >= this.mapHeight) return false
        return Boolean(this.map[(row + 1) * this.mapWidth + column].match(this.symbolRegEx));
    }
    private symbolCorner(column: number, row: number) : boolean {
        return this.symbolBottomLeft(column, row)
        || this.symbolBottomRight(column, row)
        || this.symbolTopLeft(column, row)
        || this.symbolTopRight(column, row)
    }

    private symbolBottomLeft(column: number, row: number) {
        if (column == 0) return false
        if (row + 1 >= this.mapHeight) return false
        return Boolean(this.map[(row + 1) * this.mapWidth + column - 1].match(this.symbolRegEx));
    }
    private symbolBottomRight(column: number, row: number) {
        if (column + 1 >= this.mapWidth) return false
        if (row + 1 >= this.mapHeight) return false
        return Boolean(this.map[(row + 1) * this.mapWidth + column + 1].match(this.symbolRegEx));
    }
    private symbolTopLeft(column: number, row: number) {
        if (column == 0) return false
        if (row < 1) return false
        return Boolean(this.map[(row - 1) * this.mapWidth + column - 1].match(this.symbolRegEx));
    }

    private symbolTopRight(column: number, row: number) {
        if (column + 1 >= this.mapWidth) return false
        if (row < 1) return false
        return Boolean(this.map[(row - 1) * this.mapWidth + column + 1].match(this.symbolRegEx));
    }

    partsSum(): number {
        return this.sum;
    }

    gearRatio() : number {
        return 0
    }
}
