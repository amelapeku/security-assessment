const questions = [
  { q: "Enable threat detection for cloud services?", risk: "Risk: Lack of threat detection on compute, storage, databases, and identities." },
  { q: "Activate Microsoft Defender for Cloud on all Azure services?", risk: "Risk: Azure services not fully protected by Microsoft Defender for Cloud." },
  { q: "Are security teams familiar with alert types?", risk: "Risk: Security team unaware of alert types and severity leading to slow responses." },
  { q: "Are there gaps in detection for services without native protection?", risk: "Risk: Gaps in detection for services without native protection." },
  { q: "Alerts are tuned to reduce false positives?", risk: "Risk: High false positives or missed alerts due to poor tuning." }
];

let currentQuestion = 0;
let answers = Array(questions.length).fill(null);

const questionText = document.getElementById("question-text");
const riskText = document.getElementById("risk-text");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const radioButtons = document.getElementsByName("answer");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.q;
  riskText.textContent = q.risk;

  // Reset radios
  radioButtons.forEach(rb => rb.checked = false);
  if (answers[currentQuestion]) {
    radioButtons.forEach(rb => {
      if (rb.value === answers[currentQuestion]) rb.checked = true;
    });
  }

  prevBtn.disabled = currentQuestion === 0;
  nextBtn.textContent = currentQuestion === questions.length - 1 ? "Finish" : "Next";
}

// Save answer
radioButtons.forEach(rb => {
  rb.addEventListener("change", () => {
    answers[currentQuestion] = rb.value;
  });
});

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) currentQuestion--;
  loadQuestion();
});

nextBtn.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    // Show score
    const score = answers.filter(a => a === "yes").length * 5;
    alert(`You scored ${score} points`);
  }
});

// Initialize
loadQuestion();
