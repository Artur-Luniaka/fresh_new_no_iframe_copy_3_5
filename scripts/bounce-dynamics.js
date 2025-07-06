// Load and render tutorial moves
async function loadTutorialMoves() {
  try {
    const response = await fetch("data/tutorial-moves.json");
    const data = await response.json();
    const tutorialMoves = document.querySelector(".tutorial-moves");

    if (tutorialMoves) {
      const movesList = data.moves
        .map(
          (move) => `
                <div class="move-card">
                    <h3 class="move-title">${move.title}</h3>
                    <p class="move-desc">${move.description}</p>
                    <div class="move-stats">
                        <span class="timing-beat">Timing: ${move.timing}</span>
                        <span class="skill-level">Level: ${move.difficulty}</span>
                    </div>
                </div>
            `
        )
        .join("");

      tutorialMoves.innerHTML = movesList;
    }
  } catch (error) {
    console.error("Failed to load tutorial moves:", error);
  }
}

// Load and render player feedback
async function loadPlayerFeedback() {
  try {
    const response = await fetch("data/player-feedback.json");
    const data = await response.json();
    const feedbackVolley = document.querySelector(".feedback-volley");

    if (feedbackVolley) {
      const feedbackList = data.feedback
        .map(
          (feedback) => `
                <div class="feedback-card">
                    <div class="player-info">
                        <h3 class="player-name">${feedback.name}</h3>
                        <div class="play-stats">
                            <span class="playtime">${feedback.playtime}</span>
                            <span class="rating">${"⭐".repeat(
                              feedback.rating
                            )}</span>
                        </div>
                    </div>
                    <p class="player-comment">${feedback.comment}</p>
                </div>
            `
        )
        .join("");

      feedbackVolley.innerHTML = feedbackList;
    }
  } catch (error) {
    console.error("Failed to load player feedback:", error);
  }
}

// Load arcade features
function loadArcadeFeatures() {
  const featureVolley = document.querySelector(".feature-volley");
  if (featureVolley) {
    const features = [
      {
        title: "Intuitive Controls",
        description:
          "Master the art of ball control with our responsive touch system",
      },
      {
        title: "Rhythm Mastery",
        description: "Feel the beat as you chain moves in perfect harmony",
      },
      {
        title: "Dynamic Difficulty",
        description: "Challenge yourself with progressively complex patterns",
      },
    ];

    featureVolley.innerHTML = features
      .map(
        (feature) => `
            <div class="feature-card">
                <h3 class="feature-title">${feature.title}</h3>
                <p class="feature-desc">${feature.description}</p>
            </div>
        `
      )
      .join("");
  }
}

// Initialize dynamic content
document.addEventListener("DOMContentLoaded", () => {
  loadTutorialMoves();
  loadPlayerFeedback();
  loadArcadeFeatures();
});
