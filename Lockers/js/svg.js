var arr = document.getElementsByClassName("svg");

for (var k=0; k<arr.length; k++) {
  arr[k].addEventListener("mouseover", function(){ mousein(this); });
  arr[k].addEventListener("mouseout", function(){ mouseout(this); });
}

function mousein(element) {
  element.setAttribute("fill", "red");
}

function mouseout(element) {
  element.setAttribute("fill", "green");
}
