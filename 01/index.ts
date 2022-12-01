const input = await Deno.readTextFile('./input.txt');
const testInput = await Deno.readTextFile('./testInput.txt');

export const getTotalCaloriesToThreeElves = (input: string) => {
  // divide by elf using /n/n
  const elvesArray = input.split('\n\n');

  // add up each elf calories to get total
  const totalCaloriesByElf = elvesArray.map((elf) => {
    const caloriesArray = elf.split('\n');
    return caloriesArray
      .map((calory) => parseInt(calory))
      .reduce((prevValue, currValue) => prevValue + currValue);
  });

  // get top three elves and get total
  const firstElfWithMoreCalories = totalCaloriesByElf
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((prevValue, currValue) => prevValue + currValue);

  // return total calories of top three elves
  return firstElfWithMoreCalories;
};

// test
console.log(getTotalCaloriesToThreeElves(testInput) === 45000);

// result
console.log(getTotalCaloriesToThreeElves(input));
