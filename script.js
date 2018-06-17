window.onload = function() {

  let documentFrag = document.createDocumentFragment(),
      scene = document.createElement("div"),
      cards, cardsArray, valuesArray;

  scene.setAttribute("class", "scene");
  // returns a shuffled array of values
  // the length and hence the 'level' of the game depends on this value
  // the value should only be n-squared 
  valuesArray = valueArray(16);

  //
  // create them flippin' cards
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
  }

  document.body.appendChild(scene);

  cards = document.getElementsByClassName("card");
  cardsArray = Array.from(cards);
  cardsArray.forEach(function(elm){
    elm.addEventListener("click", function(){
        this.classList.toggle("flipped");
        });
  })

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


// random integer generator with a max range
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Durstenfeld or Knuth's (or Fisher-Yates) shuffling algorithm
// From Laurens Holst's answer:
// https://stackoverflow.com/a/12646864/9144800
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
    }
}

}
