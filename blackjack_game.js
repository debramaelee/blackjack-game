deck = newDeck();
cards = shuffleDeck(deck);
handArray = [];

///functions
function getCardImageUrl(card) {
  if (card.point >=2 && card.point <= 10) {
    return 'images/' + card.point + '_of_'+ card.suit +'.png';
  }
  else if(card.point === 11){
    return 'images/jack_of_'+card.suit+'.png';
  }
  else if(card.point === 12){
    return 'images/queen_of_'+card.suit+'.png';
  }
  else if(card.point === 13){
    return 'images/king_of_'+card.suit+'.png';
  }
  else if (card.point === 1) {
    return 'images/ace_of_'+card.suit+'.png';
  }
}

function newDeck() {
  var array = [];
  var type = ['spades','hearts','clubs','diamonds'];
  for (var i = 0; i < 13; i++) {
    if (i === 1) {
      for (var j = 0; j < 4; j++) {
        array.push({ point: "ace", suit: type[j] });
      }
    } else if (i >= 1 && i < 10) {
      for (var j = 0; j < 4; j++) {
        array.push({ point: i, suit: type[j] });
      }
    } else if(i >= 10 && i < 13) {
      for (var j = 0; j < 4; j++) {
        if(i == 10) array.push({ point: 'jack', suit: type[j] });
        else if (i == 11) array.push({ point: 'queen', suit: type[j] });
        else if (i == 12) array.push({ point: 'king', suit: type[j] });
      }
    }
  }
  return array;
}

function getRandomInt(min, max) {
 min = Math.ceil(min);
 max = Math.floor(max);
 return Math.floor(Math.random() * (max - min)) + min;
}

function shuffleDeck(cards) {
  for (var i = 0; i < cards.length; i++){
    var randi = getRandomInt(0,cards.length);
    var temp = cards[randi];
    cards[randi] = cards[i];
    cards[i] = temp;
  }
  return cards;
}

function selectCard() {
  return cards.pop();
}

function getStrValue(removedCard) {
  return removedCard.point+"_of_"+removedCard.suit;
}

function calculatePoints(cards) {
  cards.sort(function(a, b) {
    return b.point - a.point;
  });
  var sum = 0;
  for (var i = 0; i < cards.length; i++){
    if (cards[i].point >= 2 && cards[i].point < 10){
      sum += cards[i].point;

    } else if (cards[i].point === "jack" || cards[i].point === "queen" || cards[i].point === "king") {
      sum += 10;

    } else if (cards[i].point === "ace" ) {
      if (11+sum > 21) {
        sum += 1;
      }
      else {
        sum +=11;
      }

    }
  }
  return sum;
}



//jquery

$(function() {

  dealerHand =[];
  playerHand =[];

  $('#deal-button').click(function() {

    playerHand.push(selectCard());
    $('#deal-button').hide();

    $('#player-hand').append('<img class = "cards" src="images/'+getStrValue(playerHand[0])+'.png">');


    playerHand.push(selectCard());
    $('#player-hand').append('<img class = "cards" src="images/'+getStrValue(playerHand[1])+'.png">');
    $('.cards').addClass('animated rollIn');

    playerPoints = calculatePoints(playerHand);

    $('#player-points').text(playerPoints);



    dealerHand.push(selectCard());
    $('#dealer-hand').append('<img class = "cards" src="images/'+getStrValue(dealerHand[0])+'.png">');

    dealerHand.push(selectCard());
    $('#dealer-hand').append('<img class = "cards" src="images/'+getStrValue(dealerHand[1])+'.png">');
    $('.cards').addClass('animated rollIn');


    dealerPoints = calculatePoints(dealerHand);

    $('#dealer-points').text(dealerPoints);


  });

  $('#hit-button').click(function() {
    playerHand.push(selectCard());
    pi = playerHand.length - 1;
    while (dealerPoints < 18) {
      dealerHand.push(selectCard());
      di = dealerHand.length - 1;
      $('#dealer-hand').append('<img class = "cards" src ="images/'+getStrValue(dealerHand[di])+'.png">');
      $('.cards').addClass('animated rollIn');
      dealerPoints = calculatePoints(dealerHand);
      $('#dealer-points').text(dealerPoints);
    }

    if (dealerPoints > 21) {
      $('#messages').text("Dealer busts! You win. :)");
      $('#messages').addClass('animated zoomIn');
    }
    $('#player-hand').append('<img class = "cards" src="images/'+getStrValue(playerHand[pi])+'.png">');

    $('.cards').addClass('animated rollIn');
    playerPoints = calculatePoints(playerHand);
    $('#player-points').text(playerPoints);

    if (playerPoints > 21) {
      $('#messages').text("Bust! You lose. :(");
      $('#messages').addClass('animated zoomIn');
    }
    if (playerPoints === 21) {
      $('#messages').text("You win! Got 21");
      $('#messages').addClass('animated zoomIn');
    }
  });

  $('#stand-button').click(function() {
    while (dealerPoints < 18) {
      dealerHand.push(selectCard());
      di = dealerHand.length - 1;
      $('#dealer-hand').append('<img class = "cards" src ="images/'+getStrValue(dealerHand[di])+'.png">');
      $('.cards').addClass('animated rollIn');
      dealerPoints = calculatePoints(dealerHand);
      $('#dealer-points').text(dealerPoints);
    }
    if (playerPoints > dealerPoints) {
      $('#messages').text("You win!");
      $('#messages').addClass('animated zoomIn');
    }
    else {
      $('#messages').text("Dealer wins!");
      $('#messages').addClass('animated zoomIn');
    }

  });
});
