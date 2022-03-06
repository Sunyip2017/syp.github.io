window.onload = function () {
  var box = document.querySelector(".text-box"),
  content = document.querySelector(".content"),
  text = document.querySelector(".text");
var textWidth = text.offsetWidth,
  boxWidth = box.offsetWidth;
  
  var Arraycolor = new Array(
    "#00FF66",
    "#FFFF99",
    "#99CCFF",
    "#FFCCFF",
    "#FFCC99",
    "#00FFFF",
    "#FFFF00",
    "#FFCC00",
    "#FF00FF"
  );
  var n = 0;
  function turncolors() {
    n++;
    if (n == Arraycolor.length - 1) n = 0;
    blink.style.color = Arraycolor[n];
  }
  setInterval(turncolors, 1000);



  checkScrollLeft();
  var box = document.querySelector('.text-box'),
    content = document.querySelector('.content'),
    text=document.querySelector('.text');
  var textWidth=text.offsetWidth,
    boxWidth = box.offsetWidth;


  function checkScrollLeft() {
    if (boxWidth >= textWidth) {
      return false;
    }
    content.innerHTML += content.innerHTML;
    document.querySelector(".text").classList.add("padding");
    textWidth = document.querySelector(".text").offsetWidth;
    toScrollLeft();
  }

  function toScrollLeft() {
    if (textWidth > box.scrollLeft) {
      box.scrollLeft++;
      setTimeout(toScrollLeft, 18);
    } else {
    }
  }
};
