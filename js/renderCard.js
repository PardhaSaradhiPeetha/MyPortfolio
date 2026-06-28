const DEFAULT_PROJECT_IMAGE = "assets/images/bg1.jpeg";
const DEFAULT_CERT_IMAGE = "assets/images/bg1.jpeg";

function normalizeLink(link) {
  if (!link || link === "#") {
    return "#";
  }
  return link;
}

function openExternal(link) {
  if (!link || link === "#") {
    return;
  }
  window.open(link, "_blank");
}

function renderDashboardStats(stats, projects, certificates) {
  const leetCodeSolved = stats?.leetcode?.solved || 0;
  const gfgSolved = stats?.gfg?.solved || 0;
  const totalProblemsSolved = leetCodeSolved + gfgSolved;

  const totalProblemsElement = document.getElementById("problems-solved-total");
  const problemBreakdownElement = document.getElementById("problem-breakdown");
  const leetLink = document.getElementById("leet-link");
  const gfgLink = document.getElementById("gfg-link");
  const leetCountEl = document.getElementById("leet-count");
  const gfgCountEl = document.getElementById("gfg-count");
  const projectsCountElement = document.getElementById("projects-count");
  const certificationsCountElement = document.getElementById("certifications-count");

  if (totalProblemsElement) {
    totalProblemsElement.textContent = totalProblemsSolved;
  }
  if (leetCountEl) {
    leetCountEl.textContent = leetCodeSolved;
  }
  if (gfgCountEl) {
    gfgCountEl.textContent = gfgSolved;
  }
  if (leetLink) {
    const url = stats?.leetcode?.Profile || "#";
    leetLink.setAttribute("href", normalizeLink(url));
    leetLink.addEventListener("click", (e) => {
      e.preventDefault();
      openExternal(url);
    });
  }
  if (gfgLink) {
    const url = stats?.gfg?.Profile || "#";
    gfgLink.setAttribute("href", normalizeLink(url));
    gfgLink.addEventListener("click", (e) => {
      e.preventDefault();
      openExternal(url);
    });
  }
  if (projectsCountElement) {
    projectsCountElement.textContent = projects.length;
  }
  if (certificationsCountElement) {
    certificationsCountElement.textContent = certificates.length;
  }
}

fetch("data/skills.json")
  .then((response) => response.json())
  .then((data) => {
    const skillsGrid = document.querySelector(".skill-experience .skills-grid");
    if (!skillsGrid) {
      console.error("Error: Skills grid container not found");
      return;
    }

    data.forEach((skill) => {
      const details = Array.isArray(skill.details) ? skill.details : [];
      const cardHTML = `
        <div class="skill-card">
          <h3 class="skill-title">${skill.title || "Skill"}</h3>
          <div class="skill-tags">
            ${details.map((detail) => `<span class="skill-tag">${detail}</span>`).join("")}
          </div>
        </div>
      `;
      skillsGrid.insertAdjacentHTML("beforeend", cardHTML);
    });
  })
  .catch((error) => console.error("Error:", error));

Promise.all([
  fetch("data/stats.json").then((response) => response.json()),
  fetch("data/projects.json").then((response) => response.json()),
  fetch("data/certificates.json").then((response) => response.json()),
])
  .then(([stats, projects, certificates]) => {
    const projectsContainer = document.querySelector(".projects .cards-container");
    const certificationsContainer = document.querySelector(
      ".certifications .cards-container"
    );

    if (!projectsContainer || !certificationsContainer) {
      console.error("Error: Required DOM containers not found");
      return;
    }

    projects.forEach((project) => {
      const githubLink = normalizeLink(project.github);
      const demoLink = normalizeLink(project.demo || project.liveDemo);
      const imageUrl = project.image || DEFAULT_PROJECT_IMAGE;

      const cardHTML = `
        <div class="card">
          <img src="${imageUrl}" alt="${project.title} preview" />
          <h1 class="project-title">${project.title}</h1>
          <p class="project-description">${project.description}</p>
          <div class="btn-container">
            <button class="btn-one" onclick="openExternal('${githubLink}')">GitHub</button>
            <button class="btn-two" onclick="openExternal('${demoLink}')">Live Demo</button>
          </div>
        </div>
      `;

      projectsContainer.insertAdjacentHTML("beforeend", cardHTML);
    });

    certificates.forEach((certificate) => {
      const certLink = normalizeLink(certificate.link);
      const imageUrl = certificate.image || DEFAULT_CERT_IMAGE;

      const cardHTML = `
        <div class="card">
          <img src="${imageUrl}" alt="${certificate.title} certificate" />
          <h1 class="certificate-title">${certificate.title}</h1>
          <a href="${certLink}" target="_blank">${certLink === "#" ? "Link Coming Soon" : "View Certificate"}</a>
        </div>
      `;

      certificationsContainer.insertAdjacentHTML("beforeend", cardHTML);
    });

    renderDashboardStats(stats, projects, certificates);
  })
  .catch((error) => console.error("Error:", error));
