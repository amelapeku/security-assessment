let currentIndex = -1;
const answers = {};

const introPage = document.getElementById("intro-page");
const questionBox = document.getElementById("question-box");
const questionText = document.getElementById("question-text");
const ltInfo = document.getElementById("lt-info");
const riskText = document.getElementById("risk-text");
const optionsDiv = document.querySelector(".options");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const radios = Array.from(document.getElementsByName("answer"));

const ltDetails = {
  "LT-1": document.getElementById("lt1-info")?.innerHTML,
  "LT-2": document.getElementById("lt2-info")?.innerHTML,
  "LT-3": document.getElementById("lt3-info")?.innerHTML,
  "LT-4": document.getElementById("lt4-info")?.innerHTML,
  "LT-5": document.getElementById("lt5-info")?.innerHTML,
  "LT-6": document.getElementById("lt6-info")?.innerHTML,
  "LT-7": document.getElementById("lt7-info")?.innerHTML
};

function hideAllLTInfo() {
  ltInfo.style.display = "none";
  ltInfo.innerHTML = "";
}

function loadItem() {
  // INTRO
  if (currentIndex === -1) {
    introPage.style.display = "block";
    questionBox.style.display = "none";
    optionsDiv.style.display = "none";
    riskText.style.display = "none";
    hideAllLTInfo();
    prevBtn.style.display = "none";
    nextBtn.disabled = false;
    return;
  }

  introPage.style.display = "none";
  questionBox.style.display = "block";
  prevBtn.style.display = "inline-block";

  const item = questions[currentIndex];

  // SECTION (LT)
  if (item.type === "section") {
    questionBox.classList.add("section-view");
    questionText.textContent = item.title;

    const key = item.title.split(":")[0];
    ltInfo.innerHTML = document.getElementById(key.toLowerCase() + "-info")?.innerHTML || "";
    ltInfo.style.display = "block";

    optionsDiv.style.display = "none";
    riskText.style.display = "none";
    nextBtn.disabled = false;
    return;
  }

  // QUESTION
  questionBox.classList.remove("section-view");
  questionText.textContent = item.q;

  hideAllLTInfo();

  optionsDiv.style.display = "flex";
  riskText.textContent = item.risk;
  riskText.style.display = "block";

  radios.forEach(r => r.checked = answers[currentIndex] === r.value);
  nextBtn.disabled = answers[currentIndex] == null;
}

// Enable Next on answer
radios.forEach(radio => {
  radio.addEventListener("change", () => {
    answers[currentIndex] = radio.value;
    nextBtn.disabled = false;
  });
});

// Navigation
nextBtn.addEventListener("click", () => {
  currentIndex++;
  loadItem();
});

prevBtn.addEventListener("click", () => {
  currentIndex--;
  loadItem();
});

// Init
loadItem();
