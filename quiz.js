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
const downloadBtn = document.getElementById("download-btn");

// ===============================
// SECTION INTRO METADATA
// ===============================
const sectionIntroData = {
  "LT-1: Enable threat detection capabilities": `...`,
  "LT-2: Enable threat detection for identity and access management": `...`,
  "LT-3: Enable logging for security investigation": `...`,
  "LT-4: Enable network logging for security investigation": `...`,
  "LT-5: Centralize security log management and analysis": `...`,
  "LT-6: Configure log storage retention": `...`,
  "LT-7: Use approved time synchronization sources": `...`
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
    btn.classList.toggle(
      "active-section",
      btn.dataset.section === section
    );
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
  prevBtn.style.visibility = "visible";
  prevBtn.disabled = false;
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
  radios.forEach(r => (r.checked = answers[qIndex] === r.value));

  // ===== Progress indicator =====
  const totalQuestions = sections[activeSection].questions.length;
  const currentQuestionNumber = sectionPosition + 1;

  document.getElementById("progress-text").textContent =
    `Question ${currentQuestionNumber} of ${totalQuestions}`;

  const progressPercent = Math.round((currentQuestionNumber / totalQuestions) * 100);
  document.getElementById("progress-bar").style.width = `${progressPercent}%`;

  const isLastQuestion =
    sectionPosition === sections[activeSection].questions.length - 1;
  const isLastSection =
    Object.keys(sections).indexOf(activeSection) ===
    Object.keys(sections).length - 1;

  nextBtn.textContent = isLastQuestion
    ? (isLastSection ? "Finish" : "Next Section")
    : "Next";
}

// ===============================
// RECORD ANSWERS
// ===============================
radios.forEach(r => r.onchange = () => {
  answers[currentIndex] = r.value;
  sectionProgress[activeSection] = sectionPosition;
});

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
    sectionPosition =
      sectionProgress[activeSection] >= 0
        ? sectionProgress[activeSection]
        : 0;
    loadQuestion();
    return;
  }

  if (!answers[currentIndex]) {
    alert("Please answer Yes or No before continuing.");
    return;
  }

  if (sectionPosition < sections[activeSection].questions.length - 1) {
    sectionPosition++;
    loadQuestion();
    return;
  }

  const keys = Object.keys(sections);
  const idx = keys.indexOf(activeSection);
  if (idx < keys.length - 1) {
    enterSection(keys[idx + 1]);
    return;
  }

  finishBtn.disabled = false;
  showResults();
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
// SHOW RESULTS
// ===============================
function showResults() {
  hideAll();
  resultsContainer.style.display = "block";
  setActiveSidebar(null);
  document.querySelector(".buttons").style.display = "none";

  const total = questions.filter(q => !q.type).length;
  const yes = Object.values(answers).filter(a => a === "yes").length;

  document.getElementById("score-text").textContent =
    `You answered "Yes" to ${Math.round((yes / total) * 100)}% of questions`;

  const container = document.getElementById("no-answers-container");
  container.innerHTML = "";

  Object.keys(sections).forEach(sectionTitle => {
    const sectionIndices = sections[sectionTitle].questions;
    const noQuestions = sectionIndices
      .filter(i => answers[i] === "no")
      .map(i => questions[i].q);

    if (noQuestions.length > 0) {
      const sectionDiv = document.createElement("div");
      sectionDiv.innerHTML = `<h4>${sectionTitle}</h4>`;
      
      noQuestions.forEach(qText => {
        const p = document.createElement("p");
        p.textContent = qText;
        sectionDiv.appendChild(p);
      });

      container.appendChild(sectionDiv);
    }
  });
}

// ===============================
// PDF DOWNLOAD
// ===============================
downloadBtn.onclick = () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const yesPercent = document.getElementById("score-text").textContent;
  doc.setFontSize(16);
  doc.text("Assessment Results", 10, 20);
  doc.setFontSize(12);
  doc.text(yesPercent, 10, 30);

  let y = 40;
  doc.text("Questions answered 'No':", 10, y);
  y += 10;

  Object.keys(sections).forEach(sectionTitle => {
    const sectionIndices = sections[sectionTitle].questions;
    const noQuestions = sectionIndices
      .filter(i => answers[i] === "no")
      .map(i => questions[i].q);

    if (noQuestions.length > 0) {
      doc.setFont(undefined, "bold");
      doc.text(sectionTitle, 10, y);
      doc.setFont(undefined, "normal");
      y += 7;

      noQuestions.forEach(qText => {
        const lines = doc.splitTextToSize(qText, 180);
        doc.text(lines, 12, y);
        y += lines.length * 7;
      });

      y += 5;
    }
  });

  doc.save("assessment_results.pdf");
};
