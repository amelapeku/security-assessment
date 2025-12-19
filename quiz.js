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

const sections = {};
let currentSection = null;

/* Build section map */
questions.forEach((q, i) => {
  if (q.type === "section") {
    currentSection = q.title;
    sections[currentSection] = { introIndex: i, questions: [] };
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

/* Welcome */
document.getElementById("welcome-btn").onclick = () => {
  hideAll();
  introPage.style.display = "block";
};

/* Section click */
document.querySelectorAll("[data-section]").forEach(btn => {
  btn.onclick = () => {
    activeSection = btn.dataset.section;
    sectionPosition = -1;
    showSectionIntro();
  };
});

/* Section intro (controls & criticality) */
function showSectionIntro() {
  hideAll();
  sectionInfo.style.display = "block";
  sectionInfo.innerHTML = document.getElementById(
    activeSection.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() + "-info"
  )?.innerHTML || "<strong>Section overview</strong>";

  nextBtn.textContent = "Start questions";
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
      ? "Back to sections"
      : "Next";
}

/* Navigation */
nextBtn.onclick = () => {
  if (activeSection && sectionPosition === -1) {
    sectionPosition = 0;
    loadQuestion();
    return;
  }

  if (activeSection && sectionPosition < sections[activeSection].questions.length - 1) {
    sectionPosition++;
    loadQuestion();
  } else {
    activeSection = null;
    hideAll();
    introPage.style.display = "block";
  }
};

prevBtn.onclick = () => {
  if (sectionPosition > 0) {
    sectionPosition--;
    loadQuestion();
  } else {
    showSectionIntro();
  }
};

/* Answers */
radios.forEach(r => {
  r.onchange = () => answers[currentIndex] = r.value;
});

/* Finish */
document.getElementById("finish-btn").onclick = showResults;

/* Results */
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
