// TADY PŘIDÁVÁŠ DALŠÍ APLIKACE
// Stačí zkopírovat jeden blok a upravit název, popis, URL, GitHub URL, obrázek a kategorii.
// Náhledy aplikací dávej do složky images/ a cestu uveď do pole image.

const apps = [
  {
    name: "Nutrition Coach",
    description: "Aplikace pro jídelníčky, klienty, varianty potravin a generování PDF.",
    url: "https://TVUJ-GITHUB.github.io/nutrition-coach/",
    githubUrl: "https://github.com/TVUJ-GITHUB/nutrition-coach",
    image: "images/nutrition-coach.svg",
    icon: "🥗",
    category: "Fitness",
    tags: ["jídelníčky", "PDF", "klienti"],
    updated: "2026-06-06",
    favorite: true
  },
  {
    name: "Training Planner",
    description: "Správa tréninkových plánů, cviků, sérií a tréninkových dní.",
    url: "https://TVUJ-GITHUB.github.io/training-planner/",
    githubUrl: "https://github.com/TVUJ-GITHUB/training-planner",
    image: "images/training-planner.svg",
    icon: "🏋️",
    category: "Fitness",
    tags: ["trénink", "cviky", "plány"],
    updated: "2026-06-06",
    favorite: true
  },
  {
    name: "Finance App",
    description: "Osobní finance, přehledy, rozpočty, grafy a evidence výdajů.",
    url: "https://TVUJ-GITHUB.github.io/finance-app/",
    githubUrl: "https://github.com/TVUJ-GITHUB/finance-app",
    image: "images/finance-app.svg",
    icon: "💰",
    category: "Finance",
    tags: ["finance", "grafy", "rozpočet"],
    updated: "2026-06-06",
    favorite: false
  },
  {
    name: "Stock Coach",
    description: "Přehled IT akcií, vývoj cen, historie a základní investiční dashboard.",
    url: "https://TVUJ-GITHUB.github.io/stock-coach/",
    githubUrl: "https://github.com/TVUJ-GITHUB/stock-coach",
    image: "images/stock-coach.svg",
    icon: "📈",
    category: "Investice",
    tags: ["akcie", "IT", "investice"],
    updated: "2026-06-06",
    favorite: false
  },
  {
    name: "Competition Schedule",
    description: "Harmonogram soutěží, kategorií, časů a jednoduchý přehled pro závodníky.",
    url: "https://TVUJ-GITHUB.github.io/competition-schedule/",
    githubUrl: "https://github.com/TVUJ-GITHUB/competition-schedule",
    image: "images/competition-schedule.svg",
    icon: "🏆",
    category: "Soutěže",
    tags: ["harmonogram", "ICN", "závody"],
    updated: "2026-06-06",
    favorite: false
  }
];

const state = {
  search: "",
  category: "Vše"
};

const appsGrid = document.getElementById("appsGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilters = document.getElementById("categoryFilters");
const emptyState = document.getElementById("emptyState");
const resultInfo = document.getElementById("resultInfo");
const totalApps = document.getElementById("totalApps");
const totalCategories = document.getElementById("totalCategories");
const favoriteApps = document.getElementById("favoriteApps");
const currentYear = document.getElementById("currentYear");

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getCategories() {
  const categories = [...new Set(apps.map(app => app.category))].sort((a, b) => a.localeCompare(b, "cs"));
  return ["Vše", ...categories];
}

function formatDate(value) {
  if (!value) return "neuvedeno";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("cs-CZ");
}

function renderStats() {
  totalApps.textContent = apps.length;
  totalCategories.textContent = getCategories().length - 1;
  favoriteApps.textContent = apps.filter(app => app.favorite).length;
  currentYear.textContent = new Date().getFullYear();
}

function renderFilters() {
  categoryFilters.innerHTML = "";

  getCategories().forEach(category => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-button${state.category === category ? " active" : ""}`;
    button.textContent = category;
    button.addEventListener("click", () => {
      state.category = category;
      renderFilters();
      renderApps();
    });
    categoryFilters.appendChild(button);
  });
}

function appMatchesSearch(app) {
  const needle = normalizeText(state.search);
  if (!needle) return true;

  const haystack = normalizeText([
    app.name,
    app.description,
    app.category,
    app.updated,
    ...app.tags
  ].join(" "));

  return haystack.includes(needle);
}

function getFilteredApps() {
  return apps
    .filter(app => state.category === "Vše" || app.category === state.category)
    .filter(appMatchesSearch)
    .sort((a, b) => Number(b.favorite) - Number(a.favorite) || a.name.localeCompare(b.name, "cs"));
}

function renderApps() {
  const filteredApps = getFilteredApps();
  appsGrid.innerHTML = "";
  emptyState.hidden = filteredApps.length !== 0;
  resultInfo.textContent = `${filteredApps.length} z ${apps.length} aplikací`;

  filteredApps.forEach(app => {
    const card = document.createElement("article");
    card.className = `card${app.favorite ? " favorite" : ""}`;

    card.innerHTML = `
      <a class="preview-link" href="${app.url}" target="_blank" rel="noopener noreferrer" aria-label="Otevřít náhled aplikace ${app.name}">
        <img class="app-preview" src="${app.image}" alt="Náhled aplikace ${app.name}" loading="lazy" onerror="this.src='images/placeholder.svg'" />
      </a>
      <div class="card-body">
        <div class="card-title-row">
          <div class="card-icon" aria-hidden="true">${app.icon}</div>
          <div>
            <h3>${app.name}</h3>
            <span class="card-category">${app.category}</span>
          </div>
        </div>
        <p class="card-description">${app.description}</p>
        <div class="card-meta">
          ${app.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <div class="updated">Aktualizace: ${formatDate(app.updated)}</div>
        <div class="card-footer">
          <a class="card-link primary" href="${app.url}" target="_blank" rel="noopener noreferrer">Otevřít</a>
          <a class="card-link secondary" href="${app.githubUrl}" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    `;

    appsGrid.appendChild(card);
  });
}

searchInput.addEventListener("input", event => {
  state.search = event.target.value;
  renderApps();
});

renderStats();
renderFilters();
renderApps();
