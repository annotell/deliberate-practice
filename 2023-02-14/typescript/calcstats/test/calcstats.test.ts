import {describe, expect, it} from "vitest";

function calcMin(numbers: number[]) {
    return 0;
}

describe("Calculate statistics", () => {
    it("can find minimum of list", () => {
        expect(calcMin([1, 2, 3, 0])).toEqual(0);
    })
});
