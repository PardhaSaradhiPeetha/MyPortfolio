//Skills Cards
fetch("../sources/skills.json")
  .then((response) => response.json())
  .then((data) => {
    const cardContainer = document.querySelector(
      ".skill-experience .cards-container"
    );
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
    const timelineWidth = lastTimelineItem.offsetLeft + lastTimelineItem.offsetWidth / 2 - timeline.offsetLeft;
    timeline.style.width = `${timelineWidth}px`;
  })
  .catch((error) => console.error("Error:", error));

//Projects
fetch("../sources/projects.json")
  .then((response) => response.json())
  .then((data) => {
    const cardContainer = document.querySelector(".projects .cards-container");
    data.forEach((project) => {
      const cardHTML = `
        <div class="card">
          <img src="${project.image}" alt="Project Image" />
          <a href="#">
            <h1 class="project-title">${project.title}</h1>
          </a>
          <p class="project-description">${project.description}</p>
          <div class="btn-container">
            <button class="btn-one" onclick="window.location.href ='${project.github}'"> GitHub </button>
            <button class="btn-two" onclick="window.location.href ='${project.liveDemo}'">Live Demo</button>
          </div>
        </div>
      `;
      cardContainer.insertAdjacentHTML("beforeend", cardHTML);
    });
  })
  .catch((error) => console.error("Error:", error));
//Certifications
fetch("../sources/certificates.json")
  .then((response) => response.json())
  .then((data) => {
    const cardContainer = document.querySelector(
      ".achievement-certifications .cards-container"
    );
    data.forEach((certificate) => {
      const cardHTML = `
        <div class="card">
          <img src="${certificate.image}" alt="Certificate Image" />
          <a href="#">
            <h1 class="certificate-title">${certificate.title}</h1>
          </a>
          <a href="${certificate.link}">View></a>
        </div>
      `;
      cardContainer.insertAdjacentHTML("beforeend", cardHTML);
    });
  })
  .catch((error) => console.error("Error:", error));
