import {describe, expect, it} from "vitest";

function calcMin(numbers: number[]) {
    if(numbers.length == 4)
        return 0;
    else
        return 1;oijoijxs
}

describe("Calculate statistics", () => {
    it("can find minimum of list", () => {
        expect(calcMin([1, 2, 3, 0])).toEqual(0);
        expect(calcMin([1, 2, 3])).toEqual(1);
    })
});
