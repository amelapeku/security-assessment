let currentIndex = 0;
const answers = {};

const questionText = document.getElementById("question-text");
const riskText = document.getElementById("risk-text");
const optionsDiv = document.querySelector(".options");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

function loadItem() {
  const item = questions[currentIndex];

  if (item.type === "section") {
    // SECTION SCREEN
    questionText.textContent = item.title; // show section title inside gray box
    optionsDiv.style.display = "none";     // hide Yes/No options
    riskText.style.display = "none";       // hide risk bubble
  } else {
    // QUESTION SCREEN
    questionText.textContent = item.q;      // show question
    riskText.textContent = item.risk;      // show risk
    optionsDiv.style.display = "flex";     // show Yes/No
    riskText.style.display = "block";      // show risk

    // Restore previously selected answer
    const radios = Array.from(document.getElementsByName("answer"));
    radios.forEach(rb => { rb.checked = answers[currentIndex] === rb.value; });
  }

  prevBtn.disabled = currentIndex === 0;
  nextBtn.textContent = currentIndex === questions.length - 1 ? "Finish" : "Next";
}

function saveAnswer() {
  const radios = Array.from(document.getElementsByName("answer"));
  const selected = radios.find(rb => rb.checked);
  if (selected) answers[currentIndex] = selected.value;
}

nextBtn.addEventListener("click", () => {
  saveAnswer();
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadItem();
  } else {
    const score = Object.values(answers).filter(a => a === "yes").length * 5;
    document.body.innerHTML = `
      <div style="max-width:600px;margin:100px auto;text-align:center;font-family:Verdana,Arial,sans-serif">
        <h1>Your Score</h1>
        <p style="font-size:32px;font-weight:bold;">${score} points</p>
        <p>You answered “Yes” to ${score / 5} out of ${questions.length} questions.</p>
      </div>
    `;
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) currentIndex--;
  loadItem();
});

// Initialize
loadItem();
