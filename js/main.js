const CORE_SKILLS = [
  "Full Stack Developer",
  "MERN Stack",
  "REST APIs",
  "Java",
  "Python",
  "Problem Solving",
  "Linux",
  "Docker",
];

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
  document.addEventListener("contextmenu", function (event) {
    if (event.target.tagName === "IMG") {
      event.preventDefault();
    }
  });
}

function createMarqueeSkill(label, isDuplicate = false) {
  const skill = document.createElement("span");
  skill.textContent = label;

  if (isDuplicate) {
    skill.setAttribute("aria-hidden", "true");
  }

  return skill;
}

function renderSkillMarquee() {
  const marqueeTrack = document.querySelector(".skill-marquee-track");

  if (!marqueeTrack) {
    return;
  }

  const fragment = document.createDocumentFragment();

  CORE_SKILLS.forEach((skill) => {
    fragment.appendChild(createMarqueeSkill(skill));
  });

  CORE_SKILLS.forEach((skill) => {
    fragment.appendChild(createMarqueeSkill(skill, true));
  });

  marqueeTrack.replaceChildren(fragment);
}

// Mobile menu toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  renderSkillMarquee();

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

});
