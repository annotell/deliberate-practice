import {describe, expect, it} from "vitest";

function isDeadOrAlive(_cell: { neighbours: number }) {
    return false;
}

describe("Rules", () => {
    it("Live cell with fewer than two neighbours dies", () => {
        const liveCell = {
            neighbours: 1
        };

        const deadOrAlive = isDeadOrAlive(liveCell);

        expect(deadOrAlive).toEqual(false);
    });

    it("Any live cell with two or three live neighbours lives on to the next generation.", () => {
        const liveCell = {
            neighbours: 2
        };

        const deadOrAlive = isDeadOrAlive(liveCell);

        expect(deadOrAlive).toEqual(true);
    });
});

