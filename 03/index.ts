const input = await Deno.readTextFile('./input.txt');
const testInput = await Deno.readTextFile('./testInput.txt');

const getMisplacedItemInRucksack = (rucksack: string) => {
  const firstCompartment = rucksack.slice(0, rucksack.length / 2).split('');
  const secondCompartment = rucksack
    .slice(rucksack.length / 2, rucksack.length)
    .split('');

  const identicalItem = firstCompartment.find((element) =>
    secondCompartment.includes(element)
  );

  return identicalItem;
};

const getPriorityByLetter = (letter: string): number => {
  if (letter === letter.toLowerCase()) {
    return letter.charCodeAt(0) - 96;
  }

  return letter.toLowerCase().charCodeAt(0) - 70;
};

const getSumOfPriorities = (input: string): number => {
  const misplacedItemsPriorities = input.split('\n').map((rucksack) => {
    const misplacedItem = getMisplacedItemInRucksack(rucksack);

    return misplacedItem ? getPriorityByLetter(misplacedItem) : 0;
  });

  // calculate priority of that letter
  return misplacedItemsPriorities.reduce((prev, curr) => prev + curr);
};

console.log(getSumOfPriorities(input));
