// deno-lint-ignore-file
const input = await Deno.readTextFile('./input.txt');
const testInput = await Deno.readTextFile('./testInput.txt');

const getVisibleTrees = (input: string) => {
  const byRow = input.split('\n');
  const allTrees = byRow.map((row) => {
    const byColumns = row.split('');
    return byColumns.map((column) => column);
  });

  const visibleTrees = allTrees.map((treeRow, treeRowIndex) => {
    return treeRow.filter((tree, treeIndex) => {
      if (
        treeRowIndex === 0 ||
        treeRowIndex === allTrees.length - 1 ||
        treeIndex === 0 ||
        treeIndex === treeRow.length - 1
      ) {
        return true;
      }
      const isVisibleLeft = allTrees[treeRowIndex]
        .slice(0, treeIndex)
        .every((treeInRow) => treeInRow < tree);
      if (isVisibleLeft) {
        return true;
      }

      const isVisibleRight = allTrees[treeRowIndex]
        .slice(treeIndex + 1, treeRow.length)
        .every((treeInRow) => treeInRow < tree);
      if (isVisibleRight) {
        return true;
      }

      const currentTreeColumn = allTrees.map((row) => row[treeIndex]);

      const isVisibleTop = currentTreeColumn
        .slice(0, treeRowIndex)
        .every((treeInColumn) => treeInColumn < tree);
      if (isVisibleTop) {
        return true;
      }

      const isVisibleBottom = currentTreeColumn
        .slice(treeRowIndex + 1, currentTreeColumn.length)
        .every((treeInColumn) => treeInColumn < tree);
      if (isVisibleBottom) {
        return true;
      }

      return false;
    });
  });

  return visibleTrees.flat().length;
};

console.log(getVisibleTrees(testInput) === 21);
console.log(getVisibleTrees(input));
