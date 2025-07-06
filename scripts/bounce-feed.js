// Format date to a readable string
function formatBounceDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

// Load and display game updates
async function loadGameUpdates() {
  try {
    const response = await fetch("data/game-updates.json");
    const data = await response.json();
    const updateVolley = document.querySelector(".update-volley");

    if (updateVolley) {
      const updatesList = data.updates
        .map(
          (update) => `
                <article class="update-card">
                    <div class="update-visual">
                        <img src="${update.image}" alt="${
            update.title
          }" class="update-image">
                    </div>
                    <div class="update-content">
                        <h3 class="update-title">${update.title}</h3>
                        <time class="update-time">${formatBounceDate(
                          update.date
                        )}</time>
                        <p class="update-text">${update.content}</p>
                    </div>
                </article>
            `
        )
        .join("");

      updateVolley.innerHTML = updatesList;
    }
  } catch (error) {
    console.error("Failed to load game updates:", error);
  }
}

// Load and display top combos
async function loadTopCombos() {
  try {
    const response = await fetch("data/top-combos.json");
    const data = await response.json();
    const comboVolley = document.querySelector(".combo-volley");

    if (comboVolley) {
      const combosList = data.combos
        .map(
          (combo) => `
                <article class="combo-card">
                    <div class="combo-visual">
                        <img src="${combo.image}" alt="${
            combo.combo
          }" class="combo-image">
                    </div>
                    <div class="combo-content">
                        <h3 class="player-name">${combo.player}</h3>
                        <p class="combo-sequence">${combo.combo}</p>
                        <div class="combo-stats">
                            <span class="combo-score">Score: ${combo.score.toLocaleString()}</span>
                            <time class="combo-time">${formatBounceDate(
                              combo.date
                            )}</time>
                        </div>
                    </div>
                </article>
            `
        )
        .join("");

      comboVolley.innerHTML = combosList;
    }
  } catch (error) {
    console.error("Failed to load top combos:", error);
  }
}

// Initialize news feed content
document.addEventListener("DOMContentLoaded", () => {
  loadGameUpdates();
  loadTopCombos();
});
