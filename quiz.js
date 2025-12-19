let currentIndex = -1;
let activeSection = null;
let sectionPosition = 0;

const answers = {};

const introPage = document.getElementById("intro-page");
const questionBox = document.getElementById("question-box");
const questionText = document.getElementById("question-text");
const riskText = document.getElementById("risk-text");
const optionsDiv = document.querySelector(".options");
const radios = Array.from(document.getElementsByName("answer"));
const sidebar = document.getElementById("sidebar");

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

/* =========================
   Build section map
========================= */
const sections = {};
let currentSection = null;

questions.forEach((item, index) => {
  if (item.type === "section") {
    currentSection = item.title;
    sections[currentSection] = [];
  } else {
    sections[currentSection].push(index);
  }
});

/* =========================
   Intro state
========================= */
function showIntro() {
  introPage.style.display = "block";
  questionBox.style.display = "none";
  optionsDiv.style.display = "none";
  riskText.style.display = "none";
  sidebar.classList.add("hidden");

  prevBtn.style.visibility = "hidden";
  nextBtn.textContent = "Next";
}

showIntro();

/* =========================
   Section selector
========================= */
function showSectionSelector() {
  introPage.style.display = "none";
  sidebar.classList.remove("hidden");
  sidebar.classList.remove("collapsed");

  questionBox.style.display = "none";
  optionsDiv.style.display = "none";
  riskText.style.display = "none";

  prevBtn.style.visibility = "hidden";
  nextBtn.style.visibility = "hidden";
}

/* =========================
   Load question
========================= */
function loadQuestion() {
  const index = sections[activeSection][sectionPosition];
  const item = questions[index];
  currentIndex = index;

  questionBox.style.display = "block";
  optionsDiv.style.display = "flex";
  riskText.style.display = "block";

  questionText.textContent = item.q;
  riskText.textContent = item.risk;

  radios.forEach(r => r.checked = answers[currentIndex] === r.value);

  prevBtn.style.visibility = "visible";
  nextBtn.style.visibility = "visible";
  nextBtn.textContent = sectionPosition === sections[activeSection].length - 1 ? "Back to sections" : "Next";
}

/* =========================
   Sidebar click
========================= */
document.querySelectorAll("#sidebar button").forEach(btn => {
  btn.addEventListener("click", () => {
    activeSection = btn.dataset.section;
    sectionPosition = 0;
    sidebar.classList.add("collapsed");
    loadQuestion();
  });
});

/* =========================
   Answer handling
========================= */
radios.forEach(radio => {
  radio.addEventListener("change", () => {
    answers[currentIndex] = radio.value;
  });
});

/* =========================
   Navigation buttons
========================= */
nextBtn.addEventListener("click", () => {
  if (currentIndex === -1) {
    showSectionSelector();
    return;
  }

  if (sectionPosition < sections[activeSection].length - 1) {
    sectionPosition++;
    loadQuestion();
  } else {
    showSectionSelector();
  }
});

prevBtn.addEventListener("click", () => {
  if (sectionPosition > 0) {
    sectionPosition--;
    loadQuestion();
  }
});
