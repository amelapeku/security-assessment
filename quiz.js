let currentIndex = -1;
let activeSection = null;
let sectionPosition = -1;
const answers = {};

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
const sectionOrder = [];
let currentSectionIndex = -1;

/* Build section map */
let currentSection = null;
questions.forEach((q, i) => {
  if (q.type === "section") {
    currentSection = q.title;
    sectionOrder.push(currentSection);
    sections[currentSection] = { questions: [] };
  } else {
    sections[currentSection].questions.push(i);
  }
});

/* Utility */
function hideAll() {
  introPage.style.display = "none";
  questionBox.style.display = "none";
  optionsDiv.style.display = "none";
  riskText.style.display = "none";
  sectionInfo.style.display = "none";
  resultsContainer.style.display = "none";
}

/* Button states */
function updateNextState() {
  if (currentIndex === -1) {
    nextBtn.disabled = false;
  } else {
    nextBtn.disabled = !answers[currentIndex];
  }
}

function updateFinishState() {
  const total = questions.filter(q => !q.type).length;
  finishBtn.disabled = Object.keys(answers).length !== total;
}

/* Welcome */
document.getElementById("welcome-btn").onclick = () => {
  hideAll();
  introPage.style.display = "block";
  activeSection = null;
  currentIndex = -1;
  updateNextState();
};

/* Sidebar section click */
document.querySelectorAll("[data-section]").forEach(btn => {
  btn.onclick = () => {
    activeSection = btn.dataset.section;
    currentSectionIndex = sectionOrder.indexOf(activeSection);
    sectionPosition = -1;
    showSectionIntro();
  };
});

/* Section intro */
function showSectionIntro() {
  hideAll();
  sectionInfo.style.display = "block";
  sectionInfo.innerHTML = `<strong>${activeSection}</strong><br><br>Controls & criticality overview.`;
  nextBtn.textContent = "Start questions";
  currentIndex = -1;
  updateNextState();
}

/* Load question */
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

  radios.forEach(r => r.checked = answers[qIndex] === r.value);

  nextBtn.textContent =
    sectionPosition === sections[activeSection].questions.length - 1
      ? "Next section"
      : "Next";

  updateNextState();
}

/* Navigation */
nextBtn.onclick = () => {
  if (currentIndex !== -1 && !answers[currentIndex]) return;

  /* Welcome → LT-1 */
  if (!activeSection) {
    currentSectionIndex = 0;
    activeSection = sectionOrder[0];
    sectionPosition = -1;
    showSectionIntro();
    return;
  }

  /* Section intro → first question */
  if (sectionPosition === -1) {
    sectionPosition = 0;
    loadQuestion();
    return;
  }

  /* Next question */
  if (sectionPosition < sections[activeSection].questions.length - 1) {
    sectionPosition++;
    loadQuestion();
    return;
  }

  /* End of section */
  if (currentSectionIndex < sectionOrder.length - 1) {
    currentSectionIndex++;
    activeSection = sectionOrder[currentSectionIndex];
    sectionPosition = -1;
    showSectionIntro();
  } else {
    /* END OF LT-7 → GO TO FINISH */
    showResults();
  }
};

prevBtn.onclick = () => {
  if (sectionPosition > 0) {
    sectionPosition--;
    loadQuestion();
  } else if (sectionPosition === 0) {
    showSectionIntro();
  }
};

/* Answers */
radios.forEach(r => {
  r.onchange = () => {
    answers[currentIndex] = r.value;
    updateNextState();
    updateFinishState();
  };
});

/* Finish */
finishBtn.onclick = () => {
  if (!finishBtn.disabled) {
    showResults();
  }
};

/* Results */
function showResults() {
  hideAll();
  resultsContainer.style.display = "block";

  const total = questions.filter(q => !q.type).length;
  const yes = Object.values(answers).filter(v => v === "yes").length;

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

/* Init */
finishBtn.disabled = true;
updateNextState();
