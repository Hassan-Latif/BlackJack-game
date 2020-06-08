//Object
let blackJackGame = {
    'you' : {'scoreSpan':'#your-blackjack-result', 'div':'#your-box','score':0},
    'dealer' : {'scoreSpan':'#dealer-blackjack-result', 'div':'#dealer-box','score':0},
    'cards' : ['2','3','4','5','6','7','8','9','10','A','K','A']
}

const YOU = blackJackGame['you'];
const Dealer = blackJackGame['dealer'];
const hitSound =new Audio('./sounds/swish.m4a')

//for hit botton
document.querySelector('#blackjack-hit-button').addEventListener("click", blackJackHit);

//for deal button
document.querySelector('#blackjack-deal-button').addEventListener("click",blackJackDeal)

function blackJackHit(){
   let cards=randomCard();
   console.log(cards);
   
    doShowCard(cards,Dealer);
}
    
function randomCard(){
    let randomNo = Math.floor(Math.random()*13);
    return blackJackGame.cards[randomNo];
}

function doShowCard(card ,activePlayer){
    let cardImage = document.createElement('img');
    cardImage.src= `./images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}

function blackJackDeal(){
    let youImages=document.querySelector('#your-box').querySelectorAll('img');
   
    let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');

    for(i=0;i<dealerImages.length;++i){
        dealerImages[i].remove();
    }

    for(i=0;i<youImages.length;++i){
        youImages[i].remove();
    }

}

