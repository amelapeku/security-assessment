let currentIndex = 0;
const answers = {};

const questionBox = document.querySelector(".question-box");
const questionText = document.getElementById("question-text");
const riskText = document.getElementById("risk-text");
const optionsDiv = document.querySelector(".options");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const radios = Array.from(document.getElementsByName("answer"));

function loadItem() {
  const item = questions[currentIndex];

  if (item.type === "section") {
    // SECTION VIEW
    questionBox.style.display = "block";
    questionText.textContent = item.title;

    optionsDiv.style.display = "none";
    riskText.style.display = "none";

    nextBtn.disabled = false;
  } else {
    // QUESTION VIEW
    questionBox.style.display = "block";
    questionText.textContent = item.q;

    optionsDiv.style.display = "flex";

    // ✅ RESTORE RISK TEXT
    riskText.textContent = item.risk;
    riskText.style.display = "block";

    // Restore previous answer
    radios.forEach(rb => {
      rb.checked = answers[currentIndex] === rb.value;
    });

    // Disable Next if unanswered
    nextBtn.disabled = answers[currentIndex] == null;
  }

  prevBtn.disabled = currentIndex === 0;
  nextBtn.textContent =
    currentIndex === questions.length - 1 ? "Finish" : "Next";
}

// Enable Next when answered
radios.forEach(rb => {
  rb.addEventListener("change", () => {
    answers[currentIndex] = rb.value;
    nextBtn.disabled = false;
  });
});

// Navigation
nextBtn.addEventListener("click", () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadItem();
  } else {
    const score =
      Object.values(answers).filter(a => a === "yes").length * 5;

    document.body.innerHTML = `
      <div style="max-width:600px;margin:100px auto;text-align:center;font-family:Verdana,Arial,sans-serif">
        <h1>Your Score</h1>
        <p style="font-size:32px;">${score} points</p>
        <p>You answered “Yes” to ${score / 5} out of ${questions.length} questions.</p>
      </div>
    `;
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    loadItem();
  }
});

// Init
loadItem();
