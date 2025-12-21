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
  activeSection = null;
  hideAll();
  introPage.style.display = "block";
};

/* =====================
   SECTION BUTTONS (SIDEBAR)
===================== */
document.querySelectorAll("[data-section]").forEach(btn => {
  btn.onclick = () => {
    activeSection = btn.dataset.section;

    // Restore last position or start at intro
    const savedPos = sectionProgress[activeSection];
    sectionPosition = savedPos >= 0 ? savedPos : -1;
    inSectionIntro = true;

    showSectionIntro();
  };
});

/* =====================
   SHOW SECTION INTRO
===================== */
function showSectionIntro() {
  hideAll();
  sectionInfo.style.display = "block";
  sectionInfo.innerHTML = `<h2>${activeSection}</h2>`;
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
      ? "Back to sections"
      : "Next";
}

/* =====================
   NAVIGATION BUTTONS
===================== */
nextBtn.onclick = () => {

  // Section intro → start questions
  if (activeSection && inSectionIntro) {
    inSectionIntro = false;

    // Go to last answered or first question
    sectionPosition = sectionProgress[activeSection] >= 0
      ? sectionProgress[activeSection]
      : 0;

    loadQuestion();
    return;
  }

  // Require answer before next
  if (!answers[currentIndex]) {
    alert("Please answer Yes or No before continuing.");
    return;
  }

  // Save progress
  sectionProgress[activeSection] = sectionPosition;

  if (sectionPosition < sections[activeSection].questions.length - 1) {
    sectionPosition++;
    sectionProgress[activeSection] = sectionPosition;
    loadQuestion();
  } else {
    // End of section → check if all answered
    const totalQuestions = questions.filter(q => !q.type).length;
    const answeredQuestions = Object.keys(answers).length;

    if (answeredQuestions === totalQuestions) {
      // All answered → finish enabled
      showResults();
    } else {
      // Not all answered → go back to Welcome / choose another section
      activeSection = null;
      inSectionIntro = false;
      hideAll();
      introPage.style.display = "block";
    }
  }

  updateFinishAvailability();
};

prevBtn.onclick = () => {
  if (sectionPosition > 0) {
    sectionPosition--;
    loadQuestion();
  } else {
    inSectionIntro = true;
    showSectionIntro();
  }
};

/* =====================
   ANSWERS
===================== */
radios.forEach(r => {
  r.onchange = () => {
    answers[currentIndex] = r.value;
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
