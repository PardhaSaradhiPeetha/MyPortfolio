window.addEventListener("load", ImgSecure);
window.addEventListener("load", () => {
  let currentYear = new Date();
  document.getElementById("current-year").innerText = currentYear.getFullYear();
});

window.addEventListener("pageshow", () => {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
});

function ImgSecure() {
  console.log(window.innerWidth, window.outerWidth);
  document.addEventListener("contextmenu", function (event) {
    if (event.target.tagName === "IMG") {
      event.preventDefault();
    }
  });
}

// Mobile menu toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  const toggleMenu = document.getElementById("toggle-menu");
  const menuLinks = document.querySelectorAll(".menu a");
  const menu = document.getElementById("menu");

  const syncMenuState = () => {
    if (!toggleMenu || !menu) {
      return;
    }
    menu.setAttribute("aria-hidden", String(!toggleMenu.checked));
  };

  syncMenuState();

  if (toggleMenu) {
    toggleMenu.addEventListener("change", syncMenuState);
  }

  // Close menu when a link is clicked
  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (toggleMenu) {
        toggleMenu.checked = false;
        syncMenuState();
      }
    });
  });

  // Close menu when clicking outside
  const offMenu = document.querySelector(".off-menu");
  if (offMenu) {
    offMenu.addEventListener("click", function () {
      if (toggleMenu) {
        toggleMenu.checked = false;
        syncMenuState();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggleMenu?.checked) {
      toggleMenu.checked = false;
      syncMenuState();
    }
  });

  // Contact form handler lives in `js/contact.js`
});

const text = document.getElementById("text-p2");
let index = 0;
let skills = ["MERN Stack", "Linux", "Docker", "JAVA", "Python"];
function textChange() {
  text.innerText = skills[index];
  index = (index + 1) % skills.length;
}
setInterval(textChange, 2000);
