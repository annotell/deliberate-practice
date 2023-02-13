import {describe, expect, it} from "vitest";

type Cell = {
    neighbours: number
    isAlive: boolean
}

function isAliveStayingAlive(neighbours: number): boolean {
    return neighbours === 2 || neighbours === 3;

}

function isDeadBecomingAlive(neighbours: number) {
    return neighbours === 3;
}

describe("Cell behaviour", () => {
    it("A living cell with only one neighbour", () => {
        const liveCell: Cell = {
            neighbours: 1,
            isAlive: true
        };

        const alive = checkCellLifeStatus(liveCell);

        expect(alive).toEqual(false);
    });
})

describe("Rules", () => {
    it("Live cell with fewer than two neighbours dies", () => {
        const liveCell: Cell = {
            neighbours: 1,
            isAlive: false
        };

        const alive = isAliveStayingAlive(liveCell.neighbours);

        expect(alive).toEqual(false);
    });

    it.each([2, 3])("Any live cell with two or three live neighbours lives", (neighbours: number) => {
        const liveCell: Cell = {
            neighbours: neighbours,
            isAlive: false
        };

        const alive = isAliveStayingAlive(liveCell.neighbours);

        expect(alive).toEqual(true);
    });


    it.each([4, 5])("Any live cell with more than three live neighbours dies", (neighbours) => {
        const liveCell: Cell = {
            neighbours: neighbours,
            isAlive: false
        };

        const alive = isAliveStayingAlive(liveCell.neighbours);

        expect(alive).toEqual(false);
    });

    it("Any dead cell with exactly three live neighbours becomes a live cell", () => {
        const deadCell: Cell = {
            neighbours: 3,
            isAlive: false
        };

        const alive = isDeadBecomingAlive(deadCell.neighbours);

        expect(alive).toEqual(true);
    });

    it("Any dead cell without three live neighbours stays dead", () => {
        const deadCell: Cell = {
            neighbours: 2,
            isAlive: false
        };

        const alive = isDeadBecomingAlive(deadCell.neighbours);

        expect(alive).toEqual(false);
    });
});

