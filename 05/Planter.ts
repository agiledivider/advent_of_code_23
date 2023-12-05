import {PlanterMap} from "./PlanterMap.ts";

export class Planter {
    private rawData: string = "";
    private seeds: number[] = [];
    private planterMaps: PlanterMap[] = [];
    private seedLocation: Map<number, number> = new Map()

    constructor(data: string) {
        this.rawData = data
        this.extractSeeds()
        this.extractPlanterMaps()
        this.calculateLocations()
    }

    lowestLocation(): number {
        let minLocation = Number.MAX_VALUE
        for (let location of this.seedLocation.values()) {
            minLocation = Math.min(minLocation, location)
        }
        return minLocation
    }

    private extractSeeds() {
        let matches = this.rawData.match(/seeds: +(.*)/i)
        this.seeds = matches[1].trim().split(" ").map(val => Number(val))
    }

    private extractPlanterMaps() {
        let matches = this.rawData.match(/[\w-]+ map:[ \d\n]+/g)
        if (!matches) return
        matches.forEach(match => {
            let [title, data] = match.split(":\n")
            let [, from, to] = title.match(/(\w+)-to-(\w+)/)
            let pm = new PlanterMap(data)
            pm.from = from
            pm.to = to
            this.planterMaps.push(pm)
        })
    }

    private calculateLocations() {
        this.seeds.forEach(seed => {
            let from = "seed"
            let currentResult = seed
            let currentPlanterMap = this.planterMaps.find(map => map.from == from)
            //console.log("seed", seed)
            while(currentPlanterMap) {
                from = currentPlanterMap.to
                currentResult = currentPlanterMap.map(currentResult)
                currentPlanterMap = this.planterMaps.find(map => map.from == from)
            }
            //console.log("------")
            this.seedLocation.set(seed, currentResult)

        })
        //console.log(this.seedLocation)
    }
}