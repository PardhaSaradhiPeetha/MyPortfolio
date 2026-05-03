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

// Mobile menu toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  const toggleMenu = document.getElementById("toggle-menu");
  const menuLinks = document.querySelectorAll(".menu a");

  // Close menu when a link is clicked
  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (toggleMenu) {
        toggleMenu.checked = false;
      }
    });
  });

  // Close menu when clicking outside
  const offMenu = document.querySelector(".off-menu");
  if (offMenu) {
    offMenu.addEventListener("click", function () {
      if (toggleMenu) {
        toggleMenu.checked = false;
      }
    });
  }

  // Contact form handler
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Validate form
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields");
        return;
      }

      // Create mailto link
      const mailtoLink = `mailto:pardhasaradhi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      // Open email client
      window.location.href = mailtoLink;

      // Reset form
      contactForm.reset();
      alert("Thank you for reaching out! Your email client will open.");
    });
  }
});

const text = document.getElementById("text-p2");
let index = 0;
let skills = ["MERN Stack","Linux", "Docker", "JAVA", "Python"];
function textChange() {
  text.innerText = skills[index];
  index = (index + 1) % skills.length;
}
setInterval(textChange, 2000);
