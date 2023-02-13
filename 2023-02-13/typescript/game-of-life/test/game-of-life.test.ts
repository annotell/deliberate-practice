import {describe, expect, it} from "vitest";

type AliveCell = {
    neighbours: number
}

type DeadCell = {
    neighbours: number
}

function isAlive(aliveCell: AliveCell): boolean {
    if(aliveCell.neighbours === 2 || aliveCell.neighbours === 3)
        return true;
    return false;
}

function isDeadBecomingAlive(deadCell: DeadCell) {
    return deadCell.neighbours === 3;
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

    it("Any dead cell without three live neighbours stays dead", () => {
        const deadCell = {
            neighbours: 2
        };

        const alive = isDeadBecomingAlive(deadCell);

        expect(alive).toEqual(false);
    });
});

