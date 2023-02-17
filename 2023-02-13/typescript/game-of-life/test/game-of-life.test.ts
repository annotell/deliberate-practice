import { describe, expect, it } from 'vitest';

type Cell = {
  neighbours: number;
  isAlive: boolean;
  id: { x: number; y: number };
};

type Grid = {
  cells: Cell[][];
};

function isAliveStayingAlive(neighbours: number): boolean {
  return neighbours === 2 || neighbours === 3;
}

function isDeadBecomingAlive(neighbours: number) {
  return neighbours === 3;
}

function isAliveInNextStep(cell: Cell): boolean {
  const { isAlive, neighbours } = cell;
  return isAlive ? isAliveStayingAlive(neighbours) : isDeadBecomingAlive(neighbours);
}

function parseInput(input: string): Grid {
  const inputRows = input.split('\n');
  const cells: Cell[][] = [];

  for (let rowIndex = 0; rowIndex < inputRows.length; rowIndex++) {
    const row: Cell[] = [];
    for (let columnIndex = 0; columnIndex < inputRows[rowIndex].length; columnIndex++) {
      const value = inputRows[rowIndex].at(columnIndex);
      row.push(
        value === '*'
          ? { isAlive: true, neighbours: 0, id: { x: rowIndex, y: columnIndex } }
          : { isAlive: false, neighbours: 0, id: { x: rowIndex, y: columnIndex } }
      );
    }
    cells.push(row);
  }

  return { cells: cells };
}

function simulateStep(grid: Grid): Grid {
  const cells: Cell[][] = grid.cells.map(row =>
    row.map(cell => {
      const neighbours = countNeighbours(grid, cell);
      const tempCell = {
        id: { x: cell.id.x, y: cell.id.y },
        neighbours,
        isAlive: cell.isAlive,
      } as Cell;
      const isAlive = isAliveInNextStep(tempCell);
      return { id: { x: cell.id.x, y: cell.id.y }, neighbours, isAlive } as Cell;
    })
  );
  return { cells: cells };
}

function printGrid(grid: Grid): string {
  const cellPrinter = (cell: Cell) => (cell.isAlive ? '*' : '.');
  const rowPrinter = (row: Cell[]) => row.map(cellPrinter).join('');
  return grid.cells.map(rowPrinter).join('\n');
}

function countNeighbours(grid: Grid, currentCell: Cell) {
  const aliveCells = grid.cells.map(row => {
    return row.filter(cell => {
      const cellWithinNeighbourDistanceForRow =
        currentCell.id.x - 1 <= cell.id.x && cell.id.x <= currentCell.id.x + 1;
      const cellWithinNeighbourDistanceForColumn =
        currentCell.id.y - 1 <= cell.id.y && cell.id.y <= currentCell.id.y + 1;

      if (cellWithinNeighbourDistanceForRow) {
        if (cellWithinNeighbourDistanceForColumn) {
          return cell !== currentCell ? cell.isAlive : false;
        }
      }
      return false;
    });
  });
  return aliveCells.map(row => row.length).reduce((a, b) => a + b);
}

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
    const liveCell: Cell = {
      neighbours: 2,
      isAlive: true,
      id: { x: 0, y: 0 },
    };

    const alive = isAliveInNextStep(liveCell);

    expect(alive).toEqual(true);
  });

  it('A dead cell with two neighbours stays dead', () => {
    const deadCell: Cell = {
      neighbours: 2,
      isAlive: false,
      id: { x: 0, y: 0 },
    };

    const alive = isAliveInNextStep(deadCell);

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
