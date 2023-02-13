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

    it("Any live cell with two or three live neighbours lives on to the next generation.", () => {
        const liveCell = {
            neighbours: 2
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
});

