let currentIndex = -1; // -1 = intro page
const answers = {};

const introPage = document.getElementById("intro-page");
const questionBox = document.getElementById("question-box");
const questionText = document.getElementById("question-text");
const riskText = document.getElementById("risk-text");
const optionsDiv = document.querySelector(".options");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const radios = Array.from(document.getElementsByName("answer"));

// Mapping LT section titles to info-box IDs
const ltIdMap = {
  "LT-1: Enable threat detection capabilities": "lt1-info",
  "LT-2: Enable threat detection for identity and access management": "lt2-info",
  "LT-3: Enable logging for security investigation": "lt3-info",
  "LT-4: Enable network logging for security investigation": "lt4-info",
  "LT-5: Centralize security log management and analysis": "lt5-info",
  "LT-6: Configure log storage retention": "lt6-info",
  "LT-7: Use approved time synchronization sources": "lt7-info"
};

function hideAllLtInfo() {
  Object.values(ltIdMap).forEach(id => {
    const el = document.getElementById(id);
    if(el) el.style.display = "none";
  });
}

function loadItem() {
  // Intro page
  if (currentIndex === -1) {
    introPage.style.display = "block";
    questionBox.style.display = "none";
    optionsDiv.style.display = "none";
    riskText.style.display = "none";
    hideAllLtInfo();
    prevBtn.style.display = "none";
    nextBtn.disabled = false;
    nextBtn.textContent = "Next";
    return;
  }

  introPage.style.display = "none";
  questionBox.style.display = "block";
  prevBtn.style.display = "inline-block";

  const item = questions[currentIndex];

  hideAllLtInfo();

  if (item.type === "section") {
    // Show section title
    questionBox.classList.add("section-view");
    questionText.textContent = item.title;

    // Show the corresponding info box
    const infoId = ltIdMap[item.title];
    if(infoId) document.getElementById(infoId).style.display = "block";

    // Hide question options and risk
    optionsDiv.style.display = "none";
    riskText.style.display = "none";

    nextBtn.disabled = false;
    nextBtn.textContent = "Next";

  } else {
    // Question view
    questionBox.classList.remove("section-view");
    questionText.textContent = item.q;

    optionsDiv.style.display = "flex";
    riskText.textContent = item.risk;
    riskText.style.display = "block";

    radios.forEach(rb => {
      rb.checked = answers[currentIndex] === rb.value;
    });

    nextBtn.disabled = answers[currentIndex] == null;
    nextBtn.textContent =
      currentIndex === questions.length - 1 ? "Finish" : "Next";
  }

  prevBtn.disabled = currentIndex === -1;
}

// Enable Next button when answered
radios.forEach(rb => {
  rb.addEventListener("change", () => {
    answers[currentIndex] = rb.value;
    nextBtn.disabled = false;
  });
});

// Navigation
nextBtn.addEventListener("click", () => {
  if (currentIndex === -1) {
    currentIndex = 0;
    loadItem();
    return;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadItem();
  } else {
    // Finished quiz
    const score = Object.values(answers).filter(a => a === "yes").length * 5;

    document.body.innerHTML = `
      <div style="max-width:600px;margin:100px auto;text-align:center;font-family:Verdana,Arial,sans-serif">
        <h1>Your Score</h1>
        <p style="font-size:32px;">${score} points</p>
        <p>You answered “Yes” to ${score / 5} questions.</p>
      </div>
    `;
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > -1) {
    currentIndex--;
    loadItem();
  }
});

// Initialize
loadItem();
