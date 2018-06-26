window.onload = function() {

  let documentFrag = document.createDocumentFragment(),
      scene = document.createElement("div"),
      currentFlip = document.getElementsByClassName("flipped"),
      cards = document.getElementsByClassName("card"),
      moveCounter = 0,
      score = 3,
      cardsArray, currentCards, openCardsArray, valuesArray;

  // returns a shuffled/random array of values
  // with the length specified with the argument
  timer(120);
  createCards(valueArray(16));
  cardsArray = Array.from(cards);
  cardsArray.forEach(function(evt){
    evt.addEventListener("click", function(){
      switch (currentFlip.length) {
        case 0 :
          flip(this);
          break;
        case 1:
          flip(this);
          currentCards = Array.from(currentFlip);
          // checking if flipped card is clicked again, otherwise it will unflip
          // this is not so pretty, I know .. .Please let me know of better options
          if (currentFlip.length === 1);
          else if (!checkValues(currentCards)) {
            currentCards.forEach(function(event){
              moveCounter++;
              setTimeout(function() {
                unflip(event);
              }, 1000);
            });
          } else {
            currentCards.forEach(function(event){
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
            currentCards.forEach(function(event){
              unflip(event);
            });
          break;
          moveCounter++;
      }
      if(moveCounter <= 5 ) score = 3;
      else if (moveCounter > 5 && moveCounter <= 10) score = 2;
      else if (moveCounter < 10 && moveCounter < 17) score = 1;
      else score = 0;
      console.log(`counter: ${moveCounter}, score ${score}`);
    });
  });

  function timer(seconds) {
    let secondHand = document.getElementById("seconds"),
        minuteHand = document.getElementById("minutes"),
        minutes = Math.floor(seconds / 60);
    minuteHand.textContent = minutes;
    if (!(seconds % 60)) secondHand.textContent = "00";
    else {
      secondHand.textContent = seconds % 60;
    };
    setInterval(function(){
      minutes--;
    }, 60000);
    seconds--;
    minutes = Math.floor(seconds / 60);
    setInterval(function(){
      minuteHand.textContent = minutes;
      console.log(seconds);
      secondHand.textContent = ((seconds--) % 60);
    }, 1000);
  }

  function createCards(valuesArray) {
    // create the scene in which all 3D animation takes place
    // the method can be seen @ https://3dtransforms.desandro.com/card-flip
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
    // From Laurens Holst's answer:
    // https://stackoverflow.com/a/12646864/9144800
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
    // card.style.transform = "rotateX(0deg)";
  }

  function hide(card){
    card.classList.add("hidden");
  }
};
