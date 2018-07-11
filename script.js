window.onload = function() {

  let documentFrag = document.createDocumentFragment(),
      scene = document.createElement("div"),
      currentFlip = [],
      cards = document.getElementsByClassName("card"),
      resetButton = document.getElementById("reset-button"),
      modalRestartButton = document.getElementsByClassName("restart-button"),
      timer = document.getElementsByClassName("timer-container"),
      gameOverPopup = document.getElementById("game-over"),
      winPopup = document.getElementById("win"),
      modal = document.getElementsByClassName("modal"),
      timeUpMessage = document.getElementById("time-up"),
      moveCounter = 0,
      score = 3,
      gameTime = 75,
      // the set of symbols on the back of the cards
      // if there should be an option to increase the level of the game
      // and hence the number of cards, more symbol hex values MUST be added
      symbolArray = ["&#x263C","&#x2707","&#x2602","&#x2609",
                   "&#x273A","&#x2741","&#x274A","&#x2601"],
      checkWin = [],
      secondHand, minutes, timerReset, cardsArray, clickBan;

  countdownTimer(gameTime);
  scoring(moveCounter);
  createCards(valueArray(16));
  cardsArray.forEach(function(evt){
    evt.addEventListener("click", function(){
      clickListener(this);
    });
  });
  resetButton.addEventListener("click", function(){
    resetGame();
  });

  modalRestartButtonArray = Array.from(modalRestartButton);
  modalArray = Array.from(modal);
  modalRestartButtonArray.forEach(function(e){
    e.addEventListener("click", function(){
      modal[0].style.visibility = "hidden";
      modal[1].style.visibility = "hidden";
      setTimeout(function(){
      timeUpMessage.style.visibility= "hidden";
        resetGame();
      }, 260);
    });
  });

  // calls the setTimer and then starts the timer
  function countdownTimer(gameTime) {
    setTimer(gameTime);
    countdown = setInterval(function(){
      //game over modal if timer hits 0
      if (--gameTime < 1){
        clearInterval(countdown);
        gameOver(gameTime);
      }
      setTimer(gameTime);
    }, 1000);
  }

  // sets the timer for the seconds defined
  function setTimer(seconds){
    minutes = parseInt(seconds / 60, 10);
    secondHand = parseInt(seconds % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    secondHand = secondHand < 10 ? "0" + secondHand : secondHand;
    timer = Array.from(timer);
    timer.forEach(function(e){
      e.textContent = minutes + ":" + secondHand;
    });
  }

  // updates scores shown on header and modals
  function scoring(moveCounter){
    let scoreContainer = document.getElementsByClassName("score-container"),
        movesContainer = document.getElementsByClassName("moves-container"),
        span = document.createElement("span"),
        spanClone;

    span.innerHTML = "&#9734";
    scoreContainer[0].textContent = "";
    scoreContainer[1].textContent = "";

    if(moveCounter <= 8 ) score = 3;
    else if (moveCounter > 8 && moveCounter <= 16) score = 2;
    else score = 1;

    for(let i = 0; i < score; i++) {
      spanClone = span.cloneNode(true);
      scoreContainer[0].appendChild(spanClone);
      spanClone = span.cloneNode(true);
      scoreContainer[1].appendChild(spanClone);
    }
    movesContainer[0].textContent = "Moves: " + moveCounter;
    movesContainer[1].textContent = moveCounter;
    movesContainer[2].textContent = moveCounter;
  }

  // creates a new set of cards with the valuesArray
  function createCards(valuesArray) {
    // create the scene for 3D animation
    // source: https://3dtransforms.desandro.com/card-flip
    for(let i = 1 ; i <= valuesArray.length ; i++){
      let cardFaceBack = document.createElement("div"),
          cardFaceFront = document.createElement("div"),
          iconContainer = document.createElement("span"),
          card = document.createElement("div");
      card.setAttribute("class", "card");
      cardFaceFront.setAttribute("class", "card-face card-face-front");
      cardFaceBack.setAttribute("class", "card-face card-face-back");
      iconContainer.setAttribute("class", "icon"),
      iconContainer.innerHTML = valuesArray[i-1];
      cardFaceBack.appendChild(iconContainer);
      card.appendChild(cardFaceFront);
      card.appendChild(cardFaceBack);
      scene.appendChild(card);
    };
    scene.setAttribute("class", "scene");
    document.body.appendChild(scene);
    cardsArray = Array.from(cards);
    resetButton.setAttribute("tabindex", "0");
  }

  // this part is abstracted for a11y
  // where the space key or other keys will have to be listened
  function clickListener(clickedCard){
    if(!clickBan){
      currentFlip.push(clickedCard);
      switch (currentFlip.length) {
        case 1:
          flip(clickedCard);
          scoring(moveCounter);
          break;
        case 2:
          flip(clickedCard);
          // checks if the open card is clicked again
          if (currentFlip[0]===currentFlip[1]) {
            currentFlip.pop();
          }
          else if (!(currentFlip[0].textContent===currentFlip[1].textContent)) {
            moveCounter++;
            scoring(moveCounter);
            clickBan = true;
            currentFlip.forEach(function(event){
              setTimeout(function() {
                clickBan = false;
                unflip(event);
              }, 1000);
            });
          } else {
            clickBan = true;
            currentFlip.forEach(function(event){
              setTimeout(function(){
                unflip(event);
                setTimeout(function(){
                  hide(event);
                  clickBan = false;
                }, 300);
              }, 1000);
            });
          };
        break;
        default:
          console.log("switch default - something went wrong");
        break;
      }
    };
  }
  // Resets the game each time it is called
  // It creates a new set of cards with new values
  function resetGame(){
    currentFlip = [];
    clearInterval(countdown);
    moveCounter = 0;
    countdownTimer(gameTime);
    scoring(moveCounter);
    scene.innerHTML = "";
    createCards(valueArray(16));
    cardsArray.forEach(function(evt){
      evt.addEventListener("click", function(){
        clickListener(this);
      });
    });
  }
  // pushes symbol array into finalArray twice
  // e.g. finalArray = [symbolArray[0], ..., symbolArray[n], symbolArray[0], ..., symbolArray[n]]
  // and then shuffles this final array
  // Result: each symbol showing up twice randomly throughout the finalArray
  function valueArray(lvl) {
    let finalArray = [];

    for (let i = 0; i < 2 ; i++){
      for (let j = 1 ; j <= lvl/2 ; j++){
        finalArray.push(symbolArray[j-1]);
      };
    };
    // shuffles the argument
    shuffleArray(finalArray);
    return finalArray;
  }
  // Durstenfeld or Knuth's (or Fisher-Yates) shuffling algorithm
  // From Laurens Holst's answer: https://stackoverflow.com/a/12646864/9144800
  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
      };
  }
  // invokes unflip animation
  function flip(card){
    card.classList.add("flipped");
  }

  // invokes unflip animation
  function unflip(card){
    card.classList.remove("flipped");
    currentFlip = [];
  }

  // hides cards after a match and calls modal id="win" if
  // number of hidden cards = total cards
  function hide(card){
    card.classList.add("hidden");
    checkWin.push(card);
    if (checkWin.length === cardsArray.length) {
      playerWins();
    };
  }
  // invokes the modal id="game-over"
  function gameOver(gameTime){
    gameOverPopup.style.visibility = "visible";
    if(!gameTime) {
      setTimeout(function(){
        timeUpMessage.style.visibility= "visible";
      }, 300);

    }
    modalRestartButtonArray[0].focus(); // I don't fully understand why this doesn't work
    resetButton.setAttribute("tabindex", "-1");
  }

  // stops the timer, invokes the modal id="win"
  function playerWins(){
    clearInterval(countdown);
    scoring(moveCounter);
    winPopup.style.visibility = "visible";
    modalRestartButtonArray[1].focus(); // I don't fully understand why this doesn't work
    resetButton.setAttribute("tabindex", "-1");
  }

};
