window.onload = function() {

  let documentFrag = document.createDocumentFragment(),
      scene = document.createElement("div"),
      currentFlip = [],
      cards = document.getElementsByClassName("card"),
      moveCounter = 0,
      score = 3,
      cardsArray, currentCards, openCards, valuesArray;

  timer(10);
  createCards(valueArray(16));
  cardsArray = Array.from(cards);
  cardsArray.forEach(function(evt){
    evt.addEventListener("click", function(){
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
            currentFlip.splice(1,1);
          }
          else if (!checkValues(currentFlip)) {
            currentFlip.forEach(function(event){
              moveCounter++;
              setTimeout(function() {
                unflip(event);
              }, 1000);
            });
          } else {
            currentFlip.forEach(function(event){
              setTimeout(function(){
                unflip(event);
                setTimeout(function(){
                  hide(event);
                }, 300);
              }, 1000);
            });
          };
          break;
          default:
          // forces unflip on open cards if there are already 2 open cards when clicked
            currentFlip.forEach(function(event){
              unflip(event);
            });
          break;
          moveCounter++;
      }
    });
  });

  function scoring(moveCounter){
    if(moveCounter <= 5 ) score = 3;
    else if (moveCounter > 5 && moveCounter <= 10) score = 2;
    else if (moveCounter < 10 && moveCounter < 17) score = 1;
    else score = 0;
    // console.log(`counter: ${moveCounter}, score: ${score}`);
  }
  function timer(seconds){
    let timer = document.getElementById("time"),
        secondHand, minuteHand;

    countdown = setInterval(function(){
      minutes = parseInt(seconds / 60, 10);
      secondsHand = parseInt(seconds % 60, 10);

      minuteHand = minutes < 10 ? "0" + minutes : minutes;
      secondHand = secondsHand < 10 ? "0" + secondsHand : secondsHand;
      timer.textContent = minutes + ":" + secondHand;

      if (seconds-- < 1){
        clearInterval(countdown);
        gameOver();
      }
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

  function checkValues(currentFlip){
    if ((currentFlip.length > 1)&&(currentFlip[0].textContent === currentFlip[1].textContent)){
        return true;
    }else return false;
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
