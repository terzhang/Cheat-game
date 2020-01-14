// a function that shuffles an array using the Fisher-Yates (aka Knuth) Shuffle
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  const shuffledArray = [...array];

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element at random...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex = currentIndex - 1;

    // And swap it with the current element.
    temporaryValue = shuffledArray[currentIndex];
    shuffledArray[currentIndex] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = temporaryValue;
  }

  return shuffledArray;
}

/* console.log(shuffle([2, 11, 37, 42])); */

export default shuffle;
