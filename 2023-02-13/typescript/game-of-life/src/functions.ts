export type Cell = {
  isAlive: boolean;
  id: { x: number; y: number };
};

export type Grid = {
  cells: Cell[][];
};

export function isAliveStayingAlive(neighbours: number): boolean {
  return neighbours === 2 || neighbours === 3;
}

export function isDeadBecomingAlive(neighbours: number) {
  return neighbours === 3;
}

export function isAliveInNextStep(cell: Cell, neighbours: number): boolean {
  const { isAlive } = cell;
  return isAlive ? isAliveStayingAlive(neighbours) : isDeadBecomingAlive(neighbours);
}

export function parseInput(input: string): Grid {
  const inputRows = input.split('\n');
  const cells: Cell[][] = [];

  for (let rowIndex = 0; rowIndex < inputRows.length; rowIndex++) {
    const row: Cell[] = [];
    for (let columnIndex = 0; columnIndex < inputRows[rowIndex].length; columnIndex++) {
      const value = inputRows[rowIndex].at(columnIndex);
      const id = { x: rowIndex, y: columnIndex };
      row.push(value === '*' ? { isAlive: true, id: id } : { isAlive: false, id: id });
    }
    cells.push(row);
  }

  return { cells: cells };
}

export function simulateStep(grid: Grid): Grid {
  const cells: Cell[][] = grid.cells.map(row =>
    row.map((cell): Cell => {
      const neighbours = countNeighbours(grid, cell);
      const id = { x: cell.id.x, y: cell.id.y };
      const isAlive = isAliveInNextStep(
        {
          isAlive: cell.isAlive,
          id: id,
        },
        neighbours
      );
      return { id: id, isAlive: isAlive };
    })
  );
  return { cells: cells };
}

export function printGrid(grid: Grid): string {
  const cellPrinter = (cell: Cell) => (cell.isAlive ? '*' : '.');
  const rowPrinter = (row: Cell[]) => row.map(cellPrinter).join('');
  return grid.cells.map(rowPrinter).join('\n');
}

function isWithinRange(cell: number, neighbour: number): boolean {
  return cell - 1 <= neighbour && neighbour <= cell + 1;
}

export function countNeighbours(grid: Grid, currentCell: Cell) {
  const aliveCells = grid.cells.map(row => {
    return row.filter(cell => {
      if (cell === currentCell) return false;
      if (!isWithinRange(currentCell.id.x, cell.id.x)) return false;
      if (!isWithinRange(currentCell.id.y, cell.id.y)) return false;

      return cell.isAlive;
    });
  });
  return aliveCells.map(row => row.length).reduce((a, b) => a + b);
}
