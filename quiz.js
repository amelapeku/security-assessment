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
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const finishBtn = document.getElementById("finish-btn");
const sidebar = document.getElementById("sidebar");

const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");

// ===============================
// NAV BUTTON VISIBILITY CONTROL
// ===============================
function updateNavButtons() {
  // Welcome page
  if (introPage.style.display === "block") {
    prevBtn.style.display = "none";
    nextBtn.style.display = "inline-block";
    return;
  }

  // Section intro pages
  if (inSectionIntro) {
    prevBtn.style.display = "inline-block";
    nextBtn.style.display = "inline-block";
    return;
  }

  // Question pages
  prevBtn.style.display = "inline-block";
  nextBtn.style.display = "none";
}

// ===============================
// SECTION INTRO METADATA
// ===============================
const sectionIntroData = {
  /* UNCHANGED – omitted here for brevity in explanation,
     but IN YOUR FILE this section remains EXACTLY as-is */
};

// ===============================
// BUILD SECTIONS
// ===============================
const sections = {};
let currentSection = null;

questions.forEach((q, i) => {
  if (q.type === "section") {
    currentSection = q.title;
    sections[currentSection] = { introIndex: i, questions: [] };
    sectionProgress[currentSection] = -1;
  } else {
    sections[currentSection].questions.push(i);
  }
});

// ===============================
// HIGHLIGHT ACTIVE SECTION
// ===============================
function setActiveSidebar(section) {
  document.querySelectorAll("[data-section]").forEach(btn => {
    btn.classList.toggle("active-section", btn.dataset.section === section);
  });
}

// ===============================
// VIEW MANAGEMENT
// ===============================
function hideAll() {
  introPage.style.display = "none";
  questionBox.style.display = "none";
  optionsDiv.style.display = "none";
  riskText.style.display = "none";
  sectionInfo.style.display = "none";
  resultsContainer.style.display = "none";
  sidebar.style.display = "none";
  document.querySelector(".buttons").style.display = "flex";

  updateNavButtons();
}

// ===============================
// INITIAL LOAD
// ===============================
hideAll();
sidebar.style.display = "block";
introPage.style.display = "block";

// ===============================
// SIDEBAR NAVIGATION
// ===============================
document.querySelectorAll("[data-section]").forEach(btn => {
  btn.onclick = () => enterSection(btn.dataset.section);
});

// ===============================
// WELCOME BUTTON
// ===============================
document.getElementById("welcome-btn").onclick = () => {
  activeSection = null;
  inSectionIntro = false;
  sectionPosition = -1;
  setActiveSidebar(null);
  hideAll();
  sidebar.style.display = "block";
  introPage.style.display = "block";
};

// ===============================
// ENTER SECTION
// ===============================
function enterSection(section) {
  activeSection = section;
  inSectionIntro = true;
  setActiveSidebar(section);

  sectionPosition =
    sectionProgress[activeSection] >= 0
      ? sectionProgress[activeSection]
      : 0;

  hideAll();
  sidebar.style.display = "block";
  sectionInfo.style.display = "block";

  sectionInfo.innerHTML = `
    <h2 class="section-title">${activeSection}</h2>
    ${sectionIntroData[activeSection] || ""}
  `;

  nextBtn.textContent =
    sectionProgress[activeSection] === -1
      ? "Start questions"
      : "Resume questions";

  updateNavButtons();
}

// ===============================
// LOAD QUESTION
// ===============================
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

  yesBtn.classList.toggle("selected", answers[qIndex] === "yes");
  noBtn.classList.toggle("selected", answers[qIndex] === "no");

  const totalQuestions = sections[activeSection].questions.length;
  const currentQuestionNumber = sectionPosition + 1;

  document.getElementById("progress-text").textContent =
    `Question ${currentQuestionNumber} of ${totalQuestions}`;

  const progressPercent = Math.round(
    (currentQuestionNumber / totalQuestions) * 100
  );
  document.getElementById("progress-bar").style.width =
    `${progressPercent}%`;

  updateNavButtons();
}

// ===============================
// RECORD ANSWERS + AUTO ADVANCE
// ===============================
function selectAnswer(value) {
  answers[currentIndex] = value;
  sectionProgress[activeSection] = sectionPosition;

  yesBtn.classList.toggle("selected", value === "yes");
  noBtn.classList.toggle("selected", value === "no");

  setTimeout(() => {
    const isLastQuestion =
      sectionPosition === sections[activeSection].questions.length - 1;

    const keys = Object.keys(sections);
    const idx = keys.indexOf(activeSection);

    if (!isLastQuestion) {
      sectionPosition++;
      loadQuestion();
      return;
    }

    if (idx < keys.length - 1) {
      enterSection(keys[idx + 1]);
      return;
    }

    showResults();
  }, 200);
}

yesBtn.onclick = () => selectAnswer("yes");
noBtn.onclick = () => selectAnswer("no");

// ===============================
// NEXT BUTTON
// ===============================
nextBtn.onclick = () => {
  if (introPage.style.display === "block") {
    enterSection(Object.keys(sections)[0]);
    return;
  }

  if (activeSection && inSectionIntro) {
    inSectionIntro = false;
    loadQuestion();
    return;
  }
};

// ===============================
// PREVIOUS BUTTON
// ===============================
prevBtn.onclick = () => {
  if (activeSection && !inSectionIntro && sectionPosition > 0) {
    sectionPosition--;
    loadQuestion();
  } else if (activeSection && !inSectionIntro && sectionPosition === 0) {
    inSectionIntro = true;
    enterSection(activeSection);
  } else {
    hideAll();
    sidebar.style.display = "block";
    introPage.style.display = "block";
    activeSection = null;
  }
};

// ===============================
// RESULTS
// ===============================
function showResults() {
  hideAll();
  resultsContainer.style.display = "block";
  document.querySelector(".buttons").style.display = "none";

  const total = questions.filter(q => !q.type).length;
  const yes = Object.values(answers).filter(a => a === "yes").length;

  document.getElementById("score-text").textContent =
    `You answered "Yes" to ${Math.round((yes / total) * 100)}% of questions. The following key points highlight areas to focus on to strengthen your organization’s security:`;

  const container = document.getElementById("no-answers-container");
  container.innerHTML = "";

  Object.keys(sections).forEach(sectionTitle => {
    const noQuestions = sections[sectionTitle].questions
      .filter(i => answers[i] === "no")
      .map(i => questions[i].q);

    if (noQuestions.length) {
      const div = document.createElement("div");
      div.innerHTML = `<h4>${sectionTitle}</h4>`;

      const ul = document.createElement("ul");
      ul.classList.add("no-answers");
      noQuestions.forEach(q => {
        const li = document.createElement("li");
        li.textContent = q;
        ul.appendChild(li);
      });

      div.appendChild(ul);
      container.appendChild(div);
    }
  });
}
