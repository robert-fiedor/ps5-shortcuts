const SOURCE_URL =
  "https://robert-fiedor.github.io/youtube-transcriptions/transcripts/DSD_fAtBQc4-The-Ultimate-CQC-Guide---Metal-Gear-Solid-DELTA-Snake-Eater/DSD_fAtBQc4-The-Ultimate-CQC-Guide---Metal-Gear-Solid-DELTA-Snake-Eater.txt";

const entries = [
  {
    id: "mgs-delta-cqc",
    title: "Metal Gear Solid Delta: Snake Eater",
    type: "CQC controls",
    sourceUrl: SOURCE_URL,
    sourceStatus: "",
    shortcuts: [
      {
        shortcut: "R2, R2, R2",
        name: "Three-hit CQC combo",
        effect:
          "Walk up to an enemy and press the CQC button three times. Snake throws two punches and a kick that knocks the enemy down.",
      },
      {
        shortcut: "R2 once or twice",
        name: "Controlled punch combo",
        effect:
          "Use one or two punches, pause for Snake to reset, then repeat. This avoids the unpredictable launch from the full three-hit combo.",
      },
      {
        shortcut: "Left stick + R2",
        name: "CQC slam or throwdown",
        effect:
          "Press R2 while pointing the analog stick in a direction to immediately throw the enemy down to the ground.",
      },
      {
        shortcut: "R2 on attack",
        name: "Parry a close-range knife attack",
        effect:
          "When an alerted enemy swings at close range, time R2 to parry and throw them down. Works best with a CQC-compatible weapon.",
      },
      {
        shortcut: "Triangle",
        name: "Dive roll into an enemy",
        effect:
          "Press Triangle while moving to dive into an enemy. It can knock enemies out after repeated hits and leaves them stunned briefly.",
      },
      {
        shortcut: "Hold Triangle",
        name: "Drop into crawl",
        effect:
          "Hold Triangle instead of tapping it to fall to the ground and enter Snake's crawl animation.",
      },
      {
        shortcut: "Mk22 + Triangle",
        name: "Instant tranquilizer finish",
        effect:
          "Shoot an enemy in the body with the tranquilizer, then dive roll into them to trigger the tranquilizer effect immediately.",
      },
      {
        shortcut: "Hold Square",
        name: "Drag a downed body",
        effect:
          "Stand over a knocked-out enemy and hold Square to drag the body away from patrol routes or visible spots.",
      },
      {
        shortcut: "Hold R2",
        name: "Grab an enemy from behind",
        effect:
          "Approach from behind and hold R2 to restrain the enemy. From this hold, you can interrogate, choke, slit, drag, throw, or use them as cover.",
      },
      {
        shortcut: "Hold R2 + hold L3",
        name: "Interrogate",
        effect:
          "Keep holding the enemy with R2, then press and hold L3 to make them talk, insult Snake, or reveal information.",
      },
      {
        shortcut: "Tap R2 repeatedly",
        name: "Choke out or snap neck",
        effect:
          "While holding an enemy, tap R2 repeatedly to choke them out. Continuing after the knockout snaps their neck and counts as a kill.",
      },
      {
        shortcut: "X",
        name: "Slit throat",
        effect:
          "While holding an enemy from behind, press X to slit their throat. The transcript notes this remake control changed from the older version.",
      },
      {
        shortcut: "Hold R2 + move",
        name: "Drag a held enemy",
        effect:
          "Keep holding R2 and push the analog stick to walk the restrained enemy to another spot. Holding them too long can knock them out.",
      },
      {
        shortcut: "Hold R2 + up/down",
        name: "Throw from a hold",
        effect:
          "While restraining an enemy, press R2 with up or down on the analog stick to throw them in front of or behind Snake.",
      },
      {
        shortcut: "Aim at downed enemy",
        name: "Freeze on the ground",
        effect:
          "After knocking an enemy down with a roll, kick, grab, or throw, quickly point your weapon at them to make them stay frozen.",
      },
      {
        shortcut: "Shoot near body",
        name: "Shake out items",
        effect:
          "Once an enemy is frozen on the ground, shoot around their body to scare them into dropping inventory items.",
      },
      {
        shortcut: "Hold-up aim",
        name: "Freeze a standing enemy",
        effect:
          "Sneak up from behind or the side and point your weapon at the enemy. Snake says freeze, they drop their weapon, and you can demand items.",
      },
      {
        shortcut: "L1",
        name: "Stalk quietly",
        effect:
          "Hold L1 to walk very slowly and quietly when sneaking up on enemies, especially on harder difficulties.",
      },
      {
        shortcut: "Held soldier",
        name: "Use a human shield",
        effect:
          "Hold an enemy soldier from behind to stop other soldiers from shooting directly at Snake. This does not protect you with scientists or workers.",
      },
      {
        shortcut: "Box or thrown item",
        name: "Distract for CQC",
        effect:
          "Use the cardboard box, thrown food, a live snake, or a book to pull attention away and create an opening for a hold-up or CQC attack.",
      },
      {
        shortcut: "TNT food storage",
        name: "Make enemies vulnerable",
        effect:
          "Blow up food storage, leave the area, and return. Hungry enemies become more vulnerable to punches, kicks, and dive rolls.",
      },
      {
        shortcut: "Check outfit",
        name: "Confirm CQC compatibility",
        effect:
          "Some outfits block advanced CQC. You may still punch, kick, or dive roll, but grabs and slams can be unavailable.",
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
