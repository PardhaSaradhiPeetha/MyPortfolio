const DEFAULT_PROJECT_IMAGE = "assets/images/bg1.jpeg";
const DEFAULT_CERT_IMAGE = "assets/images/bg1.jpeg";

function normalizeLink(link) {
  const normalizedLink = String(link || "").trim();

  if (!normalizedLink || normalizedLink === "#") {
    return "#";
  }
  return normalizedLink;
}

function hasUsableLink(link) {
  return normalizeLink(link) !== "#";
}

function openExternal(link) {
  if (!hasUsableLink(link)) {
    return;
  }
  window.open(link, "_blank");
}

function fetchJSON(path) {
  return fetch(path).then((response) => response.json());
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function renderList(container, items, renderItem) {
  if (!container) {
    return;
  }
  container.innerHTML = items.map(renderItem).join("");
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getSkillInitials(title) {
  const words = String(title || "Skill")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

function renderSkillIcon(skill) {
  const title = skill.title || "Skill";

  if (skill.icon) {
    return `
      <span class="skill-icon" aria-hidden="true">
        <img src="${escapeHTML(skill.icon)}" alt="" />
      </span>
    `;
  }

  return `
    <span class="skill-icon skill-icon-fallback" aria-hidden="true">
      ${escapeHTML(getSkillInitials(title))}
    </span>
  `;
}

function renderSkillCard(skill) {
  const details = Array.isArray(skill.details) ? skill.details : [];
  const accent = skill.accent || "#2563eb";

  return `
    <div class="skill-card" style="--skill-accent: ${escapeHTML(accent)}">
      <div class="skill-card-header">
        ${renderSkillIcon(skill)}
        <div>
          <p class="skill-eyebrow">Core Skill</p>
          <h3 class="skill-title">${escapeHTML(skill.title || "Skill")}</h3>
        </div>
      </div>
      <div class="skill-tags">
        ${details.map((detail) => `<span class="skill-tag">${escapeHTML(detail)}</span>`).join("")}
      </div>
    </div>
  `;
}

function renderCardImage(src, alt) {
  return `<img src="${escapeHTML(src)}" alt="${escapeHTML(alt)}" />`;
}

function renderProjectButton(label, link, className) {
  const normalizedLink = normalizeLink(link);
  const disabled = !hasUsableLink(normalizedLink);

  return `
    <button
      class="${className}"
      ${disabled ? "disabled" : `onclick="openExternal('${escapeHTML(normalizedLink)}')"`}
      type="button"
    >
      ${disabled ? `${label} Soon` : label}
    </button>
  `;
}

function renderProjectCard(project) {
  const imageUrl = project.image || DEFAULT_PROJECT_IMAGE;
  const title = project.title || "Project";
  const githubLink = normalizeLink(project.github);
  const demoLink = normalizeLink(project.demo || project.liveDemo);

  return `
    <div class="card">
      ${renderCardImage(imageUrl, `${title} preview`)}
      <h1 class="project-title">${escapeHTML(title)}</h1>
      <p class="project-description">${escapeHTML(project.description || "")}</p>
      <div class="btn-container">
        ${renderProjectButton("GitHub", githubLink, "btn-one")}
        ${renderProjectButton("Live Demo", demoLink, "btn-two")}
      </div>
    </div>
  `;
}

function renderCertificateLink(link) {
  const normalizedLink = normalizeLink(link);

  if (!hasUsableLink(normalizedLink)) {
    return `<span class="certificate-placeholder">Credential link coming soon</span>`;
  }

  return `<a href="${escapeHTML(normalizedLink)}" target="_blank">View Certificate</a>`;
}

function renderCertificateCard(certificate) {
  const imageUrl = certificate.image || DEFAULT_CERT_IMAGE;
  const title = certificate.title || "Certificate";

  return `
    <div class="card">
      ${renderCardImage(imageUrl, `${title} certificate`)}
      <h1 class="certificate-title">${escapeHTML(title)}</h1>
      ${renderCertificateLink(certificate.link)}
    </div>
  `;
}

function bindProfileLink(elementId, url) {
  const element = document.getElementById(elementId);

  if (!element) {
    return;
  }

  element.setAttribute("href", normalizeLink(url));
  element.addEventListener("click", (event) => {
    event.preventDefault();
    openExternal(url);
  });
}

function renderDashboardStats(stats, projects, certificates) {
  const leetCodeSolved = stats?.leetcode?.solved || 0;
  const gfgSolved = stats?.gfg?.solved || 0;
  const totalProblemsSolved = leetCodeSolved + gfgSolved;

  setText("problems-solved-total", totalProblemsSolved);
  setText("leet-count", leetCodeSolved);
  setText("gfg-count", gfgSolved);
  setText("projects-count", projects.length);
  setText("certifications-count", certificates.length);

  bindProfileLink("leet-link", stats?.leetcode?.Profile || "#");
  bindProfileLink("gfg-link", stats?.gfg?.Profile || "#");
}

fetchJSON("data/skills.json")
  .then((skills) => {
    const skillsGrid = document.querySelector(".skill-experience .skills-grid");
    if (!skillsGrid) {
      console.error("Error: Skills grid container not found");
      return;
    }

    renderList(skillsGrid, skills, renderSkillCard);
  })
  .catch((error) => console.error("Error:", error));

Promise.all([
  fetchJSON("data/stats.json"),
  fetchJSON("data/projects.json"),
  fetchJSON("data/certificates.json"),
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

    renderList(projectsContainer, projects, renderProjectCard);
    renderList(certificationsContainer, certificates, renderCertificateCard);
    renderDashboardStats(stats, projects, certificates);
  })
  .catch((error) => console.error("Error:", error));
