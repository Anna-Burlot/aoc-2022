const input = await Deno.readTextFile('./input.txt');
const testInput = await Deno.readTextFile('./testInput.txt');

export const getElfToAsk = (input: string) => {
  // divide by elf using /n/n
  const elvesArray = input.split('\n\n');

  // add up each elf calories to get total
  const totalCaloriesByElf = elvesArray.map((elf) => {
    const caloriesArray = elf.split('\n');
    return caloriesArray
      .map((calory) => parseInt(calory))
      .reduce((prevValue, currValue) => prevValue + currValue);
  });

  // compare between elves
  const elfWithMoreCalories = Math.max(...totalCaloriesByElf);

  // return elf with more calories
  return elfWithMoreCalories;
};

// test
console.log(getElfToAsk(testInput) === 24000);

console.log(getElfToAsk(input));
