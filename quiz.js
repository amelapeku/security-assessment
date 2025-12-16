let currentIndex = -1; // -1 = intro page
const answers = {};

const introPage = document.getElementById("intro-page");
const questionBox = document.getElementById("question-box");
const questionText = document.getElementById("question-text");
const riskText = document.getElementById("risk-text");
const optionsDiv = document.querySelector(".options");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const radios = Array.from(document.getElementsByName("answer"));

function loadItem() {
  // Intro page
  if (currentIndex === -1) {
    introPage.style.display = "block";
    questionBox.style.display = "none";
    optionsDiv.style.display = "none";
    riskText.style.display = "none";
    prevBtn.style.display = "none";

    nextBtn.disabled = false;
    nextBtn.textContent = "Next";

    // Align Next button to right
    document.querySelector(".buttons").classList.add("intro-next");
    return;
  } 

  // Other pages
  introPage.style.display = "none";
  questionBox.style.display = "block";
  prevBtn.style.display = "inline-block";

  // Remove intro-next class
  document.querySelector(".buttons").classList.remove("intro-next");

  const item = questions[currentIndex];

  if (item.type === "section") {
    questionBox.classList.add("section-view");
    questionText.textContent = item.title;
    optionsDiv.style.display = "none";
    riskText.style.display = "none";
    nextBtn.disabled = false;
    nextBtn.textContent = "Next";
  } else {
    questionBox.classList.remove("section-view");
    questionText.textContent = item.q;
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
    currentIndex = 0; // move from intro to first section
    loadItem();
    return;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadItem();
  } else {
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
