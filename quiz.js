const questions = [

  // ======================
  // LT-1
  // ======================
  {
    type: "section",
    title: "LT-1: Enable threat detection capabilities"
  },
  {
    q: "Have you deployed cloud-native threat detection for compute, storage, database, and identity services using behavioral analytics and threat intelligence?",
    risk: "⚠️ Without cloud-native threat detection, attacks may go unnoticed and escalate before response."
  },
  {
    q: "Have you enabled Microsoft Defender for Cloud threat detection for all critical Azure services?",
    risk: "⚠️ Unprotected services may be exploited without generating alerts."
  },

  // ======================
  // LT-2
  // ======================
  {
    type: "section",
    title: "LT-2: Enable threat detection for identity and access management"
  },
  {
    q: "Have you enabled Microsoft Entra ID Protection to detect leaked credentials, password spray, and risky sign-ins?",
    risk: "⚠️ Identity compromise may remain undetected without risk-based detection."
  },
  {
    q: "Have you enforced Conditional Access policies for risky sign-ins and users?",
    risk: "⚠️ Risky authentications may succeed without adaptive controls."
  },

  // ======================
  // LT-3
  // ======================
  {
    type: "section",
    title: "LT-3: Enable logging for security investigation"
  },
  {
    q: "Have you enabled Azure Activity Logs for all subscriptions to capture management plane operations?",
    risk: "⚠️ Administrative changes may go untracked without management plane logs."
  },
  {
    q: "Have you enabled Microsoft Entra audit and sign-in logs for identity visibility?",
    risk: "⚠️ Identity-related incidents may lack traceability."
  },

  // ======================
  // LT-4
  // ======================
  {
    type: "section",
    title: "LT-4: Enable network logging for security investigation"
  },
  {
    q: "Have you enabled NSG flow logs and firewall logs for network traffic visibility?",
    risk: "⚠️ Lateral movement and network attacks may go undetected."
  },

  // ======================
  // LT-5
  // ======================
  {
    type: "section",
    title: "LT-5: Centralize security log management and analysis"
  },
  {
    q: "Have you centralized logs in Azure Monitor or Microsoft Sentinel for correlation and investigation?",
    risk: "⚠️ Disparate logs reduce detection and investigation effectiveness."
  },

  // ======================
  // LT-6
  // ======================
  {
    type: "section",
    title: "LT-6: Configure log storage retention"
  },
  {
    q: "Have you configured log retention policies to meet investigation and compliance requirements?",
    risk: "⚠️ Logs may be deleted before incidents are discovered."
  },

  // ======================
  // LT-7
  // ======================
  {
    type: "section",
    title: "LT-7: Use approved time synchronization sources"
  },
  {
    q: "Are all systems synchronized using approved NTP sources with monitoring for time drift?",
    risk: "⚠️ Incorrect timestamps can break log correlation and forensic analysis."
  }
];

// ======================
// QUIZ LOGIC
// ======================

let currentQuestion = 0;
let answers = Array(questions.length).fill(null);

const questionText = document.getElementById("question-text");
const riskText = document.getElementById("risk-text");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const radioButtons = Array.from(document.getElementsByName("answer"));

function loadQuestion() {
  const item = questions[currentQuestion];

  // SECTION SCREEN
  if (item.type === "section") {
    questionText.textContent = item.title;
    riskText.style.display = "none";
    document.querySelector(".options").style.display = "none";

    prevBtn.disabled = currentQuestion === 0;
    nextBtn.textContent = "Continue";
    nextBtn.disabled = false;
    return;
  }

  // NORMAL QUESTION
  questionText.textContent = item.q;
  riskText.textContent = item.risk;

  riskText.style.display = "block";
  document.querySelector(".options").style.display = "flex";

  radioButtons.forEach(rb => rb.checked = false);
  if (answers[currentQuestion]) {
    radioButtons.forEach(rb => {
      if (rb.value === answers[currentQuestion]) rb.checked = true;
    });
  }

  prevBtn.disabled = currentQuestion === 0;
  nextBtn.textContent =
    currentQuestion === questions.length - 1 ? "Finish" : "Next";

  nextBtn.disabled = answers[currentQuestion] === null;
}

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
      <div style="max-width:600px;margin:100px auto;text-align:center;font-family:Verdana">
        <h1>Your Score</h1>
        <p style="font-size:32px;font-weight:bold;">${score} points</p>
        <p>You answered “Yes” to ${score / 5} controls.</p>
      </div>
    `;
  }
});

// Initialize
loadQuestion();
