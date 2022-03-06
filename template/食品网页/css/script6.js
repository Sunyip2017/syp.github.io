window.onload = function () {
  var box = document.querySelector(".text-box"),
    content = document.querySelector(".content"),
    text = document.querySelector(".text");
  var textWidth = text.offsetWidth,
    boxWidth = box.offsetWidth;
  function $(name) {
    if (name[0] == "#") {
      return document.getElementById(name.substr(1));
    } else if (name[0] == ".") {
      return document.getElementsByClassName(name.substr(1));
    } else {
      return document.getElementsByTagName(name);
    }
  }
  for (var i = 0; i < $("img").length; i++) {
    $("img")[i].addEventListener("mouseover", function () {
      this.style.transform = "scale(1.1)";
    });
  }
  for (var i = 0; i < $("img").length; i++) {
    $("img")[i].addEventListener("mouseout", function () {
      this.style.transform = "scale(1)";
    });
  }
  checkScrollLeft();

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
