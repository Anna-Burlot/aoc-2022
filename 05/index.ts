const input = await Deno.readTextFile('./input.txt');
const testInput = await Deno.readTextFile('./testInput.txt');

// [ [ "", "D", "" ], [ "N", "C", "" ], [ "Z", "M", "P" ] ]
// turned to
// [ [ "", "N", "Z" ], [ "D", "C", "M" ], [ "", "", "P" ] ]
const organizeByColumns = (rowsAndColumns: string[][]): string[][] => {
  let newTable: string[][] = [];
  for (let i = 0; i < rowsAndColumns[0].length; i++) {
    let column: string[] = [];
    rowsAndColumns.map((row) => {
      column = [...column, row[i]];
    });
    newTable = [...newTable, column];
  }

  const removeEmptySpaces = newTable.map((column) =>
    column.filter((item) => item.length > 0)
  );

  return removeEmptySpaces;
};

const readInstructions = (instruction: string) => {
  const [amountToMove, originColumn, targetColumn] = instruction
    .match(/^\d+|\d+\b|\d+(?=\w)/g)!
    .map((number) => parseInt(number));
  return { amountToMove, originColumn, targetColumn };
};

const executeInstructions = (instructions: string[], stacks: string[][]) => {
  let newTable: string[][] = [...stacks];

  instructions.map((instruction) => {
    const { amountToMove, originColumn, targetColumn } =
      readInstructions(instruction);
    const cratesToMove = newTable[originColumn - 1].slice(0, amountToMove);

    newTable = newTable.map((stack, index) => {
      let newStack = [...stack];
      // case origin column
      if (index === originColumn - 1) {
        newStack = newStack.filter((crave, index) => index > amountToMove - 1);
      }
      // case target column
      if (index === targetColumn - 1) {
        newStack = [...cratesToMove.reverse(), ...newStack];
      }
      return newStack;
    });
  });

  return newTable;
};

const getTopCrateOfEachStack = (input: string): string => {
  const [stacksWithNumber, instructions] = input.split('\n\n');
  const divideByRows = stacksWithNumber.split('\n');
  const stacksRows = divideByRows.slice(0, divideByRows.length - 1);
  const divideRowsByColumns = stacksRows.map((row) => {
    const splitByColumn = row.match(/.{1,4}/g);
    return splitByColumn!.map((columnItem) =>
      columnItem.replace(/[\[\]&]+/g, '').replace(/ /g, '')
    );
  });

  const organizedByColumn = organizeByColumns(divideRowsByColumns);

  const instructionsArray = instructions.split('\n');
  const finalStacks = executeInstructions(instructionsArray, organizedByColumn);

  const topOfEachStack = finalStacks.map((stack) => stack[0]).join('');

  return topOfEachStack;
};

console.log(getTopCrateOfEachStack(input));
console.log(getTopCrateOfEachStack(testInput) === 'CMZ');
