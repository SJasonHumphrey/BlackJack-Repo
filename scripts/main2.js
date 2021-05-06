var $deal = document.querySelector('#deal-button');
var $hit = document.querySelector('#hit-button');
var $stand = document.querySelector('#stand-button');
var $playerPoints = document.querySelector('#player-points');
var $dealerPoints = document.querySelector('#dealer-points');
var $dealerHand = document.querySelector('#dealer-hand');
var $playerHand = document.querySelector('#player-hand');

var dealer = []; // The dealer's current hand
var player = []; // The player's current hand
var dealerCurrentPoints = 0; // The dealer's current points
var dealerRealPoints = 0;
var playerCurrentPoints = 0; // The player's current points
var safety = 17; // Computer will stand on or past this point
var playerTurn = 0;
var dealerTurn = 0;
var dealerCard1 = document.createElement('img');
var dealerCard2 = document.createElement('img');
var playerCard1 = document.createElement('img');
var playerCard2 = document.createElement('img');



var suits = ['spades', 'hearts', 'diamonds', 'clubs'];
var values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
var deck = [];
var shuffleDeck = [];
// creatiing deck of cards
function createDeck() {
    for (var i = 0; i < values.length; i++) {
        for (var j = 0; j < suits.length; j++) {
            var weight = parseInt(values[i]);
            if (values[i] == 'jack' || values[i] == 'queen' || values[i] == 'king')
                weight = 10;
            if (values[i] == 'ace')
                weight = 11;
            var card = { Value: values[i], Suit: suits[j], Weight: weight, Image: `./images/${values[i]}_of_${suits[j]}.png` };
            deck.push(card);

        }
    }
}
// shuffeling the cards 
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
function dealHands() {
    // alternate handing cards to each player
    // 2 cards each
    shuffleDeck = shuffleArray(deck);
    // alternate handing cards to each player
    // 2 cards each
    for (var i = 0; i < 1; i++) {
        for (var x = 0; x < 2; x++) {
            var PlayerCard = shuffleDeck.pop();
            player.push(PlayerCard);
            var dealerCard = shuffleDeck.pop();
            dealer.push(dealerCard);
        }
    }
    // Points
    playerCurrentPoints = playerCurrentPoints + player[0].Weight + player[1].Weight;
    $playerPoints.textContent = playerCurrentPoints;
    $dealerPoints.textContent = dealer[1].Weight;
    dealerRealPoints = dealer[0].Weight + dealer[1].Weight;
    // Dealer Hand
    $dealerHand.append(dealerCard1);
    $dealerHand.append(dealerCard2);
    dealerCard1.src = './images/card_back.png'
    dealerCard2.src = dealer[1].Image;
    // Player Hand
    $playerHand.append(playerCard1);
    $playerHand.append(playerCard2);
    playerCard1.src = player[0].Image;
    playerCard2.src = player[1].Image;
    updatePoints()
}
// returns the number of points that a player has in hand
function updatePoints() {
    var sum1 = 0;
    for (var i = 0; i < dealer.length; i++) {
        sum1 = sum1 + dealer[i].Weight;
    }
    dealerRealPoints = sum1;
    dealer.shift();
    var sum2 = 0;
    for (var i = 0; i < dealer.length; i++) {
        sum2 = sum2 + dealer[i].Weight;
    }

    $dealerPoints.textContent = sum2;

    var sum3 = 0;
    for (var i = 0; i < player.length; i++) {
        sum3 = sum3 + player[i].Weight;
    }
    $playerPoints.textContent = sum3;
    playerCurrentPoints = playerCurrentPoints + sum3
}

function hitMe(player,value,index) {
    // pop a card from the deck to the current player
    // check if current player new points are over 21
    if (playerCurrentPoints < 21 || dealerRealPoints < safety) {
        var card = deck.pop();
        `${player}`.push(card);
        $playerHand.append(`${player}Card${value}`);
        `${player}Card${value}`.src = `${player}[${index}].Image`;
        updatePoints()
        check()
    }
}
function stand() {
    // move on to next player, if any
    if (dealerRealPoints < safety) {
        hitMe()
    }


    else {
        end();
    }

}
function end() {

}

function check() {
    if (playerCurrentPoints > 21) {
        playerCard1.src = player[0].Image;
        alert('You Busted!')
    }
    else if (dealerRealPoints > 21) {
        alert('The Dealer Busted!')
    }

}

$deal.addEventListener('click', () => {
        createDeck()
        dealHands()

});

$hit.addEventListener('click', () => {
    if(playerCurrentPoints < 21){
    var value1 = 3;
    var index1 = 2;
    hitPlayer('player',value1,index1);
    value1 ++;
    index1 ++;
    }
    if (dealerRealPoints < safety){
    var value2 = 3
    var index2 = 2
    hitdealer('dealer', value2, index2);
    value2 ++;
    index2 ++;
    }

    check() 

});
$stand.addEventListener('click', () => {
    stand()
});
