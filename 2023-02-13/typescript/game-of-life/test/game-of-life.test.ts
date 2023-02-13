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

function checkCellLifeStatus(cell: Cell) {
    return isAliveStayingAlive(cell.neighbours);
}

describe("Cell behaviour", () => {
    it("A living cell with only one neighbour dies", () => {
        const liveCell: Cell = {
            neighbours: 1,
            isAlive: true
        };

        const alive = checkCellLifeStatus(liveCell);

        expect(alive).toEqual(false);
    });

    it("A dead cell with only one neighbour stays dead", () => {
        const deadCell: Cell = {
            neighbours: 1,
            isAlive: false
        };

        const dead = checkCellLifeStatus(deadCell);

        expect(dead).toEqual(true);
    });
})

describe("Rules", () => {
    it("Live cell with fewer than two neighbours dies", () => {
        const neighbours = 1;

        const alive = isAliveStayingAlive(neighbours);

        expect(alive).toEqual(false);
    });

    it.each([2, 3])("Any live cell with two or three live neighbours lives", (neighbours: number) => {
        const alive = isAliveStayingAlive(neighbours);

        expect(alive).toEqual(true);
    });


    it.each([4, 5])("Any live cell with more than three live neighbours dies", (neighbours) => {
        const alive = isAliveStayingAlive(neighbours);

        expect(alive).toEqual(false);
    });

    it("Any dead cell with exactly three live neighbours becomes a live cell", () => {
        const neighbours = 3;

        const alive = isDeadBecomingAlive(neighbours);

        expect(alive).toEqual(true);
    });

    it("Any dead cell without three live neighbours stays dead", () => {
        const neighbours = 2;
            
        const alive = isDeadBecomingAlive(neighbours);

        expect(alive).toEqual(false);
    });
});

