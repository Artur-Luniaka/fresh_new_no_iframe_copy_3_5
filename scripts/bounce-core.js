// Dynamic content loading
const ballZones = {
  header: document.getElementById("header-zone"),
  footer: document.getElementById("footer-zone"),
  features: document.querySelector(".feature-volley"),
  tutorial: document.querySelector(".tutorial-moves"),
  feedback: document.querySelector(".feedback-volley"),
  modes: document.querySelector(".mode-volley"),
  rewards: document.querySelector(".reward-volley"),
};

// Load components
async function tossComponent(zone, path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    zone.innerHTML = html;
  } catch (error) {
    console.error(`Failed to load ${path}:`, error);
    zone.innerHTML = `<div class="error-message">Failed to load content</div>`;
  }
}

// Load and render JSON data
async function loadJsonContent(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`Loaded data from ${path}:`, data); // Debug log
    return data;
  } catch (error) {
    console.error(`Failed to load ${path}:`, error);
    return null;
  }
}

// Render section content
async function renderSectionContent() {
  try {
    console.log("Starting to render section content"); // Debug log

    // Load tutorial moves
    const tutorialData = await loadJsonContent("data/tutorial-moves.json");
    console.log("Tutorial data:", tutorialData); // Debug log
    if (tutorialData?.moves && ballZones.tutorial) {
      ballZones.tutorial.innerHTML = tutorialData.moves
        .map(
          (move) => `
        <div class="tutorial-card">
          <h3 class="move-title">${move.name || ""}</h3>
          <p class="move-desc">${move.description || ""}</p>
          <div class="move-stats">
            <span class="timing-beat">Timing: ${move.timing || ""}</span>
            <span class="skill-level">Level: ${move.difficulty || ""}</span>
          </div>
        </div>
      `
        )
        .join("");
    }

    // Load player feedback
    const feedbackData = await loadJsonContent("data/player-feedback.json");
    console.log("Feedback data:", feedbackData); // Debug log
    if (feedbackData?.feedback && ballZones.feedback) {
      ballZones.feedback.innerHTML = feedbackData.feedback
        .map(
          (item) => `
        <div class="feedback-card">
          <p>${item.comment || ""}</p>
          <cite>${item.player || ""}</cite>
          <div class="player-stats">
            <span class="player-rating">Rating: ${item.rating || 0}/5</span>
            <span class="player-time">${item.playtime || ""}</span>
          </div>
        </div>
      `
        )
        .join("");
    }

    // Load game features
    const updatesData = await loadJsonContent("data/game-updates.json");
    console.log("Updates data:", updatesData); // Debug log
    if (updatesData?.features && ballZones.features) {
      ballZones.features.innerHTML = updatesData.features
        .map(
          (feature) => `
        <div class="feature-card">
          <h3>${feature.title || ""}</h3>
          <p>${feature.content || ""}</p>
        </div>
      `
        )
        .join("");
    }

    // Load skill modes
    const modesData = await loadJsonContent("data/top-combos.json");
    console.log("Modes data:", modesData); // Debug log
    if (modesData?.modes && ballZones.modes) {
      ballZones.modes.innerHTML = modesData.modes
        .map(
          (mode) => `
        <div class="mode-card">
          <h3>${mode.name || ""}</h3>
          <p>${mode.description || ""}</p>
          <div class="mode-stats">
            <span class="difficulty">${mode.difficulty || ""}</span>
            <span class="high-score">${
              mode.highScore?.toLocaleString() || "0"
            }</span>
          </div>
        </div>
      `
        )
        .join("");
    } else {
      console.error("Failed to load modes data or modes element not found");
      if (ballZones.modes) {
        ballZones.modes.innerHTML =
          '<div class="error-message">Failed to load modes</div>';
      }
    }

    // Load top combos
    if (modesData?.combos) {
      const comboGrid = document.querySelector(".combos-grid");
      if (comboGrid) {
        comboGrid.innerHTML = modesData.combos
          .map(
            (combo) => `
          <div class="combo-card">
            <h3>${combo.player}</h3>
            <p>${combo.combo}</p>
            <div class="combo-info">
              <span class="points">${combo.score.toLocaleString()} pts</span>
              <span class="date">${combo.date}</span>
            </div>
          </div>
        `
          )
          .join("");
      }
    }

    // Load unlockables
    const rewardsData = await loadJsonContent("data/unlockables.json");
    if (rewardsData?.rewards && ballZones.rewards) {
      ballZones.rewards.innerHTML = rewardsData.rewards
        .map(
          (reward) => `
        <div class="reward-card">
          <h3>${reward.title || ""}</h3>
          <p>${reward.description || ""}</p>
          <div class="reward-info">
            <span class="reward-status">Progress: ${reward.current || 0}/${
            reward.total || 0
          }</span>
            <span class="reward-points">+${
              reward.points?.toLocaleString() || 0
            } pts</span>
          </div>
          <div class="progress-bar" style="--progress: ${
            reward.progress || 0
          }%"></div>
        </div>
      `
        )
        .join("");
    }
  } catch (error) {
    console.error("Error rendering section content:", error);
  }
}

// Menu handling
function setupJuggleNav() {
  const menuTrigger = document.querySelector(".menu-toss");
  const slideMenu = document.querySelector(".slide-menu");
  const menuLinks = document.querySelectorAll(".nav-toss");
  const body = document.body;

  // Create overlay
  const overlay = document.createElement("div");
  overlay.className = "menu-overlay";
  body.appendChild(overlay);

  function closeMenu() {
    menuTrigger.classList.remove("active");
    slideMenu.classList.remove("active");
    overlay.classList.remove("active");
    body.style.overflow = "";
  }

  function toggleMenu() {
    menuTrigger.classList.toggle("active");
    slideMenu.classList.toggle("active");
    overlay.classList.toggle("active");
    body.style.overflow = body.style.overflow === "hidden" ? "" : "hidden";
  }

  menuTrigger.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", closeMenu);

  // Close menu when clicking on any navigation link
  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

// Hero section background switcher
function setupHeroVolley() {
  const heroBackdrop = document.querySelector(".hero-backdrop");
  if (heroBackdrop) {
    const ballScenes = [
      'url("assets/hero-bg-1.jpg")',
      'url("assets/hero-bg-2.jpg")',
    ];
    let currentToss = 0;

    function switchBallScene() {
      currentToss = (currentToss + 1) % ballScenes.length;
      heroBackdrop.style.backgroundImage = ballScenes[currentToss];
    }

    // Initial setup
    heroBackdrop.style.backgroundImage = ballScenes[0];
    heroBackdrop.style.transition = "background-image 1s ease";

    // Start switching every 3 seconds
    setInterval(switchBallScene, 3000);
  }
}

// Hero background switcher
function setupHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  let currentSlide = 0;

  function switchSlide() {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  // Switch slides every 3 seconds
  setInterval(switchSlide, 3000);
}

// Update copyright year
function bounceCopyright() {
  const yearBounce = document.getElementById("yearBounce");
  if (yearBounce) {
    yearBounce.textContent = new Date().getFullYear();
  }
}

// Cookie consent handling
function setupCookieConsent() {
  const cookieConsent = document.getElementById("cookieConsent");
  const acceptButton = document.getElementById("acceptCookies");
  const COOKIE_CONSENT_KEY = "bounceGameCookieConsent";

  // Check if user has already accepted cookies
  const hasAccepted = localStorage.getItem(COOKIE_CONSENT_KEY) === "true";

  if (!hasAccepted) {
    // Show the cookie consent bar with a slight delay for smooth animation
    setTimeout(() => {
      cookieConsent.classList.add("show");
    }, 500);
  }

  acceptButton.addEventListener("click", () => {
    // Save the consent in localStorage
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");

    // Hide the cookie consent bar
    cookieConsent.classList.remove("show");

    // Optional: Add analytics initialization here
    console.log("Cookies accepted - initialize analytics if needed");
  });
}

// Initialize all components
document.addEventListener("DOMContentLoaded", async () => {
  // Load header and footer
  if (ballZones.header) await tossComponent(ballZones.header, "header.html");
  if (ballZones.footer) await tossComponent(ballZones.footer, "footer.html");

  // Setup navigation and sliders
  setupJuggleNav();
  setupHeroSlider();
  setupCookieConsent();

  // Render dynamic content
  await renderSectionContent();
});
