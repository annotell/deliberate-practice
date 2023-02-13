import {describe, expect, it} from "vitest";

function isDeadOrAlive(cell: { neighbours: number }) {
    if(cell.neighbours == 4)
        return false;
    return cell.neighbours >= 2;
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


    it.each([4, 5])("Any live cell with more than three live neighbours dies", (neighbours) => {
        const liveCell = {
            neighbours: neighbours
        };

        const deadOrAlive = isDeadOrAlive(liveCell);

        expect(deadOrAlive).toEqual(false);
    });
});

