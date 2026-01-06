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
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const sidebar = document.getElementById("sidebar");

const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");

// ===============================
// NAV BUTTON VISIBILITY CONTROL
// ===============================
function updateNavButtons() {
  const buttonsContainer = document.querySelector(".buttons");

  // Welcome page
  if (introPage.style.display === "block") {
    prevBtn.style.display = "none";
    nextBtn.style.display = "inline-block";
     nextBtn.textContent = "Next"; 
    if (buttonsContainer) buttonsContainer.style.justifyContent = "flex-end";
    return;
  }

  // Section intro pages
  if (inSectionIntro) {
    prevBtn.style.display = "inline-block";
    nextBtn.style.display = "inline-block";
    if (buttonsContainer) buttonsContainer.style.justifyContent = "space-between";
    return;
  }

  // Question pages
  prevBtn.style.display = "inline-block";
  nextBtn.style.display = "none";
  if (buttonsContainer) buttonsContainer.style.justifyContent = "flex-start";
}

// ===============================
// HTML DECODE HELPER
// ===============================
function decodeHTMLDeep(html) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  const once = textarea.value;
  textarea.innerHTML = once;
  return textarea.value;
}

// ===============================
// SECTION INTRO METADATA
// ===============================
const sectionIntroData = {
"LT-1: Enable threat detection capabilities": `
  &lt;p&gt;&lt;strong&gt;Criticality level:&lt;/strong&gt; Must have.&lt;br&gt;&lt;/p&gt;

  &lt;strong&gt;Control mapping:&lt;/strong&gt;
  NIST SP 800-53 Rev.5: SI-4(1), SI-4(2), SI-4(5), SI-4(12), SI-4(23), AU-6(1), AU-6(3)&lt;br&gt;
  PCI-DSS v4: 10.6.1, 10.6.2, 10.6.3, 10.8.1, 11.5.1&lt;br&gt;
  CIS Controls v8.1: 8.11, 13.1, 13.2&lt;br&gt;
  NIST CSF v2.0: DE.CM-1, DE.CM-4, DE.CM-7&lt;br&gt;
  ISO 27001:2022: A.8.16, A.5.24&lt;br&gt;
  SOC 2: CC7.2, CC7.3

  &lt;p style="margin-top:16px;"&gt;
    &lt;strong&gt;Reference:&lt;/strong&gt;
    &lt;a href="https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-v2-logging-threat-detection#lt-1"
       target="_blank" rel="noopener noreferrer"&gt;
      Microsoft Cloud Security Benchmark – LT-1: Enable threat detection capabilities
    &lt;/a&gt;
  &lt;/p&gt;
`,

"LT-2: Enable threat detection for identity and access management": `
  &lt;p&gt;&lt;strong&gt;Criticality level:&lt;/strong&gt; Must have.&lt;br&gt;&lt;/p&gt;

  &lt;strong&gt;Control mapping:&lt;/strong&gt;
  NIST SP 800-53 Rev.5: AU-2(1), AU-6(1), AU-6(3), IA-4(4), SI-4(1), SI-4(12)&lt;br&gt;
  PCI-DSS v4: 8.2.8, 10.2.1, 10.2.2, 10.6.1&lt;br&gt;
  CIS Controls v8.1: 6.2, 8.5, 8.11&lt;br&gt;
  NIST CSF v2.0: DE.CM-1, PR.AC-4, PR.IP-8&lt;br&gt;
  ISO 27001:2022: A.5.16, A.8.15, A.8.16&lt;br&gt;
  SOC 2: CC6.1, CC7.2, CC7.3

  &lt;p style="margin-top:16px;"&gt;
    &lt;strong&gt;Reference:&lt;/strong&gt;
    &lt;a href="https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-v2-logging-threat-detection#lt-2"
       target="_blank" rel="noopener noreferrer"&gt;
      Microsoft Cloud Security Benchmark – LT-2: Enable threat detection for identity and access management
    &lt;/a&gt;
  &lt;/p&gt;
`,

"LT-3: Enable logging for security investigation": `
  &lt;p&gt;&lt;strong&gt;Criticality level:&lt;/strong&gt; Must have.&lt;br&gt;&lt;/p&gt;

  &lt;strong&gt;Control mapping:&lt;/strong&gt;
  NIST SP 800-53 Rev.5: AU-2(1), AU-3(1), AU-6(1), AU-6(3), AU-12(1), SI-4(2)&lt;br&gt;
  PCI-DSS v4: 10.2.1, 10.2.2, 10.3.1, 10.3.2, 10.3.3&lt;br&gt;
  CIS Controls v8.1: 8.2, 8.3, 8.5, 8.12&lt;br&gt;
  NIST CSF v2.0: DE.AE-3, DE.CM-1, DE.CM-6, PR.PT-1&lt;br&gt;
  ISO 27001:2022: A.8.15, A.8.16, A.8.17&lt;br&gt;
  SOC 2: CC4.1, CC7.2, CC7.3

  &lt;p style="margin-top:16px;"&gt;
    &lt;strong&gt;Reference:&lt;/strong&gt;
    &lt;a href="https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-v2-logging-threat-detection"
       target="_blank" rel="noopener noreferrer"&gt;
      Microsoft Cloud Security Benchmark – LT-3: Enable logging for security investigation
    &lt;/a&gt;
  &lt;/p&gt;
`,

"LT-4: Enable network logging for security investigation": `
  &lt;p&gt;&lt;strong&gt;Criticality level:&lt;/strong&gt; Must have.&lt;br&gt;&lt;/p&gt;

  &lt;strong&gt;Control mapping:&lt;/strong&gt;
  NIST SP 800-53 Rev.5: AU-2(1), AU-3(1), AU-6(1), AU-12(1), SI-4(2), SI-4(4), SI-4(5), SI-4(12)&lt;br&gt;
  PCI-DSS v4: 10.2.1, 10.2.2, 10.3.1, 10.3.2, 11.4.1, 11.4.2&lt;br&gt;
  CIS Controls v8.1: 8.2, 8.5, 8.6, 8.11, 13.6&lt;br&gt;
  NIST CSF v2.0: DE.AE-3, DE.CM-1, DE.CM-4, DE.CM-6, DE.CM-7&lt;br&gt;
  ISO 27001:2022: A.8.15, A.8.16&lt;br&gt;
  SOC 2: CC7.2

  &lt;p style="margin-top:16px;"&gt;
    &lt;strong&gt;Reference:&lt;/strong&gt;
    &lt;a href="https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-v2-logging-threat-detection"
       target="_blank" rel="noopener noreferrer"&gt;
      Microsoft Cloud Security Benchmark – LT-4: Enable network logging for security investigation
    &lt;/a&gt;
  &lt;/p&gt;
`,

"LT-5: Centralize security log management and analysis": `
  &lt;p&gt;&lt;strong&gt;Criticality level:&lt;/strong&gt; Must have.&lt;br&gt;&lt;/p&gt;

  &lt;strong&gt;Control mapping:&lt;/strong&gt;
  NIST SP 800-53 Rev.5: AU-2(1), AU-3(1), AU-6(1), AU-6(3), AU-6(5), AU-7(1), AU-12(1), SI-4(1), SI-4(2), SI-4(5), SI-4(12)&lt;br&gt;
  PCI-DSS v4: 10.4.1, 10.4.2, 10.4.3, 10.7.1, 10.7.2, 10.7.3&lt;br&gt;
  CIS Controls v8.1: 8.9, 8.11, 13.1, 13.3, 13.4, 17.1&lt;br&gt;
  NIST CSF v2.0: DE.AE-2, DE.AE-3, DE.CM-1, DE.CM-4, DE.CM-6, DE.CM-7, RS.AN-1&lt;br&gt;
  ISO 27001:2022: A.8.15, A.8.16, A.5.25&lt;br&gt;
  SOC 2: CC7.2, CC7.3

  &lt;p style="margin-top:16px;"&gt;
    &lt;strong&gt;Reference:&lt;/strong&gt;
    &lt;a href="https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-v2-logging-threat-detection"
       target="_blank" rel="noopener noreferrer"&gt;
      Microsoft Cloud Security Benchmark – LT-5: Centralize security log management and analysis
    &lt;/a&gt;
  &lt;/p&gt;
`,

"LT-6: Configure log storage retention": `
  &lt;p&gt;&lt;strong&gt;Criticality level:&lt;/strong&gt; Should have.&lt;br&gt;&lt;/p&gt;

  &lt;strong&gt;Control mapping:&lt;/strong&gt;
  NIST SP 800-53 Rev.5: AU-11(1), SI-12&lt;br&gt;
  PCI-DSS v4: 10.5.1, 10.7.1, 10.7.2, 10.7.3&lt;br&gt;
  CIS Controls v8.1: 8.3, 8.10&lt;br&gt;
  NIST CSF v2.0: PR.PT-1, DE.CM-1&lt;br&gt;
  ISO 27001:2022: A.8.15&lt;br&gt;
  SOC 2: CC7.2

  &lt;p style="margin-top:16px;"&gt;
    &lt;strong&gt;Reference:&lt;/strong&gt;
    &lt;a href="https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-v2-logging-threat-detection"
       target="_blank" rel="noopener noreferrer"&gt;
      Microsoft Cloud Security Benchmark – LT-6: Configure log storage retention
    &lt;/a&gt;
  &lt;/p&gt;
`,

"LT-7: Use approved time synchronization sources": `
  &lt;p&gt;&lt;strong&gt;Criticality level:&lt;/strong&gt; Should have.&lt;br&gt;&lt;/p&gt;

  &lt;strong&gt;Control mapping:&lt;/strong&gt;
  NIST SP 800-53 Rev.5: AU-8(1), AU-8(2)&lt;br&gt;
  PCI-DSS v4: 10.6.1, 10.6.2, 10.6.3&lt;br&gt;
  CIS Controls v8.1: 8.4&lt;br&gt;
  NIST CSF v2.0: DE.CM-1, PR.PT-1&lt;br&gt;
  ISO 27001:2022: A.8.15&lt;br&gt;
  SOC 2: CC7.2

  &lt;p style="margin-top:16px;"&gt;
    &lt;strong&gt;Reference:&lt;/strong&gt;
    &lt;a href="https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-v2-logging-threat-detection"
       target="_blank" rel="noopener noreferrer"&gt;
      Microsoft Cloud Security Benchmark – LT-7: Use approved time synchronization sources
    &lt;/a&gt;
  &lt;/p&gt;
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
// HIGHLIGHT ACTIVE SECTION
// ===============================
function setActiveSidebar(section) {
  document.querySelectorAll("[data-section]").forEach(btn => {
    btn.classList.toggle("active-section", btn.dataset.section === section);
  });
}

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
  updateNavButtons();
}

// ===============================
// INITIAL LOAD
// ===============================
hideAll();
sidebar.style.display = "block";
introPage.style.display = "block";
updateNavButtons();

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
  setActiveSidebar(null);
  hideAll();
  sidebar.style.display = "block";
  introPage.style.display = "block";
  updateNavButtons();
};

// ===============================
// ENTER SECTION
// ===============================
function enterSection(section) {
  activeSection = section;
  inSectionIntro = true;
  setActiveSidebar(section);

  sectionPosition =
    sectionProgress[activeSection] >= 0
      ? sectionProgress[activeSection]
      : 0;

  hideAll();
  sidebar.style.display = "block";
  sectionInfo.style.display = "block";

  sectionInfo.innerHTML = `
    <h2 class="section-title">${activeSection}</h2>
    ${decodeHTMLDeep(sectionIntroData[activeSection] || "")}
  `;

  nextBtn.textContent =
    sectionProgress[activeSection] === -1
      ? "Start questions"
      : "Resume questions";

  updateNavButtons();
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

  yesBtn.classList.toggle("selected", answers[qIndex] === "yes");
  noBtn.classList.toggle("selected", answers[qIndex] === "no");

  const totalQuestions = sections[activeSection].questions.length;
  const currentQuestionNumber = sectionPosition + 1;

  document.getElementById("progress-text").textContent =
    `Question ${currentQuestionNumber} of ${totalQuestions}`;

  const progressPercent = Math.round(
    (currentQuestionNumber / totalQuestions) * 100
  );
  document.getElementById("progress-bar").style.width =
    `${progressPercent}%`;

  updateNavButtons();
}

// ===============================
// RECORD ANSWERS + AUTO ADVANCE
// ===============================
function selectAnswer(value) {
  answers[currentIndex] = value;
  sectionProgress[activeSection] = sectionPosition;

  yesBtn.classList.toggle("selected", value === "yes");
  noBtn.classList.toggle("selected", value === "no");

  setTimeout(() => {
    const isLastQuestion =
      sectionPosition === sections[activeSection].questions.length - 1;

    const keys = Object.keys(sections);
    const idx = keys.indexOf(activeSection);

    if (!isLastQuestion) {
      sectionPosition++;
      loadQuestion();
      return;
    }

    if (idx < keys.length - 1) {
      enterSection(keys[idx + 1]);
      return;
    }

    showResults();
  }, 200);
}

yesBtn.onclick = () => selectAnswer("yes");
noBtn.onclick = () => selectAnswer("no");

// ===============================
// NEXT BUTTON (WELCOME + SECTION INTRO ONLY)
// ===============================
nextBtn.onclick = () => {
  if (introPage.style.display === "block") {
    enterSection(Object.keys(sections)[0]);
    return;
  }

  if (activeSection && inSectionIntro) {
    inSectionIntro = false;
    loadQuestion();
  }
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
  }
};

// ===============================

// ===============================
// ===============================
// RESULTS
// ===============================
function showResults() {
  hideAll();
  resultsContainer.style.display = "block";
  document.querySelector(".buttons").style.display = "none";

  const total = questions.filter(q => !q.type).length;
  const yes = Object.values(answers).filter(a => a === "yes").length;

  // Overall assessment score
  let scoreHTML = `<strong>Overall Assessment Score:</strong> ${Math.round((yes / total) * 100)}% Yes<br><br>`;

  // Section-by-section scores
  scoreHTML += `<strong>Section Scores:</strong><br>`;
  Object.keys(sections).forEach(sectionTitle => {
    const sectionQuestions = sections[sectionTitle].questions;
    const sectionYes = sectionQuestions.filter(i => answers[i] === "yes").length;
    const sectionPercent = Math.round((sectionYes / sectionQuestions.length) * 100);
    scoreHTML += `${sectionTitle}: ${sectionPercent}% score<br>`;
  });

  scoreHTML += `<br>The following key points highlight areas to focus on to strengthen your organization’s security:`;
  document.getElementById("score-text").innerHTML = scoreHTML;

  // List of "no" answers per section
  const container = document.getElementById("no-answers-container");
  container.innerHTML = "";

  Object.keys(sections).forEach(sectionTitle => {
    const noQuestions = sections[sectionTitle].questions
      .filter(i => answers[i] === "no")
      .map(i => questions[i].q);

    if (noQuestions.length) {
      const div = document.createElement("div");
      div.innerHTML = `<h4>${sectionTitle}</h4>`;

      const ul = document.createElement("ul");
      ul.classList.add("no-answers");

      noQuestions.forEach(q => {
        const li = document.createElement("li");
        li.textContent = q;
        ul.appendChild(li);
      });

      div.appendChild(ul);
      container.appendChild(div);
    }
  });
}


// ===============================
// ===============================
// DOWNLOAD PDF
// ===============================
document.getElementById("download-btn").onclick = () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageHeight = 297;
  const marginTop = 15;
  const marginLeft = 15;
  const lineHeight = 6;
  const maxWidth = 180;
  let y = marginTop;

  const total = questions.filter(q => !q.type).length;
  const yes = Object.values(answers).filter(a => a === "yes").length;

  // ===== OVERALL ASSESSMENT SCORE =====
  doc.setFontSize(14);
  doc.text(`Overall Assessment Score: ${Math.round((yes / total) * 100)}% Yes`, marginLeft, y);
  y += 12;

  doc.setFontSize(12);
  doc.text("Section Scores:", marginLeft, y);
  y += 8;

  // ===== SECTION-BY-SECTION SCORES =====
  Object.keys(sections).forEach(sectionTitle => {
    const sectionQuestions = sections[sectionTitle].questions;
    const sectionYes = sectionQuestions.filter(i => answers[i] === "yes").length;
    const sectionPercent = Math.round((sectionYes / sectionQuestions.length) * 100);
    const sectionLine = `${sectionTitle}: ${sectionPercent}% score`;

    const lines = doc.splitTextToSize(sectionLine, maxWidth);
    const blockHeight = lines.length * lineHeight;
    if (y + blockHeight > pageHeight - marginTop) {
      doc.addPage();
      y = marginTop;
    }
    doc.text(lines, marginLeft, y);
    y += blockHeight + 4;
  });

  y += 4;
  doc.setFontSize(11);
  doc.text("Key points to focus on (questions answered 'No'):", marginLeft, y);
  y += 8;

  // ===== LIST OF "NO" ANSWERS PER SECTION =====
  Object.keys(sections).forEach(sectionTitle => {
    const noQuestions = sections[sectionTitle].questions
      .filter(i => answers[i] === "no")
      .map(i => questions[i].q);

    if (!noQuestions.length) return;

    if (y + 10 > pageHeight - marginTop) {
      doc.addPage();
      y = marginTop;
    }

    // Section header
    doc.setFont(undefined, "bold");
    doc.text(sectionTitle, marginLeft, y);
    y += 8;
    doc.setFont(undefined, "normal");

    // Questions
    noQuestions.forEach(q => {
      const lines = doc.splitTextToSize(`• ${q}`, maxWidth);
      const blockHeight = lines.length * lineHeight;

      if (y + blockHeight > pageHeight - marginTop) {
        doc.addPage();
        y = marginTop;
      }

      doc.text(lines, marginLeft + 4, y);
      y += blockHeight + 2;
    });

    y += 4;
  });

  doc.save("assessment_results.pdf");
};

