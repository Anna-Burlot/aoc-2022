const input = await Deno.readTextFile('./input.txt');
const testInput = await Deno.readTextFile('./testInput.txt');

// const getRange = (start: number, end: number) => {
//   const length = end - start + 1;
//   return Array.from({ length }, (_, i) => start + i);
// };

const getTotalFullyContainedRanges = (input: string): number => {
  const pairs = input.split('\n');

  const fullyContainedRanges = pairs.filter((pair) => {
    const rangesStartAndEnd = pair.split(',').map((range) => {
      const [startRange, endRange] = range
        .split('-')
        .map((item) => parseInt(item));

      return [startRange, endRange];
    });

    const isSecondRangeContainedInFirst =
      rangesStartAndEnd[0][0] <= rangesStartAndEnd[1][0] &&
      rangesStartAndEnd[0][1] >= rangesStartAndEnd[1][1];

    const isFirstRangeContainedInSecond =
      rangesStartAndEnd[0][0] >= rangesStartAndEnd[1][0] &&
      rangesStartAndEnd[0][1] <= rangesStartAndEnd[1][1];

    if (isSecondRangeContainedInFirst || isFirstRangeContainedInSecond) {
      return true;
    }
    return false;
  });

  return fullyContainedRanges.length;
};

console.log(getTotalFullyContainedRanges(input));
console.log(getTotalFullyContainedRanges(testInput) === 2);
