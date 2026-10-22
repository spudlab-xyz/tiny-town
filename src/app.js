import { town, indexTown } from "./data.js";
import { buildingIdFromHash } from "./navigation.js";
import { validateTown } from "./validate.js";
import { historyMarkup } from "./history.js";

const errors = validateTown(town);
if (errors.length) throw new Error(`Invalid town data:\n${errors.join("\n")}`);

const index = indexTown(town);
const map = document.querySelector("#town-map");
const list = document.querySelector("#location-list");
const detail = document.querySelector("#place-detail");
const announcement = document.querySelector("#announcement");
let activeView = "map";

const themeSelect = document.querySelector("#theme-select");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const themeColor = document.querySelector('meta[name="theme-color"]');

function storedTheme() {
  try { return localStorage.getItem("tiny-town-theme") ?? "system"; }
  catch { return "system"; }
}

function applyTheme(theme) {
  if (theme === "light" || theme === "dark") document.documentElement.dataset.theme = theme;
  else delete document.documentElement.dataset.theme;
  const effectiveDark = theme === "dark" || (theme === "system" && systemTheme.matches);
  themeColor.content = effectiveDark ? "#142219" : "#f7f6ef";
}

themeSelect.value = storedTheme();
applyTheme(themeSelect.value);
themeSelect.addEventListener("change", () => {
  try {
    if (themeSelect.value === "system") localStorage.removeItem("tiny-town-theme");
    else localStorage.setItem("tiny-town-theme", themeSelect.value);
  } catch {}
  applyTheme(themeSelect.value);
});
systemTheme.addEventListener("change", () => {
  if (themeSelect.value === "system") applyTheme("system");
});

const residentMarkup = (id) => {
  const resident = index.residents.get(id);
  return `<div class="resident"><span class="avatar" aria-hidden="true">${resident.avatar}</span><div><strong>${resident.name}</strong><small>${resident.role} · ${resident.pronouns}</small><p>${resident.bio}</p></div></div>`;
};

function setSelection(id) {
  document.querySelectorAll("[data-building]").forEach((button) => {
    const selected = button.dataset.building === id;
    button.setAttribute("aria-pressed", String(selected));
    button.classList.toggle("selected", selected);
  });
}

function clearBuilding() {
  setSelection(null);
  detail.hidden = true;
  detail.replaceChildren();
  announcement.textContent = "Town overview.";
}

function focusActiveView() {
  document.querySelector(activeView === "map" ? "#map-title" : "#directory-title").focus();
}

function openBuilding(id, updateHistory = true) {
  const building = index.buildings.get(id);
  if (!building) return clearBuilding();
  setSelection(id);
  detail.innerHTML = `<span class="eyebrow">${building.icon} Built and available to explore</span><h2>${building.name}</h2><p><strong>${building.description}</strong></p><h3>Purpose</h3><p>${building.purpose}</p><p>${building.detail}</p><h3>History</h3><p>${building.history}</p><h3>Who you’ll meet</h3>${building.residentIds.map(residentMarkup).join("")}<a class="back-town" href="#explore">← Back to town</a>`;
  detail.hidden = false;
  detail.querySelector(".back-town").addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState({}, "", `${location.pathname}${location.search}#explore`);
    clearBuilding();
    focusActiveView();
  });
  announcement.textContent = `Now exploring ${building.name}.`;
  if (updateHistory) history.pushState({ building: id }, "", `#${id}`);
}

for (const building of town.buildings) {
  const button = document.createElement("button");
  button.className = "map-place";
  button.style.cssText = `--x:${building.x}%;--y:${building.y}%;--place:${building.color}`;
  button.innerHTML = `<span aria-hidden="true">${building.icon}</span><strong>${building.name}</strong>`;
  button.setAttribute("aria-label", `Explore ${building.name}`);
  button.dataset.building = building.id;
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => openBuilding(building.id));
  map.append(button);

  const item = document.createElement("li");
  const names = building.residentIds.map((id) => index.residents.get(id).name).join(", ");
  item.innerHTML = `<button class="location-card" data-building="${building.id}" aria-pressed="false"><span class="card-icon" aria-hidden="true">${building.icon}</span><span><strong>${building.name}</strong><small>${building.description}</small><small><b>Purpose:</b> ${building.purpose}</small><small><b>History:</b> ${building.history}</small><small><b>Resident:</b> ${names}</small></span><span aria-hidden="true">↗</span></button>`;
  item.querySelector("button").addEventListener("click", () => openBuilding(building.id));
  list.append(item);
}

document.querySelector("#notices").innerHTML = town.notices.map((notice) => `<article><div><span class="tag" aria-label="Town seed. This is a fictional example included with Tiny Town. It is not a real community post, proposal, event, or commitment.">Town seed</span></div><h3>${notice.title}</h3><p>${notice.body}</p>${notice.residentId ? `<p><small>Posted by ${index.residents.get(notice.residentId).name}, a fictional Tiny Town resident.</small></p>` : ""}${notice.sourceUrl ? `<a href="${notice.sourceUrl}">View the team-authored proposal ↗</a>` : ""}</article>`).join("");
document.querySelector("#history").innerHTML = historyMarkup(town.history);

document.querySelectorAll("[data-view]").forEach((control) => control.addEventListener("click", () => {
  activeView = control.dataset.view;
  const showMap = activeView === "map";
  map.closest(".map-view").hidden = !showMap;
  list.closest(".list-view").hidden = showMap;
  document.querySelectorAll("[data-view]").forEach((button) => button.setAttribute("aria-pressed", String(button === control)));
  focusActiveView();
}));

function restoreFragment() {
  const id = buildingIdFromHash(index.buildings, location.hash);
  if (id) openBuilding(id, false);
  else clearBuilding();
}
window.addEventListener("popstate", restoreFragment);
restoreFragment();
