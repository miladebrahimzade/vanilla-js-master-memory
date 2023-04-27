const board = document.querySelector("#board");
const shuffleButton = document.querySelector("#shuffle");

var cards = ["A","A","B","B","C","C","D","D","E","E","F","F","G","G","H","H"];
var choice;
var firstChoice; //parameters thas keeps whole first choice to keep id for us;
var secondChoice; //parameters thas keeps whole second choice to keep id for us;
var falseAnswered = false;
var isAnswered = []; //arrays that keeps id of correct answers
var gameIsOn = false;
var correctAnswersNum = 0;

function createGameBoard(){ 
    // make the shuffled game board
    if(!gameIsOn) {
        gameIsOn = true;
        let shuffleCards = Array.from(cards);
        console.log(shuffleCards);
        function randomElement() {
            // give a random value of cards
            let random = Math.floor(Math.random() * shuffleCards.length);
            let choosedCard = shuffleCards[random];

            shuffleCards.splice(random,1);
            console.log(shuffleCards);

            return choosedCard;
        }

        for(let i=0 ; i<16 ; i++){ // create elements and give them id, class, event and value
            let card = document.createElement("div");
            let value = document.createElement("h1");

            card.setAttribute("id",i+1);
            card.setAttribute("onclick","choose(this)");
            card.classList.add("card");

            if(shuffleCards.length > 0){
                value.innerHTML = randomElement();
            }

            card.append(value);
            board.append(card);
        }
    }
}

function choose(card){ // choose and reveal card. keep it reveal if the choice is correct
    if(correctAnswersNum < 8){
        function isNotAnswered(){ // make sure that the chooses card is not one of the reveal answers
            if(isAnswered.length == 0){
                return true;
            }
            else {
                for(let i=0 ; i<isAnswered.length ; i++){
                    if(card.id == isAnswered[i]){                 
                        return false;
                    }                
                }
                return true;
            }
        }
    
        if(isNotAnswered()){
            let value = card.querySelector("h1").innerHTML; // value of choosed card
            card.querySelector("h1").classList.add("reveal");
    
            if (choice == null){ // find out it`s a first choice or not and keep it`s value
                if(falseAnswered){ // hide the values if last choice was a wrong choice
                    console.log("remove class");
                    firstChoice.querySelector("h1").classList.remove("reveal");
                    secondChoice.querySelector("h1").classList.remove("reveal");
                    falseAnswered = false;
                    firstChoice = null;
                    secondChoice = null
                }
                choice = value;
                firstChoice = card;
    
            } else {
                if (choice == value && firstChoice.id != card.id){ // find out second choice is not the same with first one. and is it correct answer?
                    secondChoice = card;
                    isAnswered.push(firstChoice.id, card.id);
                    choice = null;
                    correctAnswersNum ++;
                    if(correctAnswersNum == 8){
                        alert("تبریک برنده شدی!");
                    }
                } else {
                    if (choice != value && firstChoice.id != card.id){ // find wrong answer
                    secondChoice = card;
                    choice = null;
                    falseAnswered = true; // for remove reveal class and hide the wrong answer                
                    }
                }
            }
        }
    }
    
    
}




shuffleButton.addEventListener("click", createGameBoard, false);