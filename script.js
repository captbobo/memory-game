window.onload = function() {

  let documentFrag = document.createDocumentFragment(),
      scene = document.createElement("div"),
      currentFlip = [],
      cards = document.getElementsByClassName("card"),
      resetButton = document.getElementById("reset-button"),
      moveCounter = 0,
      score = 3,
      gameTime = 120,
      timerReset,
      cardsArray, clickBan, valuesArray;

  timer(gameTime);
  scoring(moveCounter);
  createCards(valueArray(16));
  cardsArray = Array.from(cards);
  cardsArray.forEach(function(evt){
    evt.addEventListener("click", function(){
      if(!clickBan){
        currentFlip.push(evt);
        scoring(moveCounter);
        switch (currentFlip.length) {
          case 1:
            flip(this);
            break;
          case 2:
            flip(this);
            // checks if the open card is clicked again
            if (currentFlip[0]===currentFlip[1]) {
              currentFlip.pop();
            }
            else if (!(currentFlip[0].textContent===currentFlip[1].textContent)) {
              clickBan = true;
              currentFlip.forEach(function(event){
                moveCounter++;
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
    });
  });
  resetButton.addEventListener("click", function(){
    clearInterval(countdown);
    timer(gameTime);
  });


  // append or remove <span>&#9734;</span> as a child to
  // if score === 3 append <span>&#9734;</span> to score-container

  function scoring(moveCounter){
    let scoreContainer = document.getElementById("score-container"),
        span = document.createElement("span"),
        spanClone;

    span.innerHTML = "&#9734";
    scoreContainer.textContent = "Score: ";

    for(let i = 0; i < score; i++) {
      spanClone = span.cloneNode(true);
      scoreContainer.appendChild(spanClone);
    }

    if(moveCounter <= 5 ) score = 3;
    else if (moveCounter > 5 && moveCounter <= 10) score = 2;
    else if (moveCounter > 10 && moveCounter < 17) score = 1;
    else score = 0;
    // console.log(`counter: ${moveCounter}, score: ${score}`);
  }

  function timer(seconds){
    let timer = document.getElementById("time"),
        secondHand, minutes;

    minutes = parseInt(seconds / 60, 10);
    secondHand = parseInt(seconds % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    secondHand = secondHand < 10 ? "0" + secondHand : secondHand;
    timer.textContent = minutes + ":" + secondHand;

    countdown = setInterval(function(){
      if (seconds-- < 1){
        clearInterval(countdown);
        gameOver();
      }
      minutes = parseInt(seconds / 60, 10);
      secondHand = parseInt(seconds % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      secondHand = secondHand < 10 ? "0" + secondHand : secondHand;

      timer.textContent = minutes + ":" + secondHand;


    }, 1000)
  }

  function gameOver(){
    console.log("game over");
  }

  function createCards(valuesArray) {
    // create the scene for 3D animation
    // source: https://3dtransforms.desandro.com/card-flip
    for(let i = 1 ; i <= valuesArray.length ; i++){
      let cardFaceFront = document.createElement("div"),
          cardFaceBack = document.createElement("div"),
          card = document.createElement("div");
      card.setAttribute("class", "card");
      cardFaceFront.setAttribute("class", "card-face card-face-front");
      cardFaceBack.setAttribute("class", "card-face card-face-back");
      cardFaceBack.innerHTML = valuesArray[i-1];
      cardFaceFront.innerHTML = valuesArray[i-1]; // testing purposes
      card.appendChild(cardFaceFront);
      card.appendChild(cardFaceBack);
      scene.appendChild(card);
    };
    scene.setAttribute("class", "scene");
    document.body.appendChild(scene);
  }

  function valueArray(lvl) {
    let valueArray = [],
        finalArray = [];
    for (let i = 1 ; i <= lvl/2 ; i++){
      valueArray.push(i);
    }
    for (let i = 0; i < 2 ; i++){
      for (let j of valueArray){
        finalArray.push(valueArray[j-1]);
      }
    shuffleArray(finalArray);
    }
    return finalArray;
  }

  function shuffleArray(array) {
    // Durstenfeld or Knuth's (or Fisher-Yates) shuffling algorithm
    // From Laurens Holst's answer: https://stackoverflow.com/a/12646864/9144800
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
