import {SeedIterator} from "./SeedIterator.ts";
import {Range} from "./range.ts";
import {Planter} from "./Planter.ts";

export class PlanterPart2 extends Planter {
    private seeds: SeedIterator;

    private extractSeeds() {
        let matches = this.rawData.match(/seeds: +(.*)/i)
        let valuePairs = matches[1].trim().split(" ").map(val => Number(val));

        let ranges = []
        for (let i = 0; i < valuePairs.length - 1; i = i + 2) {
            ranges.push(new Range(valuePairs[i], valuePairs[i] + valuePairs[i + 1] - 1))
        }
        this.seeds = new SeedIterator(ranges)
    }

    testing(seed: number, to: string) {
        let currentPlanterMap = this.planterMaps.find(map => map.to == to)
        let sourcePoints = []
        //console.log("seed", seed)
        while(currentPlanterMap) {
            sourcePoints.push(currentPlanterMap.breakPoints())
            to = currentPlanterMap.from
            currentPlanterMap = this.planterMaps.find(map => map.to == to)
        }
        console.log("sp", sourcePoints)

        //console.log("------")
    }
}