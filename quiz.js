let currentIndex = 0;
const answers = {};

const questionBox = document.querySelector(".question-box");
const questionText = document.getElementById("question-text");
const riskText = document.getElementById("risk-text");
const optionsDiv = document.querySelector(".options");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

// Load the current item (section or question)
function loadItem() {
  const item = questions[currentIndex];

  if (item.type === "section") {
    // SECTION SCREEN
    questionBox.style.display = "block";  
    questionText.textContent = item.title;
    optionsDiv.style.display = "none"; // hide Yes/No
    riskText.style.display = "none";   // hide orange bubble

    nextBtn.disabled = false; // sections can always proceed
  } else {
    // QUESTION SCREEN
    questionBox.style.display = "block";
    questionText.textContent = item.q;
    optionsDiv.style.display = "flex"; // show Yes/No above orange bubble
    riskText.style.display = "block";  // show orange bubble

    // Restore previous answer
    const radios = Array.from(document.getElementsByName("answer"));
    radios.forEach(rb => { rb.checked = answers[currentIndex] === rb.value; });

    // Disable Next if not answered
    nextBtn.disabled = answers[currentIndex] == null;
  }

  prevBtn.disabled = currentIndex === 0;
  nextBtn.textContent = currentIndex === questions.length - 1 ? "Finish" : "Next";
}

// Save the selected answer
function saveAnswer() {
  const radios = Array.from(document.getElementsByName("answer"));
  const selected = radios.find(rb => rb.checked);
  if (selected) answers[currentIndex] = selected.value;
}

// Enable Next button when a radio is selected
const radios = Array.from(document.getElementsByName("answer"));
radios.forEach(rb => {
  rb.addEventListener("change", () => {
    answers[currentIndex] = rb.value;
    nextBtn.disabled = false;
  });
});

// Navigation buttons
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
        <p style="font-size:32px;font-weight:normal;">${score} points</p>
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
