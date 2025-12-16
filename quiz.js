let currentIndex = -1; // -1 = intro page
const answers = {};

// Elements
const introPage = document.getElementById("intro-page");
const questionBox = document.getElementById("question-box");
const questionText = document.getElementById("question-text");
const ltInfoDiv = document.createElement("div"); // container for LT info
ltInfoDiv.id = "lt-info";
ltInfoDiv.style.display = "none";
ltInfoDiv.style.marginTop = "20px";
ltInfoDiv.style.fontSize = "18px";
ltInfoDiv.style.lineHeight = "1.6";
ltInfoDiv.style.maxHeight = "600px";
ltInfoDiv.style.overflowY = "auto";
ltInfoDiv.style.background = "#f2f2f2";
ltInfoDiv.style.padding = "20px 40px";
ltInfoDiv.style.borderRadius = "15px";
ltInfoDiv.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.15)";
ltInfoDiv.style.width = "95%";
ltInfoDiv.style.maxWidth = "1400px";
ltInfoDiv.style.position = "fixed";
ltInfoDiv.style.top = "260px"; // below section title
ltInfoDiv.style.left = "50%";
ltInfoDiv.style.transform = "translateX(-50%)";
ltInfoDiv.style.zIndex = "500";
document.querySelector(".quiz-container").appendChild(ltInfoDiv);

const riskText = document.getElementById("risk-text");
const optionsDiv = document.querySelector(".options");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const radios = Array.from(document.getElementsByName("answer"));

// Questions and LT sections
const questions = [
  {
    type: "section",
    title: "LT-1",
    ltInfo: `
      <strong>Criticality level:</strong> Must have<br><br>
      <strong>Control mapping:</strong><br>
      NIST SP 800-53 Rev.5: SI-4(1), SI-4(2), SI-4(5), SI-4(12), SI-4(23), AU-6(1), AU-6(3)<br>
      PCI-DSS v4: 10.6.1, 10.6.2, 10.6.3, 10.8.1, 11.5.1<br>
      CIS Controls v8.1: 8.11, 13.1, 13.2<br>
      NIST CSF v2.0: DE.CM-1, DE.CM-4, DE.CM-7<br>
      ISO 27001:2022: A.8.16, A.5.24<br>
      SOC 2: CC7.2, CC7.3
    `
  },
  {
    type: "section",
    title: "LT-2",
    ltInfo: `
      <strong>Criticality level:</strong> Must have<br><br>
      <strong>Control mapping:</strong><br>
      NIST SP 800-53 Rev.5: AU-2(1), AU-6(1), AU-6(3), IA-4(4), SI-4(1), SI-4(12)<br>
      PCI-DSS v4: 8.2.8, 10.2.1, 10.2.2, 10.6.1<br>
      CIS Controls v8.1: 6.2, 8.5, 8.11<br>
      NIST CSF v2.0: DE.CM-1, PR.AC-4, PR.IP-8<br>
      ISO 27001:2022: A.5.16, A.8.15, A.8.16<br>
      SOC 2: CC6.1, CC7.2, CC7.3
    `
  },
  {
    type: "section",
    title: "LT-3",
    ltInfo: `
      <strong>Criticality level:</strong> Must have<br><br>
      <strong>Control mapping:</strong><br>
      NIST SP 800-53 Rev.5: AU-2(1), AU-3(1), AU-6(1), AU-6(3), AU-12(1), SI-4(2)<br>
      PCI-DSS v4: 10.2.1, 10.2.2, 10.3.1, 10.3.2, 10.3.3<br>
      CIS Controls v8.1: 8.2, 8.3, 8.5, 8.12<br>
      NIST CSF v2.0: DE.AE-3, DE.CM-1, DE.CM-6, PR.PT-1<br>
      ISO 27001:2022: A.8.15, A.8.16, A.8.17<br>
      SOC 2: CC4.1, CC7.2, CC7.3
    `
  },
  {
    type: "section",
    title: "LT-4",
    ltInfo: `
      <strong>Criticality level:</strong> Must have<br><br>
      <strong>Control mapping:</strong><br>
      NIST SP 800-53 Rev.5: AU-2(1), AU-3(1), AU-6(1), AU-12(1), SI-4(2), SI-4(4), SI-4(5), SI-4(12)<br>
      PCI-DSS v4: 10.2.1, 10.2.2, 10.3.1, 10.3.2, 11.4.1, 11.4.2<br>
      CIS Controls v8.1: 8.2, 8.5, 8.6, 8.11, 13.6<br>
      NIST CSF v2.0: DE.AE-3, DE.CM-1, DE.CM-4, DE.CM-6, DE.CM-7<br>
      ISO 27001:2022: A.8.15, A.8.16<br>
      SOC 2: CC7.2
    `
  },
  {
    type: "section",
    title: "LT-5",
    ltInfo: `
      <strong>Criticality level:</strong> Must have<br><br>
      <strong>Control mapping:</strong><br>
      NIST SP 800-53 Rev.5: AU-2(1), AU-3(1), AU-6(1), AU-6(3), AU-6(5), AU-7(1), AU-12(1), SI-4(1), SI-4(2), SI-4(5), SI-4(12)<br>
      PCI-DSS v4: 10.4.1, 10.4.2, 10.4.3, 10.7.1, 10.7.2, 10.7.3<br>
      CIS Controls v8.1: 8.9, 8.11, 13.1, 13.3, 13.4, 17.1<br>
      NIST CSF v2.0: DE.AE-2, DE.AE-3, DE.CM-1, DE.CM-4, DE.CM-6, DE.CM-7, RS.AN-1<br>
      ISO 27001:2022: A.8.15, A.8.16, A.5.25<br>
      SOC 2: CC7.2, CC7.3
    `
  },
  {
    type: "section",
    title: "LT-6",
    ltInfo: `
      <strong>Criticality level:</strong> Should have<br><br>
      <strong>Control mapping:</strong><br>
      NIST SP 800-53 Rev.5: AU-11(1), SI-12<br>
      PCI-DSS v4: 10.5.1, 10.7.1, 10.7.2, 10.7.3<br>
      CIS Controls v8.1: 8.3, 8.10<br>
      NIST CSF v2.0: PR.PT-1, DE.CM-1<br>
      ISO 27001:2022: A.8.15<br>
      SOC 2: CC7.2
    `
  },
  {
    type: "section",
    title: "LT-7",
    ltInfo: `
      <strong>Criticality level:</strong> Should have<br><br>
      <strong>Control mapping:</strong><br>
      NIST SP 800-53 Rev.5: AU-8(1), AU-8(2)<br>
      PCI-DSS v4: 10.6.1, 10.6.2, 10.6.3<br>
      CIS Controls v8.1: 8.4<br>
      NIST CSF v2.0: DE.CM-1, PR.PT-1<br>
      ISO 27001:2022: A.8.15<br>
      SOC 2: CC7.2
    `
  },
  // Example questions after LT sections
  {
    type: "question",
    q: "Does your system log all privileged user activities?",
    risk: "Missing privileged logs increases risk of unauthorized access and undetected breaches."
  },
  {
    type: "question",
    q: "Are alerts generated and monitored for suspicious activities?",
    risk: "Lack of alerting delays incident detection and response."
  }
];

// Load items
function loadItem() {
  // Intro page
  if (currentIndex === -1) {
    introPage.style.display = "block";
    questionBox.style.display = "none";
    optionsDiv.style.display = "none";
    riskText.style.display = "none";
    ltInfoDiv.style.display = "none";
    prevBtn.style.display = "none";
    nextBtn.disabled = false;
    nextBtn.textContent = "Next";
    return;
  } 

  introPage.style.display = "none";
  questionBox.style.display = "block";
  prevBtn.style.display = "inline-block";

  const item = questions[currentIndex];

  if (item.type === "section") {
    // Section view (LT1-LT7)
    questionBox.classList.add("section-view");
    questionText.textContent = item.title;

    // Show LT info
    ltInfoDiv.style.display = "block";
    ltInfoDiv.innerHTML = item.ltInfo;

    // Hide question items
    optionsDiv.style.display = "none";
    riskText.style.display = "none";

    nextBtn.disabled = false;
    nextBtn.textContent = "Next";
  } else {
    // Question view
    questionBox.classList.remove("section-view");
    questionText.textContent = item.q;

    // Hide LT info
    ltInfoDiv.style.display = "none";

    // Show options and risk
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

// Enable Next when answered for questions
radios.forEach(rb => {
  rb.addEventListener("change", () => {
    answers[currentIndex] = rb.value;
    nextBtn.disabled = false;
  });
});

// Navigation
nextBtn.addEventListener("click", () => {
  if (currentIndex === -1) {
    currentIndex = 0; // intro → first LT
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
