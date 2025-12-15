// Manually define all 70 questions with their risk text
const questions = [
  { q: "Do you enforce strong passwords?", risk: "Weak passwords are easy to crack." },
  { q: "Is MFA enabled for admins?", risk: "Admin accounts are high-value targets." },
  { q: "Are backups tested regularly?", risk: "Untested backups may fail in incidents." },
  { q: "Do you conduct regular phishing training?", risk: "Employees may fall for phishing attacks." },
  { q: "Is endpoint protection software installed?", risk: "Unprotected devices are vulnerable to malware." },
  { q: "Do you review user access rights periodically?", risk: "Old permissions can give former employees access." },
  { q: "Is data encrypted at rest?", risk: "Unencrypted data can be read if storage is stolen." },
  { q: "Do you have a password manager policy?", risk: "Weak password habits can compromise multiple accounts." },
  { q: "Is remote access secured with VPN?", risk: "Unsecured remote access can lead to breaches." },
  { q: "Are software updates applied promptly?", risk: "Delayed updates leave known vulnerabilities exposed." },
  // … continue up to 70 objects
];

let currentQuestion = 0;
let answers = Array(questions.length).fill(null);

const questionText = document.getElementById("question-text");
const riskText = document.getElementById("risk-text");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const radioButtons = Array.from(document.getElementsByName("answer"));
const progress = document.getElementById("progress");

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

  // Update progress
  if (progress) {
    progress.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  }

  // Disable Next if no answer selected
  nextBtn.disabled = answers[currentQuestion] === null;
}

// Save answer
radioButtons.forEach(rb => {
  rb.addEventListener("change", () => {
    answers[currentQuestion] = rb.value;
    nextBtn.disabled = false;
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
    const score = answers.filter(a => a === "yes").length * 5;
    document.body.innerHTML = `
      <div style="max-width:600px;margin:100px auto;text-align:center;font-family:Arial">
        <h1>Your Score</h1>
        <p style="font-size:32px;font-weight:bold;">${score} points</p>
        <p>You answered “Yes” to ${score / 5} out of ${questions.length} questions.</p>
      </div>
    `;
  }
});

// Initialize
loadQuestion();
