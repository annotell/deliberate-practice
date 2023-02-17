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
      row.push(
        value === '*'
          ? { isAlive: true, id: { x: rowIndex, y: columnIndex } }
          : { isAlive: false, id: { x: rowIndex, y: columnIndex } }
      );
    }
    cells.push(row);
  }

  return { cells: cells };
}

export function simulateStep(grid: Grid): Grid {
  const cells: Cell[][] = grid.cells.map(row =>
    row.map((cell): Cell => {
      const neighbours = countNeighbours(grid, cell);
      const tempCell = {
        id: { x: cell.id.x, y: cell.id.y },
        neighbours,
        isAlive: cell.isAlive,
      };
      const isAlive = isAliveInNextStep(tempCell, neighbours);
      return { id: { x: cell.id.x, y: cell.id.y }, isAlive };
    })
  );
  return { cells: cells };
}

export function printGrid(grid: Grid): string {
  const cellPrinter = (cell: Cell) => (cell.isAlive ? '*' : '.');
  const rowPrinter = (row: Cell[]) => row.map(cellPrinter).join('');
  return grid.cells.map(rowPrinter).join('\n');
}

export function countNeighbours(grid: Grid, currentCell: Cell) {
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
