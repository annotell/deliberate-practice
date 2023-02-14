import {describe, expect, it} from "vitest";

type Cell = {
    neighbours: number
    isAlive: boolean
};

type Grid = {
    cells: Cell[][]
};

function isAliveStayingAlive(neighbours: number): boolean {
    return neighbours === 2 || neighbours === 3;
};

function isDeadBecomingAlive(neighbours: number) {
    return neighbours === 3;
};

function isAliveInNextStep(cell: Cell): boolean {
    const {isAlive, neighbours} = cell;
    return isAlive ? isAliveStayingAlive(neighbours) : isDeadBecomingAlive(neighbours);
};

function parseInput(input: string): Grid {
    for(const c in input) {

    }
    return {} as Grid;
};

function simulateStep(grid: Grid): Grid {
    return grid;
};

function printGrid(grid: Grid): string {
    let cellPrinter = (cell: Cell) => cell.isAlive ? "*" : ".";
    let rowPrinter = (row: Cell[]) => row.map(cellPrinter).join("");
    return grid.cells.map(rowPrinter).join('\n');
}

describe("Print", () => {
    it("Print 1x1 living cell", () => {
        const cell: Cell = {isAlive: true, neighbours: 0};
        const row: Cell[] = [cell];
        const cells: Cell[][] = [row];
        const grid: Grid = {cells: cells};

        expect(printGrid(grid)).matchSnapshot();
    });

    it("Print 2x1 living grid", () => {
        const cell: Cell = {isAlive: true, neighbours: 0};
        const row: Cell[] = [cell, cell];
        const cells: Cell[][] = [row];
        const grid: Grid = {cells: cells};

        expect(printGrid(grid)).matchSnapshot();
    });

    it("Print 1x2 living grid", () => {
        const cell: Cell = {isAlive: true, neighbours: 0};
        const row: Cell[] = [cell];
        const cells: Cell[][] = [row, row];
        const grid: Grid = {cells: cells};

        expect(printGrid(grid)).matchSnapshot();
    });

    it("Print grid 2x1 with one living and one dead cell", () => {
        const livingCell: Cell = {isAlive: true, neighbours: 0};
        const deadCell: Cell = {isAlive: false, neighbours: 0};
        const row: Cell[] = [livingCell, deadCell];
        const cells: Cell[][] = [row];
        const grid: Grid = {cells: cells};

        expect(printGrid(grid)).matchSnapshot();
    });
});

// describe("Simulate", () => {
//     it("One cell one step", () => {
//         const grid = parseInput("*")
//         const nextGrid = simulateStep(grid)
//         expect(printGrid(nextGrid)).toMatchSnapshot()
//     });
// });

describe("Grid", () => {

    it("Parses 1x1 grid", () => {
        const initialState: string = `*`;

        const grid = parseInput(initialState);

        expect(printGrid(grid)).matchSnapshot();
    });

    it.skip("Parsing initial state", () => {
        const initialState: string =
            `
        ...
        .*.
        `;

        const grid = parseInput(initialState);

        expect(printGrid(grid)).matchSnapshot();
    });

    it.skip("Simulate one step", () => {
        const initialState: string =
        `
        ...
        .*.
        `;

        const grid = parseInput(initialState);
        const nextGrid = simulateStep(grid);

        expect(nextGrid).matchSnapshot();
    });

});


// describe("Cell behaviour", () => {
//     it("A living cell with two neighbour lives on", () => {
//         const liveCell: Cell = {
//             neighbours: 2,
//             isAlive: true
//         };

//         const alive = isAliveInNextStep(liveCell);

//         expect(alive).toEqual(true);
//     });

//     it("A dead cell with two neighbours stays dead", () => {
//         const deadCell: Cell = {
//             neighbours: 2,
//             isAlive: false
//         };

//         const alive = isAliveInNextStep(deadCell);

//         expect(alive).toEqual(false);
//     });
// });

// describe("Rules", () => {
//     it("Live cell with fewer than two neighbours dies", () => {
//         const neighbours = 1;

//         const alive = isAliveStayingAlive(neighbours);

//         expect(alive).toEqual(false);
//     });

//     it.each([2, 3])("Any live cell with two or three live neighbours lives", (neighbours: number) => {
//         const alive = isAliveStayingAlive(neighbours);

//         expect(alive).toEqual(true);
//     });


//     it.each([4, 5])("Any live cell with more than three live neighbours dies", (neighbours) => {
//         const alive = isAliveStayingAlive(neighbours);

//         expect(alive).toEqual(false);
//     });

//     it("Any dead cell with exactly three live neighbours becomes a live cell", () => {
//         const neighbours = 3;

//         const alive = isDeadBecomingAlive(neighbours);

//         expect(alive).toEqual(true);
//     });

//     it("Any dead cell without three live neighbours stays dead", () => {
//         const neighbours = 2;

//         const alive = isDeadBecomingAlive(neighbours);

//         expect(alive).toEqual(false);
//     });
// });

