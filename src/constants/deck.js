// deck to use
const simpleDeck = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
]; // no joker

// METHOD 1. easy way to add suits in simple deck using reduce
const DECK = simpleDeck.reduce((deck, card) => {
  // for each {card} in {DECK}, add 4 suits of it into the accumulator {deck}
  deck.push(
    card + '_spade',
    card + '_diamond',
    card + '_heart',
    card + '_club'
  );
  return deck;
}, []);

// METHOD 2. using for loop
/*
for (const index=0; index < simpleDeck.length; index++) {
    const card = DECK[i] // get card of this index
    // insert card at index
    DECK = DECK.splice(index, 0, card+'_spade', card+'_diamond', card+'_heart', card+'_club')
}) */

export { simpleDeck };
export default DECK;
