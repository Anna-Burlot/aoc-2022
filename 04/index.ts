const input = await Deno.readTextFile('./input.txt');
const testInput = await Deno.readTextFile('./testInput.txt');

const getRange = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

const getTotalFullyContainedRanges = (input: string): number => {
  const pairs = input.split('\n');

  const overlappingRanges = pairs.filter((pair) => {
    const ranges = pair.split(',').map((range) => {
      const [startRange, endRange] = range
        .split('-')
        .map((item) => parseInt(item));

      return getRange(startRange, endRange);
    });

    return ranges[0].find((number) => ranges[1].includes(number));
  });

  return overlappingRanges.length;
};

console.log(getTotalFullyContainedRanges(input));
console.log(getTotalFullyContainedRanges(testInput) === 4);
