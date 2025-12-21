let currentIndex = -1;
let activeSection = null;
let sectionPosition = -1;
let inSectionIntro = false;

const answers = {};
const sectionProgress = {}; // remembers last question per section

const introPage = document.getElementById("intro-page");
const questionBox = document.getElementById("question-box");
const questionText = document.getElementById("question-text");
const riskText = document.getElementById("risk-text");
const optionsDiv = document.querySelector(".options");
const sectionInfo = document.getElementById("section-info");
const resultsContainer = document.getElementById("results-container");

const radios = Array.from(document.getElementsByName("answer"));
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const finishBtn = document.getElementById("finish-btn");

const sections = {};
let currentSection = null;

/* =====================
   BUILD SECTION MAP
===================== */
questions.forEach((q, i) => {
  if (q.type === "section") {
    currentSection = q.title;
    sections[currentSection] = { introIndex: i, questions: [] };
    sectionProgress[currentSection] = -1; // initialize
  } else {
    sections[currentSection].questions.push(i);
  }
});

/* =====================
   UTILITY
===================== */
function hideAll() {
  introPage.style.display = "none";
  questionBox.style.display = "none";
  optionsDiv.style.display = "none";
  riskText.style.display = "none";
  sectionInfo.style.display = "none";
  resultsContainer.style.display = "none";
}

/* =====================
   WELCOME BUTTON
===================== */
document.getElementById("welcome-btn").onclick = () => {
  hideAll();
  introPage.style.display = "block";
  activeSection = null;
};

/* =====================
   SECTION CLICK (SIDEBAR)
===================== */
document.querySelectorAll("[data-section]").forEach(btn => {
  btn.onclick = () => {
    enterSection(btn.dataset.section);
  };
});

/* =====================
   ENTER SECTION
===================== */
function enterSection(section) {
  activeSection = section;
  inSectionIntro = true;

  // Show section title once
  hideAll();
  sectionInfo.style.display = "block";
  sectionInfo.textContent = activeSection;

  // Set first or last answered question
  sectionPosition =
    sectionProgress[activeSection] >= 0
      ? sectionProgress[activeSection]
      : 0;

  nextBtn.textContent = "Start questions";
}

/* =====================
   LOAD QUESTION
===================== */
function loadQuestion() {
  hideAll();

  const qIndex = sections[activeSection].questions[sectionPosition];
  const item = questions[qIndex];
  currentIndex = qIndex;

  questionBox.style.display = "block";
  optionsDiv.style.display = "flex";
  riskText.style.display = "block";

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

/* =====================
   NAVIGATION
===================== */
nextBtn.onclick = () => {
  // From Welcome page → move to first section
  if (!activeSection && introPage.style.display === "block") {
    const firstSection = Object.keys(sections)[0];
    enterSection(firstSection);
    return;
  }

  // From section intro → first or last answered question
  if (activeSection && inSectionIntro) {
    inSectionIntro = false;
    loadQuestion();
    return;
  }

  // Require answer before continuing
  if (!answers[currentIndex]) {
    alert("Please answer Yes or No before continuing.");
    return;
  }

  // Save progress
  sectionProgress[activeSection] = sectionPosition;

  // Move to next question in section
  if (sectionPosition < sections[activeSection].questions.length - 1) {
    sectionPosition++;
    loadQuestion();
    return;
  }

  // Move to next section
  const sectionKeys = Object.keys(sections);
  const currentSectionIndex = sectionKeys.indexOf(activeSection);
  if (currentSectionIndex < sectionKeys.length - 1) {
    enterSection(sectionKeys[currentSectionIndex + 1]);
    return;
  }

  // If last section and all questions answered → show results
  const totalQuestions = questions.filter(q => !q.type).length;
  const answeredQuestions = Object.keys(answers).length;

  if (answeredQuestions === totalQuestions) {
    showResults();
  } else {
    hideAll();
    introPage.style.display = "block";
    activeSection = null;
  }

  updateFinishAvailability();
};

prevBtn.onclick = () => {
  if (sectionPosition > 0) {
    sectionPosition--;
    loadQuestion();
  } else if (activeSection) {
    // go back to section intro
    inSectionIntro = true;
    enterSection(activeSection);
  } else {
    hideAll();
    introPage.style.display = "block";
  }
};

/* =====================
   ANSWERS
===================== */
radios.forEach(r => {
  r.onchange = () => {
    answers[currentIndex] = r.value;
    sectionProgress[activeSection] = sectionPosition;
    updateFinishAvailability();
  };
});

/* =====================
   FINISH ENABLE LOGIC
===================== */
function updateFinishAvailability() {
  const total = questions.filter(q => !q.type).length;
  const answered = Object.keys(answers).length;
  finishBtn.disabled = answered < total;
}

finishBtn.disabled = true;

/* =====================
   FINISH / RESULTS
===================== */
finishBtn.onclick = showResults;

function showResults() {
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
}
