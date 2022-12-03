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

  return misplacedItemsPriorities.reduce((prev, curr) => prev + curr);
};

const getSumOfPrioritiesOfBadges = (input: string): number => {
  const badgeByGroup = input.split('\n');

  let groups: string[][][] = [];

  for (let i = 0; i < badgeByGroup.length; i += 3) {
    const group = badgeByGroup.slice(i, i + 3).map((elf) => elf.split(''));
    groups = [...groups, group];
  }

  const groupsBadgeLetters = groups
    .map((group) => {
      const groupBadgeLetter = group.reduce((a, b) =>
        a.filter((c) => b.includes(c))
      );
      const uniqueGroupBadgeLetter = groupBadgeLetter.filter(
        (item, index) => groupBadgeLetter.indexOf(item) === index
      );
      return uniqueGroupBadgeLetter;
    })
    .flat();

  return groupsBadgeLetters
    .map((letter) => getPriorityByLetter(letter))
    .reduce((prev, curr) => prev + curr);
};

console.log(getSumOfPriorities(input));
console.log(getSumOfPrioritiesOfBadges(input));
console.log(getSumOfPrioritiesOfBadges(testInput) === 70);
