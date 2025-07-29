window.addEventListener("load", ImgSecure);
window.addEventListener("load", () => {
  let currentYear = new Date();
  document.getElementById("current-year").innerText = currentYear.getFullYear();
});

function ImgSecure() {
  console.log(window.innerWidth, window.outerWidth);
  document.addEventListener("contextmenu", function (event) {
    if (event.target.tagName === "IMG") {
      event.preventDefault();
    }
  });
}
function toggleMenu() {
  const hamburger = document.getElementById("burger-icon");
  hamburger.classList.toggle("active");
  const menu = document.getElementById("menu");
  menu.classList.toggle("show-menu");
}

const text = document.getElementById("text-p2");
let index = 0;
let skills = ["Web Developer", "UI/UX", "JAVA", "Python"];
function textChange() {
  text.innerText = skills[index];
  index = (index + 1) % skills.length;
}
setInterval(textChange, 2000);
