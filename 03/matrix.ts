export class Matrix {
    private readonly matrix: any[][];
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
        return !(row < 0
            || row >= this.height
            || column < 0
            || column >= this.width);

    }

    get(row: number, column: number) {
        return this.matrix[row][column]
    }
}