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
  if (currentIndex === -1) {
    introPage.style.display = "block";
    questionBox.style.display = "none";
    optionsDiv.style.display = "none";
    riskText.style.display = "none";
    hideAllLTInfo();

    prevBtn.style.visibility = "hidden";
    prevBtn.disabled = true;

    nextBtn.disabled = false;
    nextBtn.textContent = "Next";
    return;
  }

  introPage.style.display = "none";
  questionBox.style.display = "block";

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
  } else {
    showResults();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > -1) {
    currentIndex--;
    loadItem();
  }
});

loadItem();

// ========================
// Show results
// ========================
function showResults() {
  introPage.style.display = "none";
  questionBox.style.display = "none";
  optionsDiv.style.display = "none";
  riskText.style.display = "none";
  hideAllLTInfo();
  prevBtn.style.display = "none";
  nextBtn.style.display = "none";

  const resultsContainer = document.getElementById("results-container");
  resultsContainer.style.display = "block";

  // Calculate % Yes
  const totalQuestions = questions.filter(q => !q.type).length;
  const yesAnswers = Object.values(answers).filter(a => a === "yes").length;
  const percentYes = Math.round((yesAnswers / totalQuestions) * 100);

  document.getElementById("score-text").textContent = `You answered "Yes" to ${percentYes}% of questions`;

  // List "No" answers grouped by section
  const noAnswersContainer = document.getElementById("no-answers-container");
  noAnswersContainer.innerHTML = "";

  let currentSection = "";
  let sectionDiv = null;

  questions.forEach((item, index) => {
    if (item.type === "section") {
      currentSection = item.title;
    } else {
      if (answers[index] === "no") {
        if (!sectionDiv || sectionDiv.dataset.section !== currentSection) {
          sectionDiv = document.createElement("div");
          sectionDiv.classList.add("no-answer-section");
          sectionDiv.dataset.section = currentSection;

          const sectionTitle = document.createElement("h3");
          sectionTitle.textContent = currentSection;
          sectionDiv.appendChild(sectionTitle);

          const ul = document.createElement("ul");
          sectionDiv.appendChild(ul);

          noAnswersContainer.appendChild(sectionDiv);
        }

        const ul = sectionDiv.querySelector("ul");

        const infoId = ltIdMap[currentSection];
        const infoBox = infoId ? document.getElementById(infoId) : null;
        let controlsText = "";
        if (infoBox) {
          const clonedList = infoBox.querySelector("ul").cloneNode(true);
          controlsText = clonedList.innerHTML;
        }

        const li = document.createElement("li");
        li.innerHTML = `<strong>Question:</strong> ${item.q}<br><strong>Relevant controls:</strong> <ul>${controlsText}</ul>`;
        ul.appendChild(li);
      }
    }
  });
}
