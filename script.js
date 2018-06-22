window.onload = function() {

  let documentFrag = document.createDocumentFragment(),
      scene = document.createElement("div"),
      currentFlip = document.getElementsByClassName("flipped"),
      cards = document.getElementsByClassName("card"),
      moveCounter = 0,
      cardsArray, currentCards, openCardsArray, valuesArray;

  // returns a shuffled/random array of values
  // with the length specified with the argument
  createCards(valueArray(16));
  cardsArray = Array.from(cards);
  cardsArray.forEach(function(evt){
    evt.addEventListener("click", function(){
      switch (currentFlip.length) {
        case 0 :
          flip(this);
          console.log(moveCounter);
          break;
        case 1:
          flip(this);
          currentCards = Array.from(currentFlip);
          // checking if flipped card is clicked again, otherwise it will unflip - this is not so pretty, I know...
          // Please let me know if there are better options
          if (currentFlip.length === 1);
          else if (!checkValues(currentCards)) {
            currentCards.forEach(function(event){
              moveCounter++;
              console.log(moveCounter);
              setTimeout(function() {
                unflip(event);
              }, 1000);
            });
          } else {
            currentCards.forEach(function(event){
              setTimeout(function(){
                hide(event);
                unflip(event);
              }, 1100);
            });
          };
          break;
          default:
            console.log("default");
            currentCards.forEach(function(event){
              unflip(event);
            });
          break;
          moveCounter++;
          console.log(moveCounter);
      }
    });
  });

  // older version with if instead of switch
  //     if (currentFlip.length < 2){
  //       currentCards = Array.from(currentFlip);
  //
  //       flip(this);
        // if (checkValues(currentCards)) {
        //   currentCards.forEach(function(event){
        //     flip(event);
        //     lock(event);
        //     unflip(event);
        //     hide(event);
        //   });
        // };
  //     } else if(currentFlip.length == 2) {
  //         if (!checkValues(currentCards)) {
  //           currentCards.forEach(function(event){
  //             unflip(event);
  //           });
  //         }
  //       // else if (checkValues(currentCards)) {
  //       //   currentCards.forEach(function(event){
  //       //     console.log("he");
  //       //     lock(event);
  //       //     unflip(event);
  //       //   });
  //     }
  //   });
  // });

  function flip(card){
    card.classList.add("flipped");
  }

  function unflip(card){
    card.classList.remove("flipped");
  }

  function hide(card){
    card.classList.add("hidden");

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
  };

  function shuffleArray(array) {
    // Durstenfeld or Knuth's (or Fisher-Yates) shuffling algorithm
    // From Laurens Holst's answer:
    // https://stackoverflow.com/a/12646864/9144800
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
      };
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
      card.appendChild(cardFaceFront);
      card.appendChild(cardFaceBack);
      scene.appendChild(card);
    };
    scene.setAttribute("class", "scene");
    document.body.appendChild(scene);
  }

  function checkValues(currentFlip){
    if ((currentFlip.length > 1)&&(currentFlip[0].textContent === currentFlip[1].textContent)){
        return true;
    }else return false;
  }
};
