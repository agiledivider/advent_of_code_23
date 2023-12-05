import {describe, expect, test} from "bun:test";
import {PlanterMap} from "./PlanterMap.ts";

describe("PlanterMap", () => {
    test('empty map', () => {
            let sut = new PlanterMap("");
            expect(sut.map(1)).toBe(1);
        }
    )

    test('single range front edge', () => {
            let sut = new PlanterMap("0 61 1");
            expect(sut.map(61)).toBe(0);
        }
    )

    test('single range back edge', () => {
            let sut = new PlanterMap("0 61 1");
            expect(sut.map(61)).toBe(0);
        }
    )

    test('multi range back edge', () => {
            let sut = new PlanterMap("0 61 1\n52 50 48");
            expect(sut.map(61)).toBe(0);
        }
    )

    test('single range outside', () => {
            let sut = new PlanterMap("0 61 1");
            expect(sut.map(62)).toBe(62);
        }
    )
    test('single range outside', () => {
            let sut = new PlanterMap("50 98 2\n52 50 48");
            expect(sut.map(79)).toBe(81);
        }
    )
    test('single range outside', () => {
            let sut = new PlanterMap("50 98 2\n52 50 48");
            expect(sut.map(99)).toBe(51);
        }
    )

})