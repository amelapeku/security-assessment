let activeSection = null;
let sectionPosition = -1;
let inSectionIntro = false;

const answers = {};
const sectionProgress = {}; // remembers last question per section

const introPage = document.getElementById("intro-page");
const questionBox = document.getElementById("question-box");
const questionText = document.getElementById("question-text");
const riskText = document.getElementById("risk-text");
const sectionInfo = document.getElementById("section-info");
const resultsContainer = document.getElementById("results-container");

const radios = Array.from(document.getElementsByName("answer"));
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const finishBtn = document.getElementById("finish-btn");
const sidebar = document.getElementById("section-sidebar");

const sections = {};
let currentSection = null;

// =====================
// BUILD SECTION MAP
// =====================
questions.forEach((q, i) => {
  if (q.type === "section") {
    currentSection = q.title;
    sections[currentSection] = { introIndex: i, questions: [] };
    sectionProgress[currentSection] = -1; // initialize
  } else {
    sections[currentSection].questions.push(i);
  }
});

// =====================
// UTILITY
// =====================
function hideAll() {
  introPage.style.display = "none";
  questionBox.style.display = "none";
  optionsDiv.style.display = "none";
  riskText.style.display = "none";
  sectionInfo.style.display = "none";
  resultsContainer.style.display = "none";
  sidebar.style.display = "none";
}

// =====================
// WELCOME BUTTON
// =====================
document.getElementById("welcome-btn").onclick = () => {
  hideAll();
  introPage.style.display = "block";
  sidebar.style.display = "none";
  activeSection = null;
  nextBtn.textContent = "Next";
  nextBtn.disabled = false;
};

// =====================
// LOAD SECTION SIDEBAR
// =====================
function showSidebar() {
  sidebar.innerHTML = "";
  sidebar.style.display = "block";

  Object.keys(sections).forEach(sec => {
    const btn = document.createElement("button");
    btn.textContent = sec;
    btn.dataset.section = sec;
    btn.className = "lt-btn";
    btn.onclick = () => enterSection(sec);
    sidebar.appendChild(btn);
  });
}

// =====================
// ENTER SECTION
// =====================
function enterSection(section) {
  activeSection = section;
  inSectionIntro = true;
  sectionPosition = 0;

  hideAll();
  sidebar.style.display = "block";
  sectionInfo.style.display = "block";

  // Show criticality and controls
  const infoId = ltIdMap[section];
  if (infoId) {
    const infoBox = document.getElementById(infoId);
    if (infoBox) sectionInfo.innerHTML = infoBox.innerHTML;
  } else {
    sectionInfo.textContent = section;
  }

  nextBtn.textContent = "Start questions";
  prevBtn.style.visibility = "visible";
  prevBtn.disabled = false;
}

// =====================
// LOAD QUESTION
// =====================
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

// =====================
// NAVIGATION
// =====================
nextBtn.onclick = () => {
  // Welcome → show sidebar
  if (!activeSection && introPage.style.display === "block") {
    hideAll();
    showSidebar();
    return;
  }

  // Section intro → first question
  if (activeSection && inSectionIntro) {
    inSectionIntro = false;
    sectionPosition =
      sectionProgress[activeSection] >= 0
        ? sectionProgress[activeSection]
        : 0;
    loadQuestion();
    return;
  }

  // Require answer for questions only
  if (!answers[currentIndex]) {
    alert("Please answer Yes or No before continuing.");
    return;
  }

  // Save progress
  sectionProgress[activeSection] = sectionPosition;

  // Next question in section
  if (sectionPosition < sections[activeSection].questions.length - 1) {
    sectionPosition++;
    loadQuestion();
    return;
  }

  // Next section
  const sectionKeys = Object.keys(sections);
  const currentSectionIndex = sectionKeys.indexOf(activeSection);
  if (currentSectionIndex < sectionKeys.length - 1) {
    enterSection(sectionKeys[currentSectionIndex + 1]);
    return;
  }

  // All sections done → enable finish
  finishBtn.disabled = false;
};

// =====================
// PREVIOUS BUTTON
// =====================
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

// =====================
// ANSWERS
// =====================
radios.forEach(r => {
  r.onchange = () => {
    answers[currentIndex] = r.value;
    sectionProgress[activeSection] = sectionPosition;
  };
});

// =====================
// FINISH / RESULTS
// =====================
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
