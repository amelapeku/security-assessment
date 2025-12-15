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

 {
    q: "Have you centralized security telemetry by aggregating alerts and log data from cloud security platforms, endpoint protection, identity systems, and application services into Azure Monitor or Microsoft Sentinel for unified analysis and correlation?",
    risk: "Without centralized telemetry, security events may be missed or difficult to correlate, reducing detection and response effectiveness."
  },
  {
    q: "Have you deployed a unified XDR platform such as Microsoft Defender XDR to correlate threat detection across Microsoft 365 Defender, Microsoft Defender for Cloud, and Microsoft Entra ID with cross-domain incident grouping and automated investigation workflows?",
    risk: "Without a unified XDR platform, threats may go undetected across domains and response may be slower."
  },
  {
    q: "Have you built custom detection rules to match organization-specific threat patterns, attack indicators, and business logic violations that pre-built detections cannot address?",
    risk: "Relying only on pre-built detections may leave gaps for threats unique to your organization."
  },
  {
    q: "Have you integrated Microsoft Defender Threat Intelligence to enrich alerts with threat actor attribution, infrastructure reputation, vulnerability exploitation intelligence, and compromised indicator correlation?",
    risk: "Without threat intelligence enrichment, alerts may lack context, making it harder to prioritize and respond effectively."
  },
  {
    q: "Have you implemented threat intelligence indicators in Microsoft Sentinel for automated matching of observables such as IP addresses, domains, file hashes, and URLs against known malicious infrastructure and threat actor campaigns?",
    risk: "Without automated matching of threat indicators, malicious activity may go undetected or require manual investigation."
  }

{
    q: "Are stolen, leaked, or brute-forced credentials used for extended periods without detection because sign-in anomalies and risk scoring are absent?",
    risk: "Undetected credential compromise allows attackers to maintain persistent access for weeks or months."
  },
  {
    q: "Are successful authentications from geographically distant locations within impossible timeframes going unmonitored due to lack of baseline analysis?",
    risk: "Impossible travel attacks can go unnoticed, enabling credential sharing or compromise without detection."
  },
  {
    q: "Are orphaned accounts, former employees, or unused service principals present, providing persistence footholds that attackers can exploit?",
    risk: "Deprecated accounts allow attackers to maintain access while avoiding scrutiny of normal user behavior."
  },
  {
    q: "Can attackers add themselves to administrative roles, create new privileged identities, or modify group memberships without triggering audit alerts or anomaly detection?",
    risk: "Privilege escalation without detection enables attackers to gain elevated access silently."
  },
  {
    q: "Can low-and-slow password guessing attacks (password sprays) avoid account lockout thresholds and evade detection due to lack of aggregated authentication failure analytics?",
    risk: "Password spray attacks can succeed without triggering alerts, compromising multiple accounts."
  },
  {
    q: "Are adversaries able to bypass MFA using legacy authentication protocols, session replay, or MFA fatigue attacks because risky sign-in behaviors aren't flagged or blocked?",
    risk: "MFA bypass techniques leave accounts vulnerable to compromise despite multi-factor protection."
  },
  {
    q: "Can malicious insiders with legitimate credentials exfiltrate data or abuse privileged access while blending with normal activity patterns absent user behavior analytics (UBA)?",
    risk: "Insider threats may go undetected, causing data loss or unauthorized actions within the organization."
  }



{
    q: "Have you enabled Microsoft Entra audit logs to provide complete traceability for all changes to identity resources, including user and group management, role assignments, application registrations, and policy modifications?",
    risk: "Without comprehensive audit logging, changes to identity resources may go unnoticed, preventing accountability and traceability."
  },
  {
    q: "Do you monitor authentication activities by tracking sign-in reports for all managed applications and user accounts to establish baselines and identify anomalies?",
    risk: "Failure to monitor authentication activities can allow unusual or malicious access to go undetected."
  },
  {
    q: "Have you enabled monitoring of risky sign-ins to flag authentication attempts from suspicious sources, impossible travel scenarios, unfamiliar locations, or leaked credential usage?",
    risk: "Without detecting risky sign-in patterns, compromised accounts may remain active, increasing security exposure."
  },
  {
    q: "Do you monitor users flagged for risk to detect compromised accounts showing multiple risk indicators requiring immediate investigation and remediation?",
    risk: "Failure to identify compromised accounts can allow attackers to maintain access and perform malicious actions."
  },
  {
    q: "Have you integrated Microsoft Entra ID logs with Azure Monitor, Microsoft Sentinel, or third-party SIEM platforms for advanced correlation, long-term retention, and cross-domain threat detection analytics?",
    risk: "Without SIEM integration, important logs may not be analyzed effectively, reducing visibility into threats and incidents."
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


