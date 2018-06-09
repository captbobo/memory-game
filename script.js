
window.onload = function() {

// create divs for cards
  let lvl = 16;
  for(let i = 1; i <= lvl; i++){
    let div = document.createElement("div");
    div.setAttribute("class", "card");
    div.innerHTML = i;
    document.querySelector(".container").appendChild(div);
  }

// assign a value/image/vector for each card


// click animation
  let cards = document.getElementsByClassName("card");
  [].forEach.call(cards,function(element){
    element.addEventListener("click", function() {
      //    to do after click
    });
  });


// random integer generator with a ceiling
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


}
