// Code goes here!
console.log("I work!");
var element = document.getElementById("project-input");
console.log("elementtt", element);
var myChild = document.createElement("p");
myChild.innerHTML = "KUK";
var form = element.querySelectorAll("form")[0];
document.getElementById("app").appendChild(form);
