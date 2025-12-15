let currentIndex = 0;
const answers = {};

const sectionTitle = document.getElementById("section-title");
const questionText = document.getElementById("question-text");
const riskText = document.getElementById("risk-text");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

function loadItem() {
  const item = questions[currentIndex];

  if (item.type === "section") {
    sectionTitle.textContent = item.title;
    questionText.textContent = "";
    riskText.textContent = "";
    document.querySelector(".options").style.display = "none";
    return;
  }

  // Question
  sectionTitle.textContent = "";
  questionText.textContent = item.q;
  riskText.textContent = item.risk;
  document.querySelector(".options").style.display = "flex";

  const radios = Array.from(document.getElementsByName("answer"));
  radios.forEach(rb => { rb.checked = answers[currentIndex] === rb.value; });
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
