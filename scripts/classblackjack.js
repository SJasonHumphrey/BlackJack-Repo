let cardDeck = []; 
let suits = ['C', 'D', 'H', 'S'];
let suitMap = {
    D: 'diamonds',
    C: 'clubs',
    H: 'hearts',
    S: 'spades'
}

let dealButton = document.getElementById('deal-button');
let hitButton = document.querySelector('#hit-button');
let standButton = document.querySelector('#stand-button');

let playerHand = []; 
let dealerHand = [];

let dealerHandNode = document.getElementById('dealer-hand');
let playerHandNode = document.getElementById('player-hand');

let playerPoints = document.getElementById('player-points');
let dealerPoints = document.getElementById('dealer-points');

let messages = document.getElementById('messages');


//points, suit, imgURL


function createCardObj(points, suit) {

    let card = {
        points: points,
        suit: suit
    }

    let imageURL = '';

    //points_of_suit.png
    if (points > 1 && points <= 10) {
        imageURL = `images/${points}_of_${suitMap[suit]}.png`
    }

    switch (points) {
        case 1:
            imageURL = `images/ace_of_${suitMap[suit]}.png`
            break;
        case 11:
            card.points = 10;
            imageURL = `images/jack_of_${suitMap[suit]}.png`;
            break;
        case 12:
            card.points = 10;
            imageURL = `images/queen_of_${suitMap[suit]}.png`;
            break;
        case 13:
            card.points = 10;
            imageURL = `images/king_of_${suitMap[suit]}.png`;
            break;
    }

    card.imageURL = imageURL;
    return card;
}


function createDeck() {

    suits.forEach(suit => {

        for (let points = 1; points <= 13; points++) {
            //create the 13 cards, and push to the card

            cardDeck.push(createCardObj(points, suit))
        }

    })//end of forEach

    shuffleArray(cardDeck)

}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function calculateHand(hand) {

    let points = 0;
    let hasAce = false;

    hand.forEach(card => {
        if (card.points == 1) {
            hasAce = true;
        }
        points += card.points;
    })

    if (hasAce == true && points + 10 <= 21) {
        points = points + 10;
    }

    return points;
}

function displayPlayerCards() {

    let htmlFragment = "";

    playerHand.forEach(card => {

        let img = `<img src="${card.imageURL}">`
        htmlFragment += img;
    })

    playerHandNode.innerHTML = htmlFragment;
    let points = calculateHand(playerHand);
    playerPoints.innerHTML = points.toString();

}



function displayDealerCards() {

    let htmlFragment = "";

    dealerHand.forEach(card => {

        let img = `<img src="${card.imageURL}">`
        htmlFragment += img;
    })

    dealerHandNode.innerHTML = htmlFragment;
    let points = calculateHand(dealerHand);
    dealerPoints.innerHTML = points.toString();

}

function dealDealer() {
    let points = calculateHand(dealerHand);

    while (points < 17) {
        dealerHand.push(cardDeck.pop());

        displayDealerCards();
        points = calculateHand(dealerHand);
    }

    checkWinner();
}

function checkWinner() {
    let dealerPoints = calculateHand(dealerHand);
    let playerPoints = calculateHand(playerHand);

    if (playerPoints <= 21 && playerPoints > dealerPoints) {
        messages.innerHTML = "<h2>You win!</h2>"

    }
    else {
        messages.innerHTML = "<h2>Dealer Wins</h2>"
    }

    hitButton.disabled = true;
    standButton.disabled = true;
}

dealButton.addEventListener('click', () => {
    cardDeck = [];
    playerHand = [];
    dealerHand = [];
    createDeck();
    hitButton.disabled = false;
    standButton.disabled = false;
    messages.innerHTML = '';

    //pop 2 cards from cardDeck and push to player hand

    playerHand.push(cardDeck.pop());
    playerHand.push(cardDeck.pop());

    //pop 2 cards from cardDeck and push to dealer hand
    dealerHand.push(cardDeck.pop());
    dealerHand.push(cardDeck.pop());

    displayDealerCards();
    displayPlayerCards();

    console.log(playerHand);
    console.log(dealerHand);

    console.log(cardDeck);

});

hitButton.addEventListener('click', () => {

    playerHand.push(cardDeck.pop());
    displayPlayerCards();
    console.log('hit button');

})

standButton.addEventListener('click', () => {

    dealDealer();

})

