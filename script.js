window.onload = function() {

  let cards = document.getElementsByClassName("card");
  [].forEach.call(cards,function(element, index){
    cards[index].addEventListener("click", function() {
      this.style.background = "#ccc";
    });
  });


}
