import {describe, expect, it} from "vitest";

describe("Rules", () => {
    it("Live cell with fewer than two neighbours dies", () => {
        const liveCell = {
            neighbours: 1
        };

        const deadOrAlive = isDeadOrAlive(liveCell);
        expect(deadOrAlive).toEqual(false);
    });
});

