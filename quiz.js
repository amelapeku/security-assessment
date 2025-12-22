let activeSection = null;
let sectionPosition = -1;
let inSectionIntro = false;
let currentIndex = null;

const answers = {};
const sectionProgress = {};
const introPage = document.getElementById("intro-page");
const questionBox = document.getElementById("question-box");
const questionText = document.getElementById("question-text");
const riskText = document.getElementById("risk-text");
const sectionInfo = document.getElementById("section-info");
const resultsContainer = document.getElementById("results-container");
const optionsDiv = document.querySelector(".options");
const radios = Array.from(document.getElementsByName("answer"));
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const finishBtn = document.getElementById("finish-btn");
const sidebar = document.getElementById("sidebar");

// ===============================
// SECTION INTRO METADATA (UNCHANGED)
// ===============================
const sectionIntroData = {
  "LT-1: Enable threat detection capabilities": `
    <strong>Criticality level:</strong> Must have.<br>
    <strong>Control mapping:</strong> NIST SP 800-53 Rev.5: SI-4(1), SI-4(2), SI-4(5), SI-4(12), SI-4(23), AU-6(1), AU-6(3)<br>
    PCI-DSS v4: 10.6.1, 10.6.2, 10.6.3, 10.8.1, 11.5.1<br>
    CIS Controls v8.1: 8.11, 13.1, 13.2<br>
    NIST CSF v2.0: DE.CM-1, DE.CM-4, DE.CM-7<br>
    ISO 27001:2022: A.8.16, A.5.24<br>
    SOC 2: CC7.2, CC7.3
  `,
  "LT-2: Enable threat detection for identity and access management": `
    <strong>Criticality level:</strong> Must have.<br>
    <strong>Control mapping:</strong> NIST SP 800-53 Rev.5: AU-2(1), AU-6(1), AU-6(3), IA-4(4), SI-4(1), SI-4(12)<br>
    PCI-DSS v4: 8.2.8, 10.2.1, 10.2.2, 10.6.1<br>
    CIS Controls v8.1: 6.2, 8.5, 8.11<br>
    NIST CSF v2.0: DE.CM-1, PR.AC-4, PR.IP-8<br>
    ISO 27001:2022: A.5.16, A.8.15, A.8.16<br>
    SOC 2: CC6.1, CC7.2, CC7.3
  `,
  "LT-3: Enable logging for security investigation": `
    <strong>Criticality level:</strong> Must have.<br>
    <strong>Control mapping:</strong> NIST SP 800-53 Rev.5: AU-2(1), AU-3(1), AU-6(1), AU-6(3), AU-12(1), SI-4(2)<br>
    PCI-DSS v4: 10.2.1, 10.2.2, 10.3.1, 10.3.2, 10.3.3<br>
    CIS Controls v8.1: 8.2, 8.3, 8.5, 8.12<br>
    NIST CSF v2.0: DE.AE-3, DE.CM-1, DE.CM-6, PR.PT-1<br>
    ISO 27001:2022: A.8.15, A.8.16, A.8.17<br>
    SOC 2: CC4.1, CC7.2, CC7.3
  `,
  "LT-4: Enable network logging for security investigation": `
    <strong>Criticality level:</strong> Must have.<br>
    <strong>Control mapping:</strong> NIST SP 800-53 Rev.5: AU-2(1), AU-3(1), AU-6(1), AU-12(1), SI-4(2), SI-4(4), SI-4(5), SI-4(12)<br>
    PCI-DSS v4: 10.2.1, 10.2.2, 10.3.1, 10.3.2, 11.4.1, 11.4.2<br>
    CIS Controls v8.1: 8.2, 8.5, 8.6, 8.11, 13.6<br>
    NIST CSF v2.0: DE.AE-3, DE.CM-1, DE.CM-4, DE.CM-6, DE.CM-7<br>
    ISO 27001:2022: A.8.15, A.8.16<br>
    SOC 2: CC7.2
  `,
  "LT-5: Centralize security log management and analysis": `
    <strong>Criticality level:</strong> Must have.<br>
    <strong>Control mapping:</strong> NIST SP 800-53 Rev.5: AU-2(1), AU-3(1), AU-6(1), AU-6(3), AU-6(5), AU-7(1), AU-12(1), SI-4(1), SI-4(2), SI-4(5), SI-4(12)<br>
    PCI-DSS v4: 10.4.1, 10.4.2, 10.4.3, 10.7.1, 10.7.2, 10.7.3<br>
    CIS Controls v8.1: 8.9, 8.11, 13.1, 13.3, 13.4, 17.1<br>
    NIST CSF v2.0: DE.AE-2, DE.AE-3, DE.CM-1, DE.CM-4, DE.CM-6, DE.CM-7, RS.AN-1<br>
    ISO 27001:2022: A.8.15, A.8.16, A.5.25<br>
    SOC 2: CC7.2, CC7.3
  `,
  "LT-6: Configure log storage retention": `
    <strong>Criticality level:</strong> Should have.<br>
    <strong>Control mapping:</strong> NIST SP 800-53 Rev.5: AU-11(1), SI-12<br>
    PCI-DSS v4: 10.5.1, 10.7.1, 10.7.2, 10.7.3<br>
    CIS Controls v8.1: 8.3, 8.10<br>
    NIST CSF v2.0: PR.PT-1, DE.CM-1<br>
    ISO 27001:2022: A.8.15<br>
    SOC 2: CC7.2
  `,
  "LT-7: Use approved time synchronization sources": `
    <strong>Criticality level:</strong> Should have.<br>
    <strong>Control mapping:</strong> NIST SP 800-53 Rev.5: AU-8(1), AU-8(2)<br>
    PCI-DSS v4: 10.6.1, 10.6.2, 10.6.3<br>
    CIS Controls v8.1: 8.4<br>
    NIST CSF v2.0: DE.CM-1, PR.PT-1<br>
    ISO 27001:2022: A.8.15<br>
    SOC 2: CC7.2
  `
};

// ===============================
// BUILD SECTIONS
// ===============================
const sections = {};
let currentSection = null;

questions.forEach((q, i) => {
  if (q.type === "section") {
    currentSection = q.title;
    sections[currentSection] = { introIndex: i, questions: [] };
    sectionProgress[currentSection] = -1;
  } else {
    sections[currentSection].questions.push(i);
  }
});

// ===============================
// VIEW MANAGEMENT
// ===============================
function hideAll() {
  introPage.style.display = "none";
  questionBox.style.display = "none";
  optionsDiv.style.display = "none";
  riskText.style.display = "none";
  sectionInfo.style.display = "none";
  resultsContainer.style.display = "none";
  sidebar.style.display = "none";
  document.querySelector(".buttons").style.display = "flex";
}

// ===============================
// INITIAL LOAD (WELCOME PAGE)
// ===============================
hideAll();
sidebar.style.display = "block";
introPage.style.display = "block";

// ===============================
// SIDEBAR NAVIGATION
// ===============================
document.querySelectorAll("[data-section]").forEach(btn => {
  btn.onclick = () => enterSection(btn.dataset.section);
});

// ===============================
// WELCOME BUTTON
// ===============================
document.getElementById("welcome-btn").onclick = () => {
  activeSection = null;
  inSectionIntro = false;
  sectionPosition = -1;

  hideAll();
  sidebar.style.display = "block";
  introPage.style.display = "block";
};

// ===============================
// ENTER SECTION
// ===============================
function enterSection(section) {
  activeSection = section;
  inSectionIntro = true;

  sectionPosition =
    sectionProgress[activeSection] >= 0
      ? sectionProgress[activeSection]   // ✅ last answered
      : 0;

  hideAll();
  sidebar.style.display = "block";
  sectionInfo.style.display = "block";

  sectionInfo.innerHTML = sectionIntroData[activeSection] || activeSection;
nextBtn.textContent =
  sectionProgress[activeSection] === -1
    ? "Start questions"
    : "Resume questions";
  prevBtn.style.visibility = "visible";
  prevBtn.disabled = false;
}

// ===============================
// LOAD QUESTION
// ===============================
function loadQuestion() {
  hideAll();
  sidebar.style.display = "block";
  questionBox.style.display = "block";
  optionsDiv.style.display = "flex";
  riskText.style.display = "block";

  const qIndex = sections[activeSection].questions[sectionPosition];
  const item = questions[qIndex];
  currentIndex = qIndex;

  questionText.textContent = item.q;
  riskText.textContent = item.risk;
  radios.forEach(r => (r.checked = answers[qIndex] === r.value));

  nextBtn.textContent =
    sectionPosition === sections[activeSection].questions.length - 1
      ? "Next Section"
      : "Next";
}

// ===============================
// RECORD ANSWERS
// ===============================
radios.forEach(r => r.onchange = () => {
  answers[currentIndex] = r.value;
  sectionProgress[activeSection] = sectionPosition;
});

// ===============================
// NEXT BUTTON (ADJUSTED)
// ===============================
nextBtn.onclick = () => {
  if (introPage.style.display === "block") {
    enterSection(Object.keys(sections)[0]);
    return;
  }

  if (activeSection && inSectionIntro) {
    inSectionIntro = false;

    sectionPosition =
      sectionProgress[activeSection] >= 0
        ? sectionProgress[activeSection]   // ✅ stay on last answered
        : 0;

    loadQuestion();
    return;
  }

  if (!answers[currentIndex]) {
    alert("Please answer Yes or No before continuing.");
    return;
  }

  if (sectionPosition < sections[activeSection].questions.length - 1) {
    sectionPosition++;
    loadQuestion();
    return;
  }

  const keys = Object.keys(sections);
  const idx = keys.indexOf(activeSection);
  if (idx < keys.length - 1) {
    enterSection(keys[idx + 1]);
    return;
  }

  finishBtn.disabled = false;
  showResults();
};

// ===============================
// PREVIOUS BUTTON
// ===============================
prevBtn.onclick = () => {
  if (activeSection && !inSectionIntro && sectionPosition > 0) {
    sectionPosition--;
    loadQuestion();
  } else if (activeSection && !inSectionIntro && sectionPosition === 0) {
    inSectionIntro = true;
    enterSection(activeSection);
  } else {
    hideAll();
    sidebar.style.display = "block";
    introPage.style.display = "block";
    activeSection = null;
  }
};

// ===============================
// RESULTS
// ===============================
function showResults() {
  hideAll();
  resultsContainer.style.display = "block";
  document.querySelector(".buttons").style.display = "none";

  const total = questions.filter(q => !q.type).length;
  const yes = Object.values(answers).filter(a => a === "yes").length;

  document.getElementById("score-text").textContent =
    `You answered "Yes" to ${Math.round((yes / total) * 100)}% of questions`;

  const container = document.getElementById("no-answers-container");
  container.innerHTML = "";

  let currentSectionTitle = "";
  questions.forEach((q, i) => {
    if (q.type === "section") currentSectionTitle = q.title;
    else if (answers[i] === "no") {
      const div = document.createElement("div");
      div.innerHTML = `<h4>${currentSectionTitle}</h4><p>${q.q}</p>`;
      container.appendChild(div);
    }
  });
}

