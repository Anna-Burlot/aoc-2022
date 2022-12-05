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

  console.log(organizedByColumn);

  return '';
};

getTopCrateOfEachStack(testInput);
// console.log(getTopCrateOfEachStack(testInput));
// console.log(getTopCrateOfEachStack(testInput) === 'CMZ');
