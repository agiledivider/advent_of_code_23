export class Race {
    private races: any = [];
    constructor(data: string) {
        let raceTimes = data.split("\n")[0].match(/[\d ]+/)[0].trim().split(/ +/).map(val => Number(val))
        let recordDistance = data.split("\n")[1].match(/[\d ]+/)[0].trim().split(/ +/).map(val => Number(val))
        raceTimes.forEach((reaceTime, index) => {
            this.races.push([raceTimes[index], recordDistance[index]])
        })
        console.log(this.races)
    }

    winningChances(raceTime: number, recordDistance: number): number {
        let x1 = raceTime / 2 + Math.sqrt(raceTime ** 2 / 4 - recordDistance)
        let x2 = raceTime / 2 - Math.sqrt(raceTime ** 2 / 4 - recordDistance)
        let min = Math.min(x1, x2)
        let max = Math.max(x1, x2)

        return Math.floor(min), Math.ceil(max), Math.ceil(max) - Math.floor(min) - 1
    }

    part1() {
        return this.races.reduce((mult, race) => {
            return mult * this.winningChances(race[0], race[1])
        }, 1)
    }

    part2() {
        let race = this.races.reduce((prev, race) => {
            return [prev[0] + race[0], prev[1] + race[1]]
        }, ["",""])
        console.log(race)
        return this.winningChances(Number(race[0]), Number(race[1]))
    }
}