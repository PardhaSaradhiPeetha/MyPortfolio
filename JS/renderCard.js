const DEFAULT_PROJECT_IMAGE = "../assets/bg1.jpeg";
const DEFAULT_CERT_IMAGE = "../assets/bg1.jpeg";

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
  const projectsCountElement = document.getElementById("projects-count");
  const certificationsCountElement = document.getElementById("certifications-count");

  if (totalProblemsElement) {
    totalProblemsElement.textContent = totalProblemsSolved;
  }
  if (problemBreakdownElement) {
    problemBreakdownElement.textContent = `LeetCode: ${leetCodeSolved} | GFG: ${gfgSolved}`;
  }
  if (projectsCountElement) {
    projectsCountElement.textContent = projects.length;
  }
  if (certificationsCountElement) {
    certificationsCountElement.textContent = certificates.length;
  }
}

fetch("../sources/skills.json")
  .then((response) => response.json())
  .then((data) => {
    const cardContainer = document.querySelector(".skill-experience .cards-container");
    data.forEach((skill) => {
      const cardHTML = `
        <div class="timeline-item">
          <div class="time-dot"></div>
          <div class="card">
            <h1>${skill.title}</h1>
            ${skill.details.map((detail) => `<div>${detail}</div>`).join("")}
          </div>
        </div>
      `;
      cardContainer.insertAdjacentHTML("beforeend", cardHTML);
    });

    const timeline = document.querySelector(".timeline");
    const timelineItems = document.querySelectorAll(".timeline-item");
    const lastTimelineItem = timelineItems[timelineItems.length - 1];

    if (timeline && lastTimelineItem) {
      const timelineWidth =
        lastTimelineItem.offsetLeft + lastTimelineItem.offsetWidth / 2 - timeline.offsetLeft;
      timeline.style.width = `${timelineWidth}px`;
    }
  })
  .catch((error) => console.error("Error:", error));

Promise.all([
  fetch("../sources/stats.json").then((response) => response.json()),
  fetch("../sources/projects.json").then((response) => response.json()),
  fetch("../sources/certificates.json").then((response) => response.json()),
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
