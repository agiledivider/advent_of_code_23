import {describe, test} from "bun:test";


class AnimalPath {
    map: string[][]
    constructor(data: string) {
        this.findPath(data)
    }

    findPath(data: string) {
        this.map = data.split("\n").map(line => line.split(""))
        console.log(this.map)
        let startingPoint
        let path = []

        for (let y = 0; y < this.map.length; y++) {
            let startingX = this.map[y].indexOf("S")
            if (startingX > -1) {
                startingPoint = [startingX, y]
                break
            }
        }
        path.push(startingPoint)
        path = this.findThePath(path)



        console.log(path)
        printMap(this.map, path)

        return 1;
    }

    findThePath(path) {
        let currentPoint = path[path.length - 1]
        let x = currentPoint[0]
        let y = currentPoint[1]
        let nextPoint
        // current Point S? then look all four directions
        // if currentPoint 
        if (this.map[y + 1][x] == "|") {
            nextPoint = [x, y + 1]
        }
        if (nextPoint && !path.find(item => item[0] == nextPoint[0] && item[1] == nextPoint[1])) {
            path.push(nextPoint)
            return this.findThePath(path, this.map)
        }
        return path
    }


}
function printMap(map: string[][],path: string[]) {
    for(let y =0; y < map.length; y++) {
        for(let x =0; x < map[0].length; x++) {
            if (map[y][x] == "L") {
                map[y][x] = "└"
            }
            if (map[y][x] == "F") {
                map[y][x] = "┌"
            }
            if (map[y][x] == "J") {
                map[y][x] = "┘"
            }
            if (map[y][x] == "7") {
                map[y][x] = "┐"
            }
        }
    }


    for(let y =0; y < map.length; y++) {
        for(let x =0; x < map[0].length; x++) {
            if (path.find(item => item[0] == x && item[1] == y)) {
                console.write("\x1b[31m")
            }
            console.write(map[y][x])
            console.write("\x1b[0m");
        }
        console.write("\n")
    }
}


