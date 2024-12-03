import {Planter} from "./Planter.ts";

export class PlanterPart2 extends Planter {

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
    }
}