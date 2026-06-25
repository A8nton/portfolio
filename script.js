/* =========================================================
   PROJECT DATA
   ---------------------------------------------------------
   Add new projects by pushing a new object into this array.
   No other code changes are required — the page renders
   everything below automatically.

   category    : "finished" | "prototype"
   youtube     : any standard YouTube URL (watch / youtu.be / embed)
   screenshots : array of paths to images inside the "Image" folder
                 of this repo (e.g. "Image/voidrunner-1.jpg")
   downloadUrl : OPTIONAL. Link to a downloadable build (zip, itch.io
                 page, Google Drive link, etc). Omit the field entirely
                 for projects that don't have a download.

   NOTE ON IMAGES
   All screenshot paths are relative to index.html, so keep every
   image inside a folder named "Image" at the root of the repo:

     /index.html
     /styles.css
     /script.js
     /Image/voidrunner-1.jpg
     /Image/voidrunner-2.jpg
     /Image/hollow-keep-1.jpg
     ...
========================================================= */
const PROJECTS = [
  {
    id: "dofika",
    title: "DOFika",
    category: "finished",
    youtube: "https://youtu.be/nQApe8txxeo",
    devDate: "March 3 2026 – June 6 2026",
    status: "Finished",
    team: "3 People",
    challenges: "Server-client communication, AI behaviour, Abilities",
    downloadUrl: "https://drive.google.com/drive/folders/1Ud_1GF2pg122JB9oQFr5DHXz74pSxnS9?usp=sharing",
    screenshots: [
      "Image/dofika-1.jpg",
      "Image/dofika-2.jpg",
      "Image/dofika-3.jpg"
    ]
  },
  {
    id: "platprot",
    title: "Simple Platformer",
    category: "prototype",
    youtube: "https://youtu.be/ODhHp1o8gxg",
    devDate: "June 7 2026 - June 7 2026 (3 hours)",
    status: "Prototype / Finished",
    team: "Solo Developer",
    challenges: "None",
    downloadUrl: "https://drive.google.com/drive/folders/1bFyM0iPQHdA8-XtC2pTRgKQVgr8mrzdV?usp=sharing",
    screenshots: [
      "Image/platprot-1.jpg",
      "Image/platprot-2.jpg",
      "Image/platprot-3.jpg"
    ]
  },
  {
    id: "tohof",
    title: "The Other Half of Life",
    category: "prototype",
    youtube: "https://youtu.be/kx74-ZIa9qo",
    devDate: "October 6 2025 – November 20 2025",
    status: "Prototype / Finished",
    team: "Solo Developer",
    challenges: "Physics gun, Level boundaries, Softlock prevention",
    downloadUrl: "https://drive.google.com/drive/folders/10k27gQBB2YPehX6T-yPM2SawLKh0tH_A?usp=sharing",
    screenshots: [
      "Image/tohof-1.jpg",
      "Image/tohof-2.jpg",
      "Image/tohof-3.jpg"
    ]
  },
  {
    id: "fnab",
    title: "Five Nights at Bei's",
    category: "prototype",
    youtube: "https://youtu.be/_rhbNyP18JM",
    devDate: "July 9 2025 - August 9 2025",
    status: "Prototype / Postponed",
    team: "Solo Developer",
    challenges: "Enemies logic, Nights pacing, animations",
    screenshots: [
      "Image/fnab-1.jpg",
      "Image/fnab-2.jpg",
      "Image/fnab-3.jpg"
    ]
  }
];

/* =========================================================
   HELPERS
========================================================= */

/** Extract a YouTube video ID from any common URL format. */
function getYouTubeId(url){
  const patterns = [
    /youtu\.be\/([A-Za-z0-9_-]{6,})/,
    /youtube\.com\/watch\?v=([A-Za-z0-9_-]{6,})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/
  ];
  for (const re of patterns){
    const match = url.match(re);
    if (match) return match[1];
  }
  return null;
}

function escapeHtml(str){
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* =========================================================
   RENDERING
========================================================= */

function renderProjectCard(project, index){
  const videoId = getYouTubeId(project.youtube);
  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}`
    : null;

  const card = document.createElement("article");
  card.className = "project-card";
  card.dataset.category = project.category;
  card.id = project.id;

  const categoryLabel = project.category === "finished" ? "Finished" : "Prototype";
  const orderNum = String(index + 1).padStart(2, "0");

  card.innerHTML = `
    <span class="project-tag ${project.category}">${categoryLabel}</span>

    <div class="project-header">
      <div class="project-title-block">
        <p class="project-index">PROJECT_${orderNum}</p>
        <h2 class="project-title">${escapeHtml(project.title)}</h2>
      </div>
      <div class="video-frame">
        ${
          embedUrl
            ? `<iframe
                src="${embedUrl}"
                title="${escapeHtml(project.title)} gameplay video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>`
            : `<div class="empty-state">Video unavailable</div>`
        }
      </div>
    </div>

    <div class="project-body">
      <div class="stat-panel">
        <p class="stat-panel-label">// project_data</p>
        <ul class="stat-list">
          <li>
            <span class="stat-key">Dev Date</span>
            <span class="stat-value">${escapeHtml(project.devDate)}</span>
          </li>
          <li>
            <span class="stat-key">Status</span>
            <span class="stat-value">
              <span class="status-dot ${project.category}"></span>${escapeHtml(project.status)}
            </span>
          </li>
          <li>
            <span class="stat-key">Team</span>
            <span class="stat-value">${escapeHtml(project.team)}</span>
          </li>
          <li>
            <span class="stat-key">Challenges</span>
            <span class="stat-value">${escapeHtml(project.challenges)}</span>
          </li>
        </ul>

        ${
          project.downloadUrl
            ? `<a class="download-btn" href="${escapeHtml(project.downloadUrl)}" target="_blank" rel="noopener noreferrer">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><polyline points="7 10 12 15 17 10"/><path d="M5 21h14"/></svg>
                Download project
              </a>`
            : ""
        }
      </div>

      <div class="gallery" aria-label="${escapeHtml(project.title)} screenshots">
        <button class="gallery-nav prev" type="button" aria-label="Previous screenshot">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <div class="gallery-viewport">
          ${project.screenshots.map((src, i) => `
            <img src="${src}" alt="${escapeHtml(project.title)} screenshot ${i + 1}" loading="lazy" />
          `).join("")}
        </div>
        <button class="gallery-nav next" type="button" aria-label="Next screenshot">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </div>
  `;

  return card;
}

function renderAllProjects(){
  const container = document.getElementById("projects");
  container.innerHTML = "";
  PROJECTS.forEach((project, index) => {
    container.appendChild(renderProjectCard(project, index));
  });
  wireGalleries(container);
}

/* =========================================================
   GALLERY NAVIGATION
========================================================= */
function wireGalleries(scope){
  scope.querySelectorAll(".gallery").forEach((gallery) => {
    const viewport = gallery.querySelector(".gallery-viewport");
    const prevBtn = gallery.querySelector(".prev");
    const nextBtn = gallery.querySelector(".next");

    const scrollByCard = (direction) => {
      const card = viewport.querySelector("img");
      const cardWidth = card ? card.getBoundingClientRect().width + 14 : viewport.clientWidth * 0.8;
      viewport.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
    };

    prevBtn.addEventListener("click", () => scrollByCard(-1));
    nextBtn.addEventListener("click", () => scrollByCard(1));
  });
}

/* =========================================================
   FILTERS
========================================================= */
function applyFilter(filterValue){
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card) => {
    const matches = filterValue === "all" || card.dataset.category === filterValue;

    if (matches){
      card.hidden = false;
      // allow the browser to register the un-hide before removing the hide class
      requestAnimationFrame(() => card.classList.remove("is-hiding"));
    } else {
      card.classList.add("is-hiding");
      window.setTimeout(() => {
        if (card.classList.contains("is-hiding")) card.hidden = true;
      }, 320);
    }
  });
}

function wireFilters(){
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      applyFilter(btn.dataset.filter);
    });
  });
}

/* =========================================================
   INIT
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  renderAllProjects();
  wireFilters();

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
