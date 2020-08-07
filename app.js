const soundsElement = document.querySelector("#sounds");
document.querySelector("#stopButton").addEventListener("click", stopAll);

const keyCodes = [65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 220];
const players = [];

(async () => {
  const sounds = await getSounds();
  addSoundsToPage(sounds);
})();

document.addEventListener("keydown", (event) => {
  if (event.keyCode == 32) {
    stopAll();
  }
  const playerIndex = keyCodes.indexOf(event.keyCode);
  const playerAndDiv = players[playerIndex];
  if (playerAndDiv) {
    playerAndDiv.soundDiv.style.background = "#00b0ca";
    playerAndDiv.player.currentTime = 0;
    playerAndDiv.player.play();
  }
});

document.addEventListener("keyup", (event) => {
  const playerIndex = keyCodes.indexOf(event.keyCode);
  const playerAndDiv = players[playerIndex];
  if (playerAndDiv) {
    playerAndDiv.soundDiv.style.background = "";
  }
});

async function getSounds() {
  const response = await fetch("./sounds.json");
  const json = await response.json();
  return json;
}

function addSoundsToPage(sounds) {
  sounds.forEach((sound) => {
    const soundDiv = document.createElement("div");
    soundDiv.className = "sound";
    const soundTitle = document.createElement("h2");
    soundTitle.textContent = sound.title;
    soundDiv.appendChild(soundTitle);

    const player = document.createElement("audio");
    player.setAttribute("src", `sounds/${sound.src}`);
    soundDiv.appendChild(player);
    players.push({ player, soundDiv });

    soundDiv.addEventListener("mousedown", () => {
      soundDiv.style.background = "#00b0ca";
      player.currentTime = 0;
      player.play();
    });

    soundDiv.addEventListener("mouseup", () => {
      soundDiv.style.background = "";
    });

    soundsElement.appendChild(soundDiv);
  });
}

function stopAll() {
  players.forEach(({ player }) => {
    player.pause();
  });
}
