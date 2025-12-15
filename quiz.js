let currentIndex = 0;
const answers = {};

const sectionTitle = document.getElementById("section-title");
const questionText = document.getElementById("question-text");
const riskText = document.getElementById("risk-text");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const optionsDiv = document.querySelector(".options");
const riskDiv = document.querySelector(".risk-cloud");

function loadItem() {
  const item = questions[currentIndex];

  if (item.type === "section") {
    // SECTION SCREEN
    sectionTitle.style.display = "none"; // optional, you can hide the small h2
    questionText.textContent = item.title; // show section title in gray box
    riskDiv.style.display = "none";       // hide orange bubble
    optionsDiv.style.display = "none";    // hide Yes/No
  } else {
    // QUESTION SCREEN
    sectionTitle.style.display = "none"; // optional
    questionText.textContent = item.q;
    riskText.textContent = item.risk;
    riskDiv.style.display = "block";     // show orange bubble
    optionsDiv.style.display = "flex";   // show Yes/No

    // Set radio buttons
    const radios = Array.from(document.getElementsByName("answer"));
    radios.forEach(rb => { rb.checked = answers[currentIndex] === rb.value; });
  }

  prevBtn.disabled = currentIndex === 0;
  nextBtn.textContent = currentIndex === questions.length - 1 ? "Finish" : "Next";
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
