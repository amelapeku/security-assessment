let currentIndex = -1;
let activeSection = null;
let sectionPosition = -1;
let inSectionIntro = true;

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
    sectionProgress[currentSection] = -1;
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
   WELCOME
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
    activeSection = btn.dataset.section;

    const lastAnswered = sectionProgress[activeSection];

    if (lastAnswered >= 0) {
      sectionPosition = lastAnswered;
      inSectionIntro = false;
      loadQuestion();
    } else {
      sectionPosition = 0;
      inSectionIntro = true;
      showSectionIntro();
    }
  };
});

/* =====================
   SECTION INTRO
===================== */
function showSectionIntro() {
  hideAll();
  sectionInfo.style.display = "block";
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
  sectionInfo.sty
