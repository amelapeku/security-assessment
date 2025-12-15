let currentIndex = 0;
let score = 0;
const answers = {};

const sectionTitle = document.getElementById("section-title");
const questionText = document.getElementById("question-text");
const riskText = document.getElementById("risk-text");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

function loadItem() {
  const item = questions[currentIndex];

  // SECTION SCREEN
  if (item.type === "section") {
    sectionTitle.textContent = item.title;
    questionText.textContent = "";
    riskText.textContent = "";
    document.querySelector(".answers").style.display = "none";
    return;
  }

  // QUESTION SCREEN
  sectionTitle.textContent = "";
  questionText.textContent = item.q;
  riskText.textContent = item.risk;
  document.querySelector(".answers").style.display = "block";

  const radioButtons = Array.from(document.getElementsByName("answer"));
  radioButtons.forEach(rb => {
    rb.checked = answers[currentIndex] === rb.value;
  });
}

function saveAnswer() {
  const radioButtons = Array.from(document.getElementsByName("answer"));
  const selected = radioButtons.find(rb => rb.checked);
  if (!selected) return;

  answers[currentIndex] = selected.value;
}

nextBtn.addEventListener("click", () => {
  saveAnswer();
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadItem();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    loadItem();
  }
});

loadItem();
