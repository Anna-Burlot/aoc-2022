const input = await Deno.readTextFile('./input.txt');
const testInput = await Deno.readTextFile('./testInput.txt');

type OpponentOptions = 'A' | 'B' | 'C';
type MyOptions = 'X' | 'Y' | 'Z';
type Round = [OpponentOptions, MyOptions];
type Shape = 'Rock' | 'Paper' | 'Scissors';
type Outcome = 0 | 3 | 6;

const opponentOptions = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
};

const myOptions = {
  X: 'Rock',
  Y: 'Paper',
  Z: 'Scissors',
};

const scoreByShape = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
};

// lost: 0 ; draw: 3; win: 6;

const getOutcomeOfRound = (round: Round): Outcome => {
  const opponentShape = opponentOptions[round[0]];
  const myShape = myOptions[round[1]];

  if (myShape === opponentShape) return 3;

  if (
    (myShape === 'Rock' && opponentShape === 'Scissors') ||
    (myShape === 'Scissors' && opponentShape === 'Paper') ||
    (myShape === 'Paper' && opponentShape === 'Rock')
  ) {
    return 6;
  }

  return 0;
};

const calculateScore = (outcome: Outcome, shape: Shape): number => {
  return outcome + scoreByShape[shape];
};

const getTotalScore = (input: string): number => {
  const splitByRound = input.split('\n');
  const splitByRoundWithScore = splitByRound.map((round) => {
    const roundByPlayer: Round = round.split(' ');
    const outcome = getOutcomeOfRound(roundByPlayer);
    const score = calculateScore(outcome, myOptions[roundByPlayer[1]]);
    return score;
  });

  const totalScore = splitByRoundWithScore.reduce((prev, curr) => prev + curr);

  return totalScore;
};

console.log(getTotalScore(testInput) === 15);
console.log(getTotalScore(input));
