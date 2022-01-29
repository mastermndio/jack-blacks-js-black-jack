const prompt = require("prompt-sync")();

class Deck {
    constructor() {
        this.suits = ["Diamonds", "Clubs", "Hearts", "Spades"]
        this.ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"]
    }

    makeDeck() {
        let deck = [];

        for (let i = 0; i < this.suits.length; i++) {
            for (let rank = 0; rank < this.ranks.length; rank++) {
                deck.push(`${this.ranks[rank]} of ${this.suits[i]}`)
            }
        }
        deck = this.shuffle(deck)
        return deck;
    }

    shuffle(deck) {
        console.log("shuffling deck")
        let m = deck.length
        let i;
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
        this.score = 0
        this.hitOrStay = "y"
    }
    makeWager() {
        while (true) {
            this.wager = Number(prompt("How much do you want to bet? "));
            if (isNaN(this.wager)) {
                console.log(`Please enter a digit less than less than ${this.money}`)
            } else if (this.wager > this.money) {
                console.log(`Please enter a digit less than less than ${this.money}`)
                continue
            } else {
                break
            }
        }

        console.log(`Player bet ${this.wager}.`)
        this.money -= this.wager
    }

    stay() {
    }

    hit(deck) {
        if (this.hand.length >= 2) {
            while (true) {
                this.hitOrStay = prompt("Do you want to hit (y/n)? ")
                if (this.hitOrStay === "y") {
                    console.log("Player is dealt a card...")
                    let newCard = deck.pop()
                    this.addCardValue(newCard)
                    console.log(`Player was dealt a ${newCard}. Player score is now ${this.score}.`)
                    this.hand.push(newCard)
                } else if (this.hitOrStay !== "y" && this.hitOrStay !== "n") {
                    console.log("Please enter 'y' or 'n'")
                    continue
                } else {
                    break
                }
            }

        } else {
            console.log("Player is dealt a card...")
            let newCard = deck.pop()
            this.addCardValue(newCard)
            this.hand.push(newCard)
        }
    }
    dealOpeningHand(deck) {
        this.hit(deck)
        this.hit(deck)
    }
    showHand() {
        console.log("The players hand is the following: ")
        console.log(this.hand)
    }

    reset() {
        this.hand = []
        this.hitOrStay = "y"
        this.score = 0
    }

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

    hit(deck) {
        if (this.hand.length >= 2) {
            console.log("Dealer is dealt a card...")
            let newCard = deck.pop()
            this.addCardValue(newCard)
            console.log(`Dealer was dealt a ${newCard}. Dealer score is now ${this.score}.`)
            this.hand.push(newCard)
        } else {
            console.log("Dealer is dealt a card...")
            let newCard = deck.pop()
            this.addCardValue(newCard)
            this.hand.push(newCard)
        }
    }
    dealOpeningHand(deck) {
        this.hit(deck)
        this.hit(deck)
    }

    showHand() {
        console.log("The dealer is showing the following 1 card: ")
        console.log(this.hand[0])
    }

    showFullHand() {
        console.log("The dealer is showing the following: ")
        console.log(this.hand)
    }

    reset() {
        this.hand = []
        this.score = 0
    }

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
function playGame() {
    console.log("Welcome to Jack Blacks BLACK JACK!")

    // Create deck of cards
    let deckObject = new Deck()
    let gameDeck = deckObject.makeDeck()

    // Create player & dealer
    let player = new Player()
    let dealer = new Dealer()
    console.log(`We're all ready to go. You currently have ${player.money}.`)

    while (player.money > 0) {
        // Player needs to bet
        player.makeWager()

        // Deal the cards
        console.log("Dealing the players cards...")
        player.dealOpeningHand(gameDeck)
        if (player.score == 21) {
            console.log("BLACKJACK!!!")
            console.log("Player WINS")
            player.money += player.wager * 2
            console.log(`Player has $${player.money}.`)
            player.reset()
            dealer.reset()
            continue
        }
        //console.log("The player is showing the following: ")
        player.showHand()

        console.log("Dealing the dealers cards...")
        dealer.dealOpeningHand(gameDeck)
        //console.log("The dealer is showing the following: ")
        dealer.showHand()

        // Player plays game
        while (player.hitOrStay === "y") {
            player.hit(gameDeck)

            if (player.score > 21) {
                console.log("BUST...YOU LOST...LOSER")
                console.log(`You have ${player.money} left.`)
                break
            }
        }

        if (player.score > 21) {
            player.reset()
            dealer.reset()
            continue
        }
        console.log(`Player stays with a score of ${player.score}.`)
        console.log("Dealers Turn!")

        // Dealer plays 
        console.log("Here comes the dealers Big Reveal!")
        dealer.showFullHand()

        while (dealer.score < 17) {
            dealer.hit(gameDeck)
        }
        if (dealer.score > 21) {
            console.log("Dealer BUSTS")
            console.log("Player WINS")
            player.money += player.wager * 2
            console.log(`Player has $${player.money}.`)
            player.reset()
            dealer.reset()
            continue
        }
        if (player.score > dealer.score) {
            console.log("Player WINS")
            player.money += player.wager * 2
            console.log(`Player now has $${player.money}.`)
        } else {
            console.log("Dealer WINS")
            console.log(`Player now has $${player.money}.`)

        }

        player.reset()
        dealer.reset()

    }
}
playGame()