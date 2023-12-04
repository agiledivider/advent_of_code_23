export class Matrix {
    private matrix: any[][];
    width: number;
    height: number;

    constructor(data: string) {
        if (!data) data = ""
        const lines = data.split("\n");
        var temp = [];
        for (let row = 0; row < lines.length; row++) {
            temp[row] = lines[row].split("")
        }
        this.matrix = temp;
        this.width = this.matrix[0].length
        this.height = this.matrix.length


    }

    exists(row: number, column: number) {
        if (row < 0
            || row >= this.height
            || column < 0
            || column >= this.width
        ) {
            return false
        }
        return true
    }

    get(row: number, column: number) {
        return this.matrix[row][column]
    }
}