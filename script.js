window.onload = function() {

  let documentFrag = document.createDocumentFragment(),
      scene = document.createElement("div"),
      currentFlip = [],
      cards = document.getElementsByClassName("card"),
      resetButton = document.getElementById("reset-button"),
      modalRestartButton = document.getElementById("restart-button"),
      timer = document.getElementById("timer-container"),
      modalPopup = document.getElementById("modal"),
      moveCounter = 0,
      score = 3,
      gameTime = 75, // change to adjust game time
      iconArray = ["&#x2600","&#x2707","&#x203B","&#x2609",
                   "&#x273A","&#x2741","&#x274A","&#x205C"],
      secondHand, minutes, timerReset, cardsArray, clickBan, valuesArray;


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

  modalRestartButton.addEventListener("click", function(){
    modalPopup.style.visibility = "hidden";
    resetGame();
  });

  function countdownTimer(gameTime) {
    setTimer(gameTime);
    countdown = setInterval(function(){
      if (--gameTime < 1){
        clearInterval(countdown);
        gameOver();
      }
      setTimer(gameTime);
    }, 1000);
  }

  function setTimer(seconds){
    minutes = parseInt(seconds / 60, 10);
    secondHand = parseInt(seconds % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    secondHand = secondHand < 10 ? "0" + secondHand : secondHand;
    timer.textContent = minutes + ":" + secondHand;
  }

  function gameOver(){
    console.log("game over");
    modalPopup.style.visibility = "visible";
    modalRestartButton.focus(); // I don't fully understand why this doesn't work
    resetButton.setAttribute("tabindex", "-1");
  }

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
  }

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
      // cardFaceFront.innerHTML = valuesArray[i-1]; // testing purposes
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

  // this part is abstracted for a11y issues
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
          // moveCounter++;
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
          // forces unflip on open cards if there are already 2 open cards when clicked
          // obsolete after implementing clickBan
          currentFlip.forEach(function(event){
            unflip(event);
            moveCounter++;
          });
        break;
      }
    };
  }

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

  function valueArray(lvl) {
    let valueArray = [],
        finalArray = [];
    // for changing game difficulty in the future
    for (let i = 1 ; i <= lvl/2 ; i++){
      valueArray.push(i);
    }
    for (let i = 0; i < 2 ; i++){
      for (let j of valueArray){
        finalArray.push(iconArray[valueArray[j-1]-1]);
      }
    shuffleArray(finalArray);
    }
    console.log(finalArray);
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

  function flip(card){
    card.classList.add("flipped");
    // card.style.transform = "rotateX(180deg)";
  }

  function unflip(card){
    card.classList.remove("flipped");
    currentFlip = [];
    // card.style.transform = "rotateX(0deg)";
  }

  function hide(card){
    card.classList.add("hidden");
  }
};
