/* =========================================================
   PROJECT DATA
   ---------------------------------------------------------
   Add new projects by pushing a new object into this array.
   No other code changes are required — the page renders
   everything below automatically.

   category : "finished" | "prototype"
   youtube  : any standard YouTube URL (watch / youtu.be / embed)
   screenshots : array of image URLs (any size, will be cropped)
========================================================= */
const PROJECTS = [
  {
    id: "voidrunner",
    title: "Voidrunner",
    category: "finished",
    youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    devDate: "January 2025 – March 2025",
    status: "Finished",
    team: "Solo Developer",
    challenges: "AI behavior, performance optimization, procedural level generation",
    screenshots: [
      "https://picsum.photos/seed/voidrunner1/640/400",
      "https://picsum.photos/seed/voidrunner2/640/400",
      "https://picsum.photos/seed/voidrunner3/640/400",
      "https://picsum.photos/seed/voidrunner4/640/400"
    ]
  },
  {
    id: "hollow-keep",
    title: "Hollow Keep",
    category: "finished",
    youtube: "https://youtu.be/dQw4w9WgXcQ",
    devDate: "June 2024 – November 2024",
    status: "Finished",
    team: "Team of 4 (Designer, 2 Programmers, Artist)",
    challenges: "Multiplayer netcode, save system architecture, art pipeline consistency",
    screenshots: [
      "https://picsum.photos/seed/hollowkeep1/640/400",
      "https://picsum.photos/seed/hollowkeep2/640/400",
      "https://picsum.photos/seed/hollowkeep3/640/400"
    ]
  },
  {
    id: "echo-tactics",
    title: "Echo Tactics",
    category: "prototype",
    youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    devDate: "April 2025 – Present",
    status: "Prototype / In Progress",
    team: "Solo Developer",
    challenges: "Turn-based combat balancing, deterministic simulation, UI/UX for tactics grid",
    screenshots: [
      "https://picsum.photos/seed/echotactics1/640/400",
      "https://picsum.photos/seed/echotactics2/640/400"
    ]
  },
  {
    id: "driftform",
    title: "Driftform",
    category: "prototype",
    youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    devDate: "February 2026",
    status: "Prototype",
    team: "Solo Developer",
    challenges: "Soft-body physics, vehicle handling feel, shader-based deformation",
    screenshots: [
      "https://picsum.photos/seed/driftform1/640/400",
      "https://picsum.photos/seed/driftform2/640/400",
      "https://picsum.photos/seed/driftform3/640/400"
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
