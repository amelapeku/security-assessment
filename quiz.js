let activeSection = null;
let sectionPosition = -1;
let inSectionIntro = false;
let currentIndex = null;

const answers = {};
const sectionProgress = {};
const introPage = document.getElementById("intro-page");
const questionBox = document.getElementById("question-box");
const questionText = document.getElementById("question-text");
const riskText = document.getElementById("risk-text");
const sectionInfo = document.getElementById("section-info");
const resultsContainer = document.getElementById("results-container");
const optionsDiv = document.querySelector(".options");
const radios = Array.from(document.getElementsByName("answer"));
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const finishBtn = document.getElementById("finish-btn");
const sidebar = document.getElementById("sidebar");

const sections = {};
let currentSection = null;

// Build sections
questions.forEach((q, i) => {
  if (q.type === "section") {
    currentSection = q.title;
    sections[currentSection] = { introIndex: i, questions: [] };
    sectionProgress[currentSection] = -1;
  } else {
    sections[currentSection].questions.push(i);
  }
});

// Hide all main views
function hideAll() {
  introPage.style.display = "none";
  questionBox.style.display = "none";
  optionsDiv.style.display = "none";
  riskText.style.display = "none";
  sectionInfo.style.display = "none";
  resultsContainer.style.display = "none";
  sidebar.style.display = "block"; // always visible
  document.querySelector(".buttons").style.display = "flex";
}

// Show welcome on load
window.onload = () => {
  hideAll();
  introPage.style.display = "block";
  nextBtn.textContent = "Next";
  prevBtn.style.visibility = "hidden";
  finishBtn.disabled = true;
};

// Sidebar navigation
document.querySelectorAll("[data-section]").forEach(btn => {
  btn.onclick = () => {
    const section = btn.dataset.section;
    enterSection(section, false); // false = go to last question answered
  };
});

function enterSection(section, goToIntro = true) {
  activeSection = section;
  inSectionIntro = goToIntro;
  sectionPosition = sectionProgress[activeSection] >= 0 ? sectionProgress[activeSection] : 0;
  hideAll();
  sectionInfo.style.display = "block";
  sectionInfo.textContent = activeSection;
  nextBtn.textContent = goToIntro ? "Start questions" : "Next";
  prevBtn.style.visibility = "visible";
  prevBtn.disabled = false;

  if (!goToIntro) {
    loadQuestion();
  }
}

function loadQuestion() {
  hideAll();
  questionBox.style.display = "block";
  optionsDiv.style.display = "flex";
  riskText.style.display = "block";

  const qIndex = sections[activeSection].questions[sectionPosition];
  const item = questions[qIndex];
  currentIndex = qIndex;

  questionText.textContent = item.q;
  riskText.textContent = item.risk;

  radios.forEach(r => r.checked = answers[qIndex] === r.value);

  nextBtn.textContent = sectionPosition === sections[activeSection].questions.length - 1 ? "Next Section" : "Next";
}

radios.forEach(r => r.onchange = () => {
  answers[currentIndex] = r.value;
  sectionProgress[activeSection] = sectionPosition;
});

function showResults() {
  hideAll();
  resultsContainer.style.display = "block";
  document.querySelector(".buttons").style.display = "none";

  const total = questions.filter(q => !q.type).length;
  const yes = Object.values(answers).filter(a => a === "yes").length;
  document.getElementById("score-text").textContent =
    `You answered "Yes" to ${Math.round((yes / total) * 100)}% of questions`;

  const container = document.getElementById("no-answers-container");
  container.innerHTML = "";

  let currentSectionTitle = "";
  questions.forEach((q, i) => {
    if (q.type === "section") currentSectionTitle = q.title;
    else if (answers[i] === "no") {
      const div = document.createElement("div");
      div.innerHTML = `<h4>${currentSectionTitle}</h4><p>${q.q}</p>`;
      container.appendChild(div);
    }
  });
}

// Next button
nextBtn.onclick = () => {
  // From Welcome → first section intro
  if (introPage.style.display === "block") {
    const firstSection = Object.keys(sections)[0];
    enterSection(firstSection, true);
    return;
  }

  if (activeSection && inSectionIntro) {
    inSectionIntro = false;
    loadQuestion();
    return;
  }

  if (!answers[currentIndex]) {
    alert("Please answer Yes or No before continuing.");
    return;
  }

  sectionProgress[activeSection] = sectionPosition;

  if (sectionPosition < sections[activeSection].questions.length - 1) {
    sectionPosition++;
    loadQuestion();
    return;
  }

  const keys = Object.keys(sections);
  const idx = keys.indexOf(activeSection);
  if (idx < keys.length - 1) {
    enterSection(keys[idx + 1], true);
    return;
  }

  // All done → results
  showResults();
};

// Previous button
prevBtn.onclick = () => {
  if (activeSection && !inSectionIntro && sectionPosition > 0) {
    sectionPosition--;
    loadQuestion();
  } else if (activeSection && !inSectionIntro && sectionPosition === 0) {
    inSectionIntro = true;
    enterSection(activeSection, true);
  } else {
    hideAll();
    introPage.style.display = "block";
    activeSection = null;
    prevBtn.style.visibility = "hidden";
  }
};
