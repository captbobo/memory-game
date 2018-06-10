window.onload = function() {
  let valueArray = [], finalArray = [];
  let lvl = 16;

  //lvl will change later, that is the reason for this loop
  for (let i = 1 ; i <= lvl/2 ; i++){
    valueArray.push(i);
  }

  for (let i = 0; i < 2 ; i++){
    for (let j of valueArray){
      finalArray.push(valueArray[j-1]);
    }
  shuffleArray(finalArray);
  }

  for(let i = 1 ; i <= lvl ; i++){
    let div = document.createElement("div");
    div.setAttribute("class", "card");
    div.innerHTML = finalArray[i-1];
    document.querySelector(".container").appendChild(div);
  }

// click animation
  let cards = document.getElementsByClassName("card");
  [].forEach.call(cards,function(element){
    element.addEventListener("click", function() {
      //    to do after click
    });
  });

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
