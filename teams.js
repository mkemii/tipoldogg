// Modifica questo elenco per aggiungere squadre o cambiare i membri.
// Ogni squadra deve avere esattamente cinque componenti.
// Se un membro non ha un profilo Steam, lascia profile vuoto: il nome non sarà un link.

const teams = [
  {
    name: "Tipoldo eSports [TPLD.]",
    members: [
      { name: "emiidev", role: "IGL", profile: "https://steamcommunity.com/id/emiidev" },
      { name: "Sosne91", role: "Player", profile: "https://steamcommunity.com/id/kebab__ab" },
      { name: "Dragon", role: "Player", profile: "https://steamcommunity.com/profiles/76561199232673861" },
      { name: "Pharox", role: "Player", profile: "https://steamcommunity.com/profiles/76561199245100838" },
      { name: "Kyami", role: "Player", profile: "https://steamcommunity.com/profiles/76561199566162769" }
    ]
  },
  {
    name: "Team BRG [BRG.]",
    members: [
      { name: "Sky_Reality", role: "IGL", profile: "https://steamcommunity.com/profiles/76561199403163725/" },
      { name: "ynfinity", role: "Player", profile: "https://steamcommunity.com/profiles/76561198620064314" },
      { name: "Ric.Silipignis", role: "Player", profile: "https://steamcommunity.com/id/grazialbaaaaaaa" },
      { name: "Dragonland187", role: "Player", profile: "https://steamcommunity.com/profiles/76561199842283847" },
      { name: "Ritzeh", role: "Player", profile: "https://steamcommunity.com/id/ritzeh_" }
    ]
  },
  {
    name: "Nome terza squadra",
    members: [
      { name: "Nome giocatore 1", role: "Ruolo", profile: "" },
      { name: "Nome giocatore 2", role: "Ruolo", profile: "" },
      { name: "Nome giocatore 3", role: "Ruolo", profile: "" },
      { name: "Nome giocatore 4", role: "Ruolo", profile: "" },
      { name: "Nome giocatore 5", role: "Ruolo", profile: "" }
    ]
  }
];

const teamName = document.querySelector("#team-name");
const teamCounter = document.querySelector("#team-counter");
const rosterCount = document.querySelector("#roster-count");
const roster = document.querySelector("#team-roster");
const previousButton = document.querySelector("#previous-team");
const nextButton = document.querySelector("#next-team");
const pagination = document.querySelector("#team-pagination");

let currentTeam = 0;

// Crea un pulsante indicatore per ogni squadra.
teams.forEach((team, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.className = "team-page-dot";
  dot.setAttribute("aria-label", `Mostra ${team.name}`);
  dot.addEventListener("click", () => showTeam(index));
  pagination.appendChild(dot);
});

function showTeam(index) {
  currentTeam = index;
  const team = teams[currentTeam];

  teamName.textContent = team.name;
  teamCounter.textContent =
    `TEAM ${String(currentTeam + 1).padStart(2, "0")} / ${String(teams.length).padStart(2, "0")}`;
  rosterCount.textContent = `${team.members.length} MEMBRI`;

  roster.replaceChildren();

  team.members.forEach((member) => {
    const row = document.createElement("div");
    row.className = "team-member";

    const icon = document.createElement("span");
    icon.className = "member-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = '<i class="bi bi-steam"></i>';

    const details = document.createElement("div");
    details.className = "member-details";

    const name = document.createElement(member.profile ? "a" : "span");
    name.className = "member-name";
    name.textContent = member.name;

    if (member.profile) {
      name.href = member.profile;
      name.target = "_blank";
      name.rel = "noopener noreferrer";
      name.setAttribute("aria-label", `${member.name}, profilo Steam (si apre in una nuova scheda)`);
    }

    const role = document.createElement("span");
    role.className = "member-role";
    role.textContent = member.role;

    details.append(name, role);
    row.append(icon, details);
    roster.appendChild(row);
  });

  previousButton.disabled = currentTeam === 0;
  nextButton.disabled = currentTeam === teams.length - 1;

  pagination.querySelectorAll(".team-page-dot").forEach((dot, index) => {
    if (index === currentTeam) {
      dot.setAttribute("aria-current", "true");
    } else {
      dot.removeAttribute("aria-current");
    }
  });
}

previousButton.addEventListener("click", () => {
  if (currentTeam > 0) showTeam(currentTeam - 1);
});

nextButton.addEventListener("click", () => {
  if (currentTeam < teams.length - 1) showTeam(currentTeam + 1);
});

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;

  if (event.key === "ArrowLeft" && currentTeam > 0) {
    showTeam(currentTeam - 1);
  } else if (event.key === "ArrowRight" && currentTeam < teams.length - 1) {
    showTeam(currentTeam + 1);
  }
});

showTeam(0);
