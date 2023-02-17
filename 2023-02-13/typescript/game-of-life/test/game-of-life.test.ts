import { describe, expect, it } from 'vitest';
import {
  Cell,
  countNeighbours,
  Grid,
  isAliveInNextStep,
  isAliveStayingAlive,
  isDeadBecomingAlive,
  parseInput,
  printGrid,
  simulateStep,
} from '../src/functions';

describe('Simulate', () => {
  it('One live cell', () => {
    const grid = parseInput('*');
    const nextGrid = simulateStep(grid);
    expect(printGrid(nextGrid)).toMatchSnapshot();
  });

  it('Dash shaped grid 2x1', () => {
    const grid = parseInput('**');
    const nextGrid = simulateStep(grid);
    expect(printGrid(nextGrid)).toMatchSnapshot();
  });

  it('I shaped grid 1x2', () => {
    const grid = parseInput('*\n*');
    const nextGrid = simulateStep(grid);
    expect(printGrid(nextGrid)).toMatchSnapshot();
  });

  it('Dash shaped grid 3x1', () => {
    const grid = parseInput('***');
    const nextGrid = simulateStep(grid);
    expect(printGrid(nextGrid)).toMatchSnapshot();
  });

  it('Grid 2x2, one dead', () => {
    const grid = parseInput('.*\n**');
    const nextGrid = simulateStep(grid);
    expect(printGrid(nextGrid)).toMatchSnapshot();
  });

  it('Grid 3x2, one dead', () => {
    const grid = parseInput('.*\n**\n**');
    const nextGrid = simulateStep(grid);
    expect(printGrid(nextGrid)).toMatchSnapshot();
  });

  it('Grid 3x2, one dead, 2 steps', () => {
    const grid = parseInput('.*\n**\n**');
    const nextGrid = simulateStep(grid);
    const secondGrid = simulateStep(nextGrid);
    expect(printGrid(secondGrid)).toMatchSnapshot();
  });
});

describe('Neighbour counting', () => {
  // # 0 neighbours
  // 1   -  "  -
  // 2   -  "  -
  it('grid 1x1, alive cell', () => {
    const grid = parseInput('*');
    const cell = grid.cells[0][0];
    const neighbourCount = countNeighbours(grid, cell);
    expect(neighbourCount).toEqual(0);
  });

  it('grid 2x1, alive cells', () => {
    const grid = parseInput('**');
    const cell = grid.cells[0][0];
    const neighbourCount = countNeighbours(grid, cell);
    expect(neighbourCount).toEqual(1);
  });

  it('grid 2x1, dead cells', () => {
    const grid = parseInput('..');
    const cell = grid.cells[0][0];
    const neighbourCount = countNeighbours(grid, cell);
    expect(neighbourCount).toEqual(0);
  });

  it('grid 2x1, one alive, one dead cell', () => {
    const grid = parseInput('*.');
    const cell = grid.cells[0][0];
    const neighbourCount = countNeighbours(grid, cell);
    expect(neighbourCount).toEqual(0);
  });

  it('grid 1x2, alive', () => {
    const grid = parseInput('*\n*');
    const cell = grid.cells[0][0];
    const neighbourCount = countNeighbours(grid, cell);
    expect(neighbourCount).toEqual(1);
  });

  it('grid 1x2, one alive, one dead', () => {
    const grid = parseInput('*\n.');
    const cell = grid.cells[0][0];
    const neighbourCount = countNeighbours(grid, cell);
    expect(neighbourCount).toEqual(0);
  });

  it('grid 3x1, alive, dead, alive', () => {
    const grid = parseInput('*.*');
    const cell = grid.cells[0][0];
    const neighbourCount = countNeighbours(grid, cell);
    expect(neighbourCount).toEqual(0);
  });

  it('grid 3x3, alive line in middle', () => {
    const grid = parseInput('.*.\n.*.\n.*.');
    const cell = grid.cells[0][0];
    const neighbourCount = countNeighbours(grid, cell);
    expect(neighbourCount).toEqual(2);
  });
});

describe('Parser', () => {
  it('Parses 1x1 grid', () => {
    const initialState = '*';
    const grid = parseInput(initialState);
    expect(printGrid(grid)).matchSnapshot();
  });

  it('Parses 2x1 grid', () => {
    const initialState = '**';
    const grid = parseInput(initialState);
    expect(printGrid(grid)).matchSnapshot();
  });

  it('Parses 1x2 grid', () => {
    const initialState = '*\n*';
    const grid = parseInput(initialState);
    expect(printGrid(grid)).matchSnapshot();
  });

  it('Parses 2x1 grid, one cell alive and one cell dead', () => {
    const initialState = '*.';
    const grid = parseInput(initialState);
    expect(printGrid(grid)).matchSnapshot();
  });

  it('Parsing initial state', () => {
    const initialState = '...\n.*.';
    const grid = parseInput(initialState);
    expect(printGrid(grid)).matchSnapshot();
  });
});

describe('Print', () => {
  it('Print 1x1 living cell', () => {
    const cell: Cell = { isAlive: true, neighbours: 0, id: { x: 0, y: 0 } };
    const row: Cell[] = [cell];
    const cells: Cell[][] = [row];
    const grid: Grid = { cells: cells };

    expect(printGrid(grid)).matchSnapshot();
  });

  it('Print 2x1 living grid', () => {
    const cell: Cell = { isAlive: true, neighbours: 0, id: { x: 0, y: 0 } };
    const row: Cell[] = [cell, cell];
    const cells: Cell[][] = [row];
    const grid: Grid = { cells: cells };

    expect(printGrid(grid)).matchSnapshot();
  });

  it('Print 1x2 living grid', () => {
    const cell: Cell = { isAlive: true, neighbours: 0, id: { x: 0, y: 0 } };
    const row: Cell[] = [cell];
    const cells: Cell[][] = [row, row];
    const grid: Grid = { cells: cells };

    expect(printGrid(grid)).matchSnapshot();
  });

  it('Print grid 2x1 with one living and one dead cell', () => {
    const livingCell: Cell = {
      isAlive: true,
      neighbours: 0,
      id: { x: 0, y: 0 },
    };
    const deadCell: Cell = {
      isAlive: false,
      neighbours: 0,
      id: { x: 0, y: 0 },
    };
    const row: Cell[] = [livingCell, deadCell];
    const cells: Cell[][] = [row];
    const grid: Grid = { cells: cells };

    expect(printGrid(grid)).matchSnapshot();
  });
});

describe('Cell behaviour', () => {
  it('A living cell with two neighbour lives on', () => {
    const neighbours = 2;
    const liveCell: Cell = {
      isAlive: true,
      neighbours,
      id: { x: 0, y: 0 },
    };

    const alive = isAliveInNextStep(liveCell, neighbours);

    expect(alive).toEqual(true);
  });

  it('A dead cell with two neighbours stays dead', () => {
    const neighbours = 2;
    const deadCell: Cell = {
      neighbours,
      isAlive: false,
      id: { x: 0, y: 0 },
    };

    const alive = isAliveInNextStep(deadCell, neighbours);

    expect(alive).toEqual(false);
  });
});

describe('Rules', () => {
  it('Live cell with fewer than two neighbours dies', () => {
    const neighbours = 1;
    const alive = isAliveStayingAlive(neighbours);
    expect(alive).toEqual(false);
  });

  it.each([2, 3])(
    'Any live cell with two or three live neighbours lives',
    (neighbours: number) => {
      const alive = isAliveStayingAlive(neighbours);
      expect(alive).toEqual(true);
    }
  );

  it.each([4, 5])(
    'Any live cell with more than three live neighbours dies',
    neighbours => {
      const alive = isAliveStayingAlive(neighbours);
      expect(alive).toEqual(false);
    }
  );

  it('Any dead cell with exactly three live neighbours becomes a live cell', () => {
    const neighbours = 3;
    const alive = isDeadBecomingAlive(neighbours);
    expect(alive).toEqual(true);
  });

  it('Any dead cell without three live neighbours stays dead', () => {
    const neighbours = 2;
    const alive = isDeadBecomingAlive(neighbours);
    expect(alive).toEqual(false);
  });
});
