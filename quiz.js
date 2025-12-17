let currentIndex = -1;
const answers = {};

const introPage = document.getElementById("intro-page");
const questionBox = document.getElementById("question-box");
const questionText = document.getElementById("question-text");
const riskText = document.getElementById("risk-text");
const optionsDiv = document.querySelector(".options");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const radios = Array.from(document.getElementsByName("answer"));

const ltIdMap = {
  "LT-1: Enable threat detection capabilities": "lt1-info",
  "LT-2: Enable threat detection for identity and access management": "lt2-info",
  "LT-3: Enable logging for security investigation": "lt3-info",
  "LT-4: Enable network logging for security investigation": "lt4-info",
  "LT-5: Centralize security log management and analysis": "lt5-info",
  "LT-6: Configure log storage retention": "lt6-info",
  "LT-7: Use approved time synchronization sources": "lt7-info"
};

function hideAllLTInfo() {
  Object.values(ltIdMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
}

function loadItem() {
  // =====================
  // INTRO PAGE
  // =====================
  if (currentIndex === -1) {
    introPage.style.display = "block";
    questionBox.style.display = "none";
    optionsDiv.style.display = "none";
    riskText.style.display = "none";
    hideAllLTInfo();

    // HIDE previous, keep layout
    prevBtn.style.visibility = "hidden";
    prevBtn.disabled = true;

    nextBtn.disabled = false;
    nextBtn.textContent = "Next";
    return;
  }

  // =====================
  // NON-INTRO
  // =====================
  introPage.style.display = "none";
  questionBox.style.display = "block";

  // SHOW previous normally
  prevBtn.style.visibility = "visible";
  prevBtn.disabled = false;

  const item = questions[currentIndex];
  hideAllLTInfo();

  if (item.type === "section") {
    questionBox.classList.add("section-view");
    questionText.textContent = item.title;

    const infoId = ltIdMap[item.title];
    if (infoId) {
      const infoBox = document.getElementById(infoId);
      if (infoBox) infoBox.style.display = "block";
    }

    optionsDiv.style.display = "none";
    riskText.style.display = "none";
    nextBtn.disabled = false;
    nextBtn.textContent = "Next";
    return;
  }

  questionBox.classList.remove("section-view");
  questionText.textContent = item.q;

  optionsDiv.style.display = "flex";
  riskText.textContent = item.risk;
  riskText.style.display = "block";

  radios.forEach(r => {
    r.checked = answers[currentIndex] === r.value;
  });

  nextBtn.disabled = answers[currentIndex] == null;
  nextBtn.textContent =
    currentIndex === questions.length - 1 ? "Finish" : "Next";
}

radios.forEach(radio => {
  radio.addEventListener("change", () => {
    answers[currentIndex] = radio.value;
    nextBtn.disabled = false;
  });
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadItem();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > -1) {
    currentIndex--;
    loadItem();
  }
});

loadItem();
