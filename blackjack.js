let suits = ["Diamonds", "Clubs", "Hearts", "Spades"]
let ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"]

function makeDeck() {
    // Create new empty array for our deck
    let deck = [];
    //This loop iterates through the suits
    for (let i = 0; i < suits.length; i++) {
        // This loop iterates through the ranks
        for (let rank = 0; rank < ranks.length; rank++) {
            deck.push(`${ranks[rank]} of ${suits[i]} `)
        }
    }

    return deck
}

console.log(makeDeck())
