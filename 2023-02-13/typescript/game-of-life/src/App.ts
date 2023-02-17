import * as fs from 'fs';
import { Grid, parseInput, printGrid, simulateStep } from './functions';

async function App() {
  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const input = fs.readFileSync('./foo.txt', 'utf8');
  const grid = parseInput(input);
  let nextGrid: Grid = simulateStep(grid);
  let generation = 1;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    console.log(`Generation ${generation}:\n${printGrid(nextGrid)}\n`);
    await delay(1000);
    generation++;
    nextGrid = simulateStep(nextGrid);
  }
}

App();
