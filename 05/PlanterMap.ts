import {Range} from "./range.ts";

type RangeMap = {
    range: Range,
    offset: number
}

export class PlanterMap {
    private ranges: RangeMap[] = [];
    from: string = ""
    to: string = ""

    constructor(data: string) {
        let lines = data.split("\n")
        lines.forEach(line => {
            let matches = line.match(/(\d+) +(\d+) +(\d+)/)
            if (matches) {
                let [, destinationStart, sourceStart, count] = matches.map(match => Number(match))
                let sourceEnd = sourceStart + count - 1
                let offset = destinationStart - sourceStart
                this.ranges.push({range: new Range(sourceStart, sourceEnd), offset: offset})
            }
        })
    }

    map(source: number): number {
        for (let map of this.ranges) {
            if (map.range.has(source)) {
                return source + map.offset

            }
        }
        return source;
    }
}