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
        this.money = 1000
        this.playAgain = false
        this.wager = 0
    }

    wager() {
        this.wager = Number(prompt("How much do you want to bet? "))
    }

    hit() {
        if (this.hand.length >= 2) {
            let hitOrStay = prompt("Do you want to hit?(y/n) ")
            if (hitOrStay = "y") {
                console.log("Player draws a card...")
                let newCard = deck.pop()
                this.hand.push(newCard)
            }
        } else {
            console.log("Player draws a card...")
            let newCard = deck.pop()
            this.hand.push(newCard)
        }
    }

    showHand() {
        console.log("The players hand...")
        console.log(this.hand)
    }
}

// Make a deck

// Make a player

// Have the player draw 2 cards

// Have the player make a wager

// Print out players hand

// Print out wager amount





