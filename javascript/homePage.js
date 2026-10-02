var hamburger = document.querySelector(".hamb");
var navlist = document.querySelector(".nav-list");
var links = document.querySelector(".nav-list .link");

hamburger .addEventListener("click",function(){
    this.classList.toggle("click");
    navlist.classList.toggle("open");
});

links.addEventListener("click",function(){
    alert("Updating....");
});