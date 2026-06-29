const SOURCE_URL =
  "https://robert-fiedor.github.io/youtube-transcriptions/transcripts/4PqGPZtyFtw/4PqGPZtyFtw.txt";

const entries = [
  {
    id: "short-story-method",
    title: "Short Story Method",
    type: "Transcript extract",
    sourceUrl: SOURCE_URL,
    sourceStatus:
      "The supplied transcript does not mention PlayStation, PS5 games, or controller shortcuts. These rows are the shortcuts/steps actually present in that source.",
    shortcuts: [
      {
        shortcut: "Use real life",
        name: "Start with something that happened to you",
        effect:
          "Use a personal experience as raw material, then fictionalize details to add stakes and shape.",
      },
      {
        shortcut: "Change POV",
        name: "Rewrite from another point of view",
        effect:
          "Rotate through perspectives until the story belongs to the character with the strongest stake.",
      },
      {
        shortcut: "Ticking clock",
        name: "Add a countdown",
        effect:
          "Give the story pressure by counting down to a tournament, deadline, trip ending, event, or decision.",
      },
      {
        shortcut: "Object",
        name: "Choose a meaningful prop",
        effect:
          "Use an object with emotional weight that appears across the story and changes what characters do.",
      },
      {
        shortcut: "Transition",
        name: "Find the 'and then one day' moment",
        effect:
          "Move the character from one mode of life into another, even if the shift is small or internal.",
      },
      {
        shortcut: "World event",
        name: "Anchor the story in something recognizable",
        effect:
          "Connect the story to a public event, holiday, trend, or familiar reference so readers have a way in.",
      },
      {
        shortcut: "Opposites",
        name: "Create binary forces",
        effect:
          "Set up opposing people, values, or roles so the story has natural friction and conflict.",
      },
      {
        shortcut: "Plot shape",
        name: "Use Freytag's Pyramid or another structure",
        effect:
          "Arrange exposition, rising action, climax, falling action, and ending so the story escalates cleanly.",
      },
      {
        shortcut: "Experiment",
        name: "Try one formal risk",
        effect:
          "Break the pattern with a form constraint, metafiction, an unreliable narrator, or another unusual move.",
      },
    ],
  },
];

const gameNav = document.querySelector("#gameNav");
const selectedType = document.querySelector("#selectedType");
const selectedTitle = document.querySelector("#selectedTitle");
const sourceLink = document.querySelector("#sourceLink");
const shortcutTable = document.querySelector("#shortcutTable");
const searchInput = document.querySelector("#searchInput");
const sourceAlert = document.querySelector("#sourceAlert");

let selectedId = entries[0].id;
let query = "";

function matchesQuery(entry) {
  if (!query) return true;
  const haystack = [
    entry.title,
    entry.type,
    ...entry.shortcuts.flatMap((item) => [item.shortcut, item.name, item.effect]),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function filteredShortcuts(entry) {
  if (!query) return entry.shortcuts;
  return entry.shortcuts.filter((item) =>
    [item.shortcut, item.name, item.effect].join(" ").toLowerCase().includes(query)
  );
}

function renderNav() {
  gameNav.replaceChildren();
  entries.forEach((entry) => {
    const button = document.createElement("button");
    button.className = "game-button";
    button.type = "button";
    button.setAttribute("aria-current", entry.id === selectedId ? "true" : "false");
    button.hidden = !matchesQuery(entry);
    button.innerHTML = `
      <span class="game-title"></span>
      <span class="game-meta"></span>
    `;
    button.querySelector(".game-title").textContent = entry.title;
    button.querySelector(".game-meta").textContent = `${entry.shortcuts.length} shortcuts`;
    button.addEventListener("click", () => {
      selectedId = entry.id;
      render();
    });
    gameNav.append(button);
  });
}

function renderDetail() {
  const visibleEntries = entries.filter(matchesQuery);
  const selected = visibleEntries.find((entry) => entry.id === selectedId) || visibleEntries[0] || entries[0];
  selectedId = selected.id;

  selectedType.textContent = selected.type;
  selectedTitle.textContent = selected.title;
  sourceLink.href = selected.sourceUrl;
  sourceAlert.hidden = !selected.sourceStatus;
  sourceAlert.textContent = selected.sourceStatus || "";

  const rows = filteredShortcuts(selected);
  shortcutTable.replaceChildren();

  if (!rows.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No shortcuts match this search.";
    shortcutTable.append(empty);
    return;
  }

  rows.forEach((item) => {
    const row = document.createElement("article");
    row.className = "shortcut-row";

    const key = document.createElement("div");
    key.className = "shortcut-key";
    key.textContent = item.shortcut;

    const copy = document.createElement("div");
    copy.className = "shortcut-copy";
    const name = document.createElement("strong");
    name.textContent = item.name;
    const effect = document.createElement("p");
    effect.textContent = item.effect;

    copy.append(name, effect);
    row.append(key, copy);
    shortcutTable.append(row);
  });
}

function render() {
  renderNav();
  renderDetail();
}

searchInput.addEventListener("input", (event) => {
  query = event.target.value.trim().toLowerCase();
  render();
});

render();
