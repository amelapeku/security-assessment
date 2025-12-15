// Manually define all 70 questions with their risk text
const questions = [
{
    q: "Have you deployed the cloud-native threat detection capabilities of your cloud security posture management platform for compute, storage, database, and identity services, including behavioral analytics and threat intelligence-driven monitoring?",
    risk: "Without cloud-native threat detection, attacks on your cloud resources may go unnoticed and escalate before response."
  },
  {
    q: "Have you enabled threat detection for all critical Azure services using Microsoft Defender for Cloud, covering virtual machines, storage accounts, databases, containers, and Key Vault instances?",
    risk: "Critical services without threat detection can be exploited without alerts, increasing security risk."
  },
  {
    q: "Have your security teams reviewed and familiarized themselves with the available detection capabilities using the Microsoft Defender for Cloud security alerts reference guide, including alert types, severity levels, and response requirements?",
    risk: "Teams unaware of detection capabilities may not recognize alerts or respond appropriately, leading to delayed incident response."
  },
  {
    q: "For services without native threat detection capability, are data plane logs collected and routed to Microsoft Sentinel for custom analytics rules and behavioral detection?",
    risk: "Without custom detection for unsupported services, malicious activity may go undetected."
  },
  {
    q: "Have you configured alert filtering and analytics rules to reduce false positives and extract high-quality alerts from log data, tuning detection sensitivity based on workload criticality and risk tolerance?",
    risk: "Poorly tuned alerts generate noise or miss critical incidents, reducing the effectiveness of threat monitoring."
  }
];
  // … continue up to 70 objects


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

