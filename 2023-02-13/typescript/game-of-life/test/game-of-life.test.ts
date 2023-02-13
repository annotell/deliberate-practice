import {describe, expect, it} from "vitest";

function isAlive(cell: { neighbours: number }): boolean {
    if(cell.neighbours == 2 || cell.neighbours == 3)
        return true;
    return false;
}

describe("Rules", () => {
    it("Live cell with fewer than two neighbours dies", () => {
        const liveCell = {
            neighbours: 1
        };

        const deadOrAlive = isAlive(liveCell);

        expect(deadOrAlive).toEqual(false);
    });

    it.each([2, 3])("Any live cell with two or three live neighbours lives", (neighbours: number) => {
        const liveCell = {
            neighbours: neighbours
        };

        const deadOrAlive = isAlive(liveCell);

        expect(deadOrAlive).toEqual(true);
    });


    it.each([4, 5])("Any live cell with more than three live neighbours dies", (neighbours) => {
        const liveCell = {
            neighbours: neighbours
        };

        const deadOrAlive = isAlive(liveCell);

        expect(deadOrAlive).toEqual(false);
    });

    it("Any dead cell with exactly three live neighbours becomes a live cell", () => {
        const deadCell = {
            neighbours: 3
        };

        const alive = isDeadBecomingAlive(deadCell);

        expect(alive).toEqual(true);
    });
});

