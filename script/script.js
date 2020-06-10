//Object
let blackJackGame = {
    'you' : {'scoreSpan':'#your-blackjack-result', 'div':'#your-box','score':0},
    'dealer' : {'scoreSpan':'#dealer-blackjack-result', 'div':'#dealer-box','score':0},
    'cards' : ['2','3','4','5','6','7','8','9','10','A','K','J','Q'],
    'cardsMap' : {'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'J':10, 'K':10, 'Q':10 , 'A':[1,11]},
    'Wins':0,
    'Loses':0,
    'Draws':0
}

const YOU = blackJackGame['you'];
const Dealer = blackJackGame['dealer'];
const hitSound =new Audio('./sounds/swish.m4a');
const winSound = new Audio('./sounds/cash.mp3');
const lostSound = new Audio('./sounds/aww.mp3');

//for hit botton
document.querySelector('#blackjack-hit-button').addEventListener("click", blackJackHit);

//for Stand button
document.querySelector('#blackjack-stand-button').addEventListener("click", dealerLogic);

//for deal button
document.querySelector('#blackjack-deal-button').addEventListener("click",blackJackDeal)

//Function for Hit button

function blackJackHit(){
    let cards=randomCard();
   console.log(cards);   
    doShowCard(cards,YOU);
    updateScore(cards,YOU);
    showScore(YOU);
}

function randomCard(){
    let randomNo = Math.floor(Math.random()*13);
    return blackJackGame.cards[randomNo];
}

//Function for showing images

function doShowCard(card ,activePlayer){
    if(activePlayer.score<=21){
    let cardImage = document.createElement('img');
    cardImage.src= `./images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}
}

// Function for deal button

function blackJackDeal(){
   
    let youImages=document.querySelector('#your-box').querySelectorAll('img');

 
    let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');

 
    for(i=0;i<dealerImages.length;++i){
        dealerImages[i].remove();
    }

    for(i=0;i<youImages.length;++i){
        youImages[i].remove();
    }

    YOU.score=0;
    Dealer.score=0;

    document.querySelector('#your-blackjack-result').textContent =0;
    document.querySelector('#dealer-blackjack-result').textContent =0;

    document.querySelector('#your-blackjack-result').style.color='#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color='#ffffff'
    document.querySelector('#blackjack-result').textContent='Lets Play';
    document.querySelector('#blackjack-result').style.color='black';
}

//Update Function

function updateScore(card,activePlayer){
    if(card === 'A'){
    if(activePlayer.score + blackJackGame.cardsMap[card][1] <=21){
        activePlayer.score += blackJackGame.cardsMap[card][1];
    }
    else{
        activePlayer.score +=blackJackGame.cardsMap[card][0];
    }
}
else{
    activePlayer.score += blackJackGame.cardsMap[card];   
}
}

//Function to display Score

function showScore(activePlayer){
    if(activePlayer.score<=21){
    document.querySelector(activePlayer['scoreSpan']).textContent= activePlayer.score;
}
    else{
        document.querySelector(activePlayer.scoreSpan).textContent="Burst";
        document.querySelector(activePlayer.scoreSpan).style.color='red';
    }

}

// 2nd player

function dealerLogic(){
    let card=randomCard();
    doShowCard(card,Dealer);
    updateScore(card,Dealer);
    showScore(Dealer);

    if(Dealer.score > 16){
        let computating=computeWinner();
        showResult(computating);
    }

}

// Function for computing the winner

function computeWinner(){
    let winner;

    if(YOU.score<=21){
        if(YOU.score>Dealer.score || Dealer.score>21 ){
           blackJackGame.Wins++;
            winner=YOU;
            
        }
        else if(YOU.score<Dealer.score){
            blackJackGame.Loses++;
            winner=Dealer;
           
        }
        else if(YOU.score === Dealer.score ){
            blackJackGame.Draws++
        }
    }
    else if(YOU.score>21 && Dealer.score<=21){
       blackJackGame.Loses++;
        winner=Dealer;
      
    }
    else if(YOU.score>=21 && Dealer.score>=21){
    
    blackJackGame.Draws++;
    }
    console.log(blackJackGame)
    return winner;
    
}

// function for showing result

function showResult(winner){

    let message , messagecolor;

    if(winner===YOU){
        document.querySelector('#wins').textContent=blackJackGame.Wins;
        message='You won';
        messagecolor='green';
        winSound.play(); 
    }
    else if(winner===Dealer){
        document.querySelector('#loses').textContent=blackJackGame.Loses;
        message='You lost';
        messagecolor='red';
        lostSound.play();
    }
    else{
        document.querySelector('#draws').textContent=blackJackGame.Draws;
        message = 'You drew!';
        messagecolor='black';   
    }

        document.querySelector('#blackjack-result').textContent=message;
        document.querySelector('#blackjack-result').style.color=messagecolor
}