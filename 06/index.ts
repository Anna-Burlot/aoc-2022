const input = await Deno.readTextFile('./input.txt');
const testInput = await Deno.readTextFile('./testInput.txt');

const getFirstMarkerCharacterNumber = (input: string): number => {
  const characterArray = input.split('');
  const potentialMarkerIndexes = characterArray.map((character, index) => {
    if (index < 3) {
      return;
    }
    const potentialMarker = [...characterArray.slice(index - 3, index + 1)];
    const duplicates = potentialMarker.filter(
      (item, index) => potentialMarker.indexOf(item) != index
    );
    if (duplicates.length === 0) {
      return index;
    }
  });

  const firstMarkerIndex = potentialMarkerIndexes.find((index) => index);

  return firstMarkerIndex ? firstMarkerIndex + 1 : 0;
};

console.log(getFirstMarkerCharacterNumber(testInput));
console.log(getFirstMarkerCharacterNumber(testInput) === 11);
