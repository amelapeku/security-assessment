// ================= QUESTIONS =================
const questions = [
  // ---- Threat Detection & XDR ----
  {
    q: "Have you deployed cloud-native threat detection capabilities for compute, storage, database, and identity services?",
    risk: "Without cloud-native threat detection, attacks may go unnoticed and escalate."
  },
  {
    q: "Have you enabled Microsoft Defender for Cloud for all critical Azure services?",
    risk: "Critical services without threat detection can be exploited silently."
  },
  {
    q: "Have security teams reviewed Microsoft Defender for Cloud alert types and response guidance?",
    risk: "Unfamiliarity with alerts can delay or prevent effective incident response."
  },
  {
    q: "Are logs from services without native threat detection routed to Microsoft Sentinel?",
    risk: "Unsupported services may become blind spots for attackers."
  },
  {
    q: "Have detection rules been tuned to reduce false positives?",
    risk: "Alert fatigue can hide real security incidents."
  },
  {
    q: "Is security telemetry centralized in Azure Monitor or Microsoft Sentinel?",
    risk: "Dispersed telemetry limits correlation and detection accuracy."
  },
  {
    q: "Have you deployed Microsoft Defender XDR for cross-domain correlation?",
    risk: "Threats spanning endpoints, identity, and cloud may go undetected."
  },
  {
    q: "Have you built custom detection rules for organization-specific threats?",
    risk: "Unique attack patterns may bypass built-in detections."
  },
  {
    q: "Is Microsoft Defender Threat Intelligence integrated for alert enrichment?",
    risk: "Lack of threat context reduces response effectiveness."
  },
  {
    q: "Are threat intelligence indicators actively matched in Sentinel?",
    risk: "Known malicious infrastructure may not be detected."

  },

  // ---- Identity Threat Detection ----
  {
    q: "Have you enabled Microsoft Entra ID Protection to detect leaked credentials and risky sign-ins?",
    risk: "Compromised identities may remain active without detection."
  },
  {
    q: "Have you implemented risk-based Conditional Access policies?",
    risk: "High-risk authentications may succeed without additional controls."
  },
  {
    q: "Are anomalous service principal and deprecated account activities monitored?",
    risk: "Non-human identities may be abused for persistence."
  },

  // ---- Identity Monitoring & Logging ----
  {
    q: "Are Microsoft Entra sign-in logs enabled for all authentication types?",
    risk: "Missing authentication logs reduce identity visibility."
  },
  {
    q: "Are Microsoft Entra audit logs enabled for identity changes?",
    risk: "Privilege escalation may occur without traceability."
  },
  {
    q: "Are Entra logs retained beyond the default 30-day period?",
    risk: "Delayed attacks may not be investigable."
  },
  {
    q: "Is Entra Connect Health integrated for hybrid identity monitoring?",
    risk: "Hybrid sync failures and attacks may go unnoticed."
  },

  // ---- Management Plane Logging ----
  {
    q: "Are Azure Activity Logs enabled for all subscriptions?",
    risk: "Administrative actions may not be auditable."
  },
  {
    q: "Are Activity Logs centralized in Log Analytics?",
    risk: "Cross-subscription investigations become difficult."
  },
  {
    q: "Is Azure Policy enforcing diagnostic settings?",
    risk: "Logging gaps may appear as subscriptions grow."
  },

  // ---- Data Plane Logging ----
  {
    q: "Are data plane logs enabled across Azure services?",
    risk: "Unauthorized data access may go undetected."
  },
  {
    q: "Are Azure Storage access logs enabled?",
    risk: "Storage misuse or exfiltration may not be traceable."
  },
  {
    q: "Is Azure SQL auditing enabled?",
    risk: "Database abuse may occur without evidence."
  },
  {
    q: "Are Key Vault access logs enabled?",
    risk: "Secret compromise may not be detected."
  },
  {
    q: "Are Cosmos DB diagnostic logs enabled?",
    risk: "Suspicious NoSQL access patterns may be missed."
  },
  {
    q: "Are diagnostics enabled for all data platforms?",
    risk: "Unmonitored data services create blind spots."
  },

  // ---- Application & Compute Logging ----
  {
    q: "Are App Service diagnostics enabled?",
    risk: "Application attacks may not be traceable."
  },
  {
    q: "Are API Management logs enabled?",
    risk: "API abuse may go undetected."
  },
  {
    q: "Are Azure Functions monitored with Application Insights?",
    risk: "Serverless attacks may lack visibility."
  },
  {
    q: "Are Logic App executions logged?",
    risk: "Workflow abuse may go unnoticed."
  },
  {
    q: "Is Azure Monitor Agent deployed on all VMs?",
    risk: "Host-level attacks may not be detected."
  },
  {
    q: "Are Windows security event logs collected?",
    risk: "Authentication and privilege abuse may be missed."
  },
  {
    q: "Are Linux authentication and system logs collected?",
    risk: "Linux compromise may go undetected."
  },
  {
    q: "Is endpoint protection telemetry enabled?",
    risk: "Malware infections may persist."
  },

  // ---- Application Security Logging ----
  {
    q: "Is structured application logging implemented with security context?",
    risk: "Logs may lack forensic value."
  },
  {
    q: "Is APM telemetry enabled for applications?",
    risk: "Application-layer attacks may go unnoticed."
  },
  {
    q: "Are application security events logged?",
    risk: "Business logic abuse may be undetected."
  },
  {
    q: "Are web security events such as CSP violations logged?",
    risk: "Client-side attacks may be missed."
  },
  {
    q: "Are WAF and API gateway logs enabled?",
    risk: "Layer 7 attacks may bypass detection."
  },

  // ---- Network Logging ----
  {
    q: "Are NSG flow logs enabled?",
    risk: "Lateral movement may go undetected."
  },
  {
    q: "Are Azure Firewall and DNS logs enabled?",
    risk: "Malicious outbound traffic may not be detected."
  },

  // ---- SIEM & Log Management ----
  {
    q: "Are logs aggregated centrally for correlation?",
    risk: "Disparate logs reduce detection effectiveness."
  },
  {
    q: "Is Microsoft Sentinel deployed as a SIEM/SOAR?",
    risk: "Threat response may remain manual and slow."
  },
  {
    q: "Are analytics rules configured in Sentinel?",
    risk: "Threats may not generate incidents."
  },
  {
    q: "Are automated response playbooks implemented?",
    risk: "Incident containment may be delayed."
  },
  {
    q: "Are Sentinel dashboards deployed?",
    risk: "Security posture visibility may be limited."
  },

  // ---- Retention & Time ----
  {
    q: "Are log retention and archival strategies defined?",
    risk: "Compliance and investigation requirements may not be met."
  },
  {
    q: "Are logs forwarded externally when required?",
    risk: "Multi-cloud visibility may be incomplete."
  },
  {
    q: "Are systems synchronized to reliable NTP sources?",
    risk: "Time drift can break log correlation."
  }
];

// ================= QUIZ LOGIC =================
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

  radioButtons.forEach(rb => rb.checked = false);
  if (answers[currentQuestion]) {
    radioButtons.forEach(rb => {
      if (rb.value === answers[currentQuestion]) rb.checked = true;
    });
  }

  prevBtn.disabled = currentQuestion === 0;
  nextBtn.textContent = currentQuestion === questions.length - 1 ? "Finish" : "Next";
  nextBtn.disabled = answers[currentQuestion] === null;

  if (progress) {
    progress.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  }
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
