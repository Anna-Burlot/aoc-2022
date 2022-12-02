const input = await Deno.readTextFile('./input.txt');
const testInput = await Deno.readTextFile('./testInput.txt');

const opponentOptions = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
};

const outcomeOptions = {
  X: 0,
  Y: 3,
  Z: 6,
};

const scoreByShape = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
};

// lost: 0 ; draw: 3; win: 6;

const getShapeToPlay = (round) => {
  const opponentShape = opponentOptions[round[0]];
  const expectedOutcome = outcomeOptions[round[1]];

  if (expectedOutcome === 0) {
    // lose
    switch (opponentShape) {
      case 'Rock':
        return 'Scissors';
      case 'Paper':
        return 'Rock';
      case 'Scissors':
        return 'Paper';
    }
  }

  if (expectedOutcome === 6) {
    // win
    switch (opponentShape) {
      case 'Rock':
        return 'Paper';
      case 'Paper':
        return 'Scissors';
      case 'Scissors':
        return 'Rock';
    }
  }

  return opponentShape;
};

const calculateScore = (outcome, shape) => {
  return outcome + scoreByShape[shape];
};

const getTotalScore = (input) => {
  const splitByRound = input.split('\n');

  const splitByRoundWithScore = splitByRound.map((round) => {
    const roundByPlayer = round.split(' ');
    const shapeToPlay = getShapeToPlay(roundByPlayer);
    return calculateScore(outcomeOptions[roundByPlayer[1]], shapeToPlay);
  });

  const totalScore = splitByRoundWithScore.reduce((prev, curr) => prev + curr);

  return totalScore;
};

console.log(getTotalScore(testInput) === 12);
console.log(getTotalScore(input));
