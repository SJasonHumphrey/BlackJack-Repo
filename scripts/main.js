// window.addEventListener('DOMContentLoaded', () =>{
// Execute after page load
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


$deal.addEventListener('click', () => {
    createDeck()
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
    playerCard1.src = player[0].Image
    playerCard2.src = player[1].Image;

        if (dealerRealPoints === 21){
            alert('Dealer Wins!')
            dealerCard1.src = dealer[0].Image;
        }


        if  (playerCurrentPoints === 21){
            alert('You Win!')
            }
        else if (playerCurrentPoints > 21){
            alert('You Bust!');
        }  

});
// hit function
$hit.addEventListener('click', () => {
while(playerCurrentPoints < 21 && dealerRealPoints < safety){
    for (var i = 0; i < 1; i++) {
        for (var x = 0; x < 1; x++) {
            var PlayerCard = deck.pop();
            player.push(PlayerCard);

        }
        var playerCard3 = document.createElement('img');
        $playerHand.append(playerCard3);
        playerCard3.src = player[2].Image;
    }

    $playerPoints.textContent = player[0].Weight + player[1].Weight + player[2].Weight;
        if (playerCurrentPoints === 21) {
            alert('You win!')
            dealerCard1.src = dealer[0].Image;
            dealerCurrentPoints.textContent = dealerRealPoints;
            createDeck()
            shuffleCards()
        }
        else if (playerCurrentPoints > 21){
            alert('You Bust!')
            dealerCard1.src = dealer[0].Image;
            $dealerPoints.textContent = dealerRealPoints;
        }
        else if ($playerPoints < 21) {
            alert('Your Choice?')
        }
        

            if (dealerRealPoints === 21){
                alert('Dealer Wins')
                $dealerPoints.textContent = dealerRealPoints;
                dealerCard1.src = dealer[0].Image;
            }
            else if (dealerRealPoints > 21) {
                alert('Dealer Busted!');
                dealerCard1.src = dealer[0].Image;
                $dealerPoints.textContent = dealerRealPoints;
                createDeck()
                shuffleCards()
            }
    
            for (var i = 0; i < 1; i++) {
                for (var x = 0; x < 1; x++) {
                var dealerCard = shuffleDeck.pop();
            }   dealer.push(dealerCard);
            var dealerCard3 = document.createElement('img');
            $dealerHand.append(dealerCard3);
            dealerCard3.src = dealer[2].Image;
        }
            if (dealerRealPoints === 17) {
            alert('Your Choice')
            dealerCard1.src = dealer[0].Image;
            $dealerPoints.textContent = dealerRealPoints;
        }
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
        }$dealerPoints.textContent = sum2;
});
$stand.addEventListener('click', () => {
while (dealerRealPoints < safety){
        var sum = 0;
        for (var i = 0; i < dealer.length; i++) {
            sum = sum + dealer[i].Weight;
        } 
        dealerRealPoints = sum;
        dealer.shift();
        $dealerPoints.textContent = dealer[0].Weight;
        var dealerCard4 = document.createElement('img');
        $dealerHand.append(dealerCard4);
        dealerCard4.src = dealer[2].Image;  
    if (dealerRealPoints === 21) {
        alert('Dealer Wins!');
        dealerCard1.src = dealer[0].Image;
        $dealerPoints.textContent = dealerRealPoints;
    }

    else if (dealerRealPoints > 21) {
        console.log('Dealer Busts!');
        dealerCard1.src = dealer[0].Image;
        $dealerPoints.textContent = dealerRealPoints;
    }

    else if (dealerRealPoints === safety) {
        dealerCard1.src = dealer[0].Image;
        $dealerPoints.textContent = dealerRealPoints;
    }

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
    }    $dealerPoints.textContent = sum2;

});
