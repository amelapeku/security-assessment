let activeSection = null;
let sectionPosition = -1;
let inSectionIntro = false;
let currentIndex = null;

const answers = {};
const sectionProgress = {}; // remembers last question per section

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

// Build sections map
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
  sidebar.style.display = "none";
}

// Welcome button
document.getElementById("welcome-btn").onclick = () => {
  hideAll();
  introPage.style.display = "block";
  sidebar.style.display = "none";
  activeSection = null;
  nextBtn.textContent = "Next";
  nextBtn.disabled = false;
};

// Enter section from sidebar
document.querySelectorAll("[data-section]").forEach(btn => {
  btn.onclick = () => enterSection(btn.dataset.section);
});

function enterSection(section) {
  activeSection = section;
  inSectionIntro = true;
  sectionPosition =
    sectionProgress[activeSection] >= 0 ? sectionProgress[activeSection] : 0;

  hideAll();
  sidebar.style.display = "block";
  sectionInfo.style.display = "block";

  sectionInfo.textContent = activeSection;
  nextBtn.textContent = "Start questions";
  prevBtn.style.visibility = "visible";
  prevBtn.disabled = false;
}

// Load a question
function loadQuestion() {
  hideAll();
  sidebar.style.display = "block";
  questionBox.style.display = "block";
  optionsDiv.style.display = "flex";
  riskText.style.display = "block";

  const qIndex = sections[activeSection].questions[sectionPosition];
  const item = questions[qIndex];
  currentIndex = qIndex;

  questionText.textContent = item.q;
  riskText.textContent = item.risk;

  radios.forEach(r => {
    r.checked = answers[qIndex] === r.value;
  });

  nextBtn.textContent =
    sectionPosition === sections[activeSection].questions.length - 1
      ? "Next Section"
      : "Next";
}

// Next button logic
nextBtn.onclick = () => {
  // From welcome → show sidebar first
  if (!activeSection && introPage.style.display === "block") {
    hideAll();
    sidebar.style.display = "block";
    return;
  }

  // Section intro → first or last answered question
  if (activeSection && inSectionIntro) {
    inSectionIntro = false;
    loadQuestion();
    return;
  }

  // Must answer before moving
  if (!answers[currentIndex]) {
    alert("Please answer Yes or No before continuing.");
    return;
  }

  // Save progress
  sectionProgress[activeSection] = sectionPosition;

  // Next question
  if (sectionPosition < sections[activeSection].questions.length - 1) {
    sectionPosition++;
    loadQuestion();
    return;
  }

  // Next section
  const keys = Object.keys(sections);
  const idx = keys.indexOf(activeSection);
  if (idx < keys.length - 1) {
    enterSection(keys[idx + 1]);
    return;
  }

  // All done → enable finish
  finishBtn.disabled = false;
};

// Previous button logic
prevBtn.onclick = () => {
  if (activeSection && !inSectionIntro && sectionPosition > 0) {
    sectionPosition--;
    loadQuestion();
  } else if (activeSection && !inSectionIntro && sectionPosition === 0) {
    inSectionIntro = true;
    enterSection(activeSection);
  } else {
    hideAll();
    introPage.style.display = "block";
    sidebar.style.display = "none";
    activeSection = null;
  }
};

// Record answers
radios.forEach(r => {
  r.onchange = () => {
    answers[currentIndex] = r.value;
    sectionProgress[activeSection] = sectionPosition;
  };
});

// Finish / results
finishBtn.onclick = () => {
  hideAll();
  resultsContainer.style.display = "block";

  const total = questions.filter(q => !q.type).length;
  const yes = Object.values(answers).filter(a => a === "yes").length;

  document.getElementById("score-text").textContent =
    `You answered "Yes" to ${Math.round((yes / total) * 100)}% of questions`;

  const container = document.getElementById("no-answers-container");
  container.innerHTML = "";

  let current = "";
  questions.forEach((q, i) => {
    if (q.type === "section") current = q.title;
    else if (answers[i] === "no") {
      const div = document.createElement("div");
      div.innerHTML = `<h4>${current}</h4><p>${q.q}</p>`;
      container.appendChild(div);
    }
  });
};
