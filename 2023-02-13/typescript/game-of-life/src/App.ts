import { Grid, parseInput, printGrid, simulateStep } from './functions';

async function App() {
  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const input = '.......\n.......\n...*...\n..***..\n.......\n.......\n.......\n';
  const grid = parseInput(input);
  let nextGrid: Grid = simulateStep(grid);
  let generation = 1;
  while (true) {
    console.log(`Generation ${generation}:\n${printGrid(nextGrid)}\n`);
    await delay(1000);
    generation++;
    nextGrid = simulateStep(nextGrid);
  }
}

App();
