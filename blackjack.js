const prompt = require("prompt-sync")();

class Deck {
    constructor() {
        this.suits = ["Diamonds", "Clubs", "Hearts", "Spades"]
        this.ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"]
    }

    makeDeck() {
        let deck = [];
        //This loop iterates through the suits
        for (let i = 0; i < this.suits.length; i++) {
            // This loop iterates through the ranks
            for (let rank = 0; rank < this.ranks.length; rank++) {
                deck.push(`${this.ranks[rank]} of ${this.suits[i]} `)
            }
        }

        deck = this.shuffle(deck)
        return deck
    }

    shuffle(deck) {
        let m = deck.length
        let i
        while (m) {
            i = Math.floor(Math.random() * m--);
        
            [deck[m], deck[i]] = [deck[i], deck[m]];
          }

        return deck
    }
}

class Player {
    constructor() {
        this.hand = []
        this.score = 0
        this.money = 1000
        this.playAgain = false
        this.wager = 0
    }

    makeWager() {
        this.wager = Number(prompt("How much do you want to bet? "))
    }

    hit() {
        if (this.hand.length >= 2) {
            let hitOrStay = prompt("Do you want to hit?(y/n) ")
            if (hitOrStay = "y") {
                console.log("Player is dealt a card...")
                let newCard = deck.pop()
                this.addCardValue(newCard)
                this.hand.push(newCard)
            }
        } else {
            console.log("Player is dealt a card...")
            let newCard = deck.pop()

            this.addCardValue(newCard)
            this.hand.push(newCard)
        }
    }

    dealOpeningHand() {
        this.hit()
        this.hit()
    }

    showHand() {
        console.log("The players hand...")
        console.log(this.hand)
    }
    // '7 of Hearts '
    addCardValue(card) {
        let cardRank = card.split(" ")[0]

        if (parseInt(cardRank) <= 10) {
            this.score += parseInt(cardRank)
        } else if (cardRank === 'Ace') {
            if (this.score + 11 < 21) {
                this.score += 11
            } else {
                this.score += 1
            }
        } else {
            this.score += 10
        }
            
    }
}

class Dealer {
    constructor() {
        this.hand = []
        this.score = 0
    }

    hit() {
        if (this.hand.length >= 2) {
            let hitOrStay = prompt("Do you want to hit?(y/n) ")
            if (hitOrStay == "y") {
                console.log("Player is dealt a card...")
                let newCard = deck.pop()
                this.hand.push(newCard)
            }
        } else {
            console.log("Player is dealt a card...")
            let newCard = deck.pop()
            this.hand.push(newCard)
        }
    }

    dealOpeningHand() {
        this.hit()
        this.hit()
    }

    showHand() {
        console.log("The dealer is showing the following...")
        console.log(this.hand[0])
    }
}

// GAME START
// Make a deck
let deck = new Deck()
deck = deck.makeDeck()

// Make a player and dealer
let player = new Player()
let dealer = new Dealer()

// Have the player make a wager
player.makeWager()

// Deal hands to player and dealer
player.dealOpeningHand()
dealer.dealOpeningHand()

player.showHand()
console.log(player.score)
// // Print out players hand
// player.showHand()
// dealer.showHand()








