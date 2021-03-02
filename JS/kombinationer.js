function update(terninger) {
  onesToSixes(terninger, 1);
  onesToSixes(terninger, 2);
  onesToSixes(terninger, 3);
  onesToSixes(terninger, 4);
  onesToSixes(terninger, 5);
  onesToSixes(terninger, 6);
  onePair(terninger);
  twoPairs(terninger);
  threeSame(terninger);
  fourSame(terninger);
  fullHouse(terninger);
  smallStraight(terninger);
  largeStraight(terninger);
  chance(terninger);
  yatzy(terninger);
}

function calcCounts(terninger) {
  let counts = [];
  for (let i = 1; i < 7; i++) {
    counts[i] = 0;
  }
  for (let i = 0; i < terninger.length; i++) {
    counts[terninger[i]]++;
  }
  return counts;
}

function onesToSixes(terninger, number) {
  let total = 0;
  for (let i = 0; i < terninger.length; i++) {
    if (terninger[i] === number) {
      total += terninger[i];
    }
  }
  holdPoints(number, total);
}

function onePair(terninger) {
  let total = 0;
  let counts = calcCounts(terninger);
  for (let i = 0; i < counts.length; i++) {
    if (counts[i] > 1) {
      if (total < i * 2) {
        total = i * 2;
      }
    }
  }
  holdPoints(9, total);
}

function twoPairs(terninger) {
  counts = calcCounts(terninger);
  let total = 0;
  let highPair = 0;
  let nextPair = 0;
  for (let i = 0; i < counts.length; i++) {
    if (counts[i] > 1) {
      if (i * 2 > highPair) {
        nextPair = highPair;
        highPair = i * 2;
      }
    }
  }
  if (nextPair != 0 && highPair != 0) {
    total = nextPair + highPair;
  }
  holdPoints(10, total);
}

function threeSame(terninger) {
  let total = 0;
  let counts = calcCounts(terninger);
  for (let i = 0; i < counts.length; i++) {
    if (counts[i] > 2) {
      total = i * 3;
    }
  }
  holdPoints(11, total);
}

function fourSame(terninger) {
  let total = 0;
  let counts = calcCounts(terninger);
  for (let i = 0; i < counts.length; i++) {
    if (counts[i] > 3) {
      total = i * 4;
    }
  }
  holdPoints(12, total);
}

function fullHouse(terninger) {
  let counts = [];
  counts = calcCounts(terninger);
  let pair = 0;
  let threeOfKind = 0;
  let total = 0;
  for (let i = 1; i < counts.length; i++) {
    if (counts[i] == 2) {
      pair = i * 2;
    } else if (counts[i] == 3) {
      threeOfKind = i * 3;
    }
  }
  if (pair != 0 && threeOfKind != 0) {
    total = pair + threeOfKind;
  }
  holdPoints(13, total);
}

function smallStraight(terninger) {
  let total = 0;
  let counts = calcCounts(terninger);
  if (
    counts[1] == 1 &&
    counts[2] == 1 &&
    counts[3] == 1 &&
    counts[4] == 1 &&
    counts[5] == 1
  ) {
    total = 15;
  }
  holdPoints(14, total);
}

function largeStraight(terninger) {
  let total = 0;
  let counts = calcCounts(terninger);
  if (
    counts[2] == 1 &&
    counts[3] == 1 &&
    counts[4] == 1 &&
    counts[5] == 1 &&
    counts[6] == 1
  ) {
    total = 20;
  }
  holdPoints(15, total);
}

function chance(terninger) {
  let total = 0;
  for (let i = 0; i < terninger.length; i++) {
    total += terninger[i];
  }
  holdPoints(16, total);
}

function yatzy(terninger) {
  let total = 50;
  let number = terninger[0];
  for (let i = 1; i < terninger.length; i++) {
    if (terninger[i] !== number) {
      total = 0;
    }
  }
  holdPoints(17, total);
}
