// 70 placeholder questions
const questions = Array.from({ length: 70 }, (_, i) => ({
    text: `Placeholder Question ${i + 1}: Replace this text with your real question.`,
}));

let currentQuestion = 0;
let answers = Array(questions.length).fill(null); // null = unanswered

function loadQuestion() {
    document.getElementById("question-text").innerText =
        questions[currentQuestion].text;

    document.getElementById("progress-text").innerText =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    let progressPercent = ((currentQuestion) / (questions.length)) * 100;
    document.getElementById("progress-fill").style.width = progressPercent + "%";
}

document.getElementById("yes-btn").onclick = () => {
    answers[currentQuestion] = 1;
};

document.getElementById("no-btn").onclick = () => {
    answers[currentQuestion] = 0;
};

document.getElementById("next-btn").onclick = () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showScore();
    }
};

document.getElementById("prev-btn").onclick = () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
};

function showScore() {
    let totalYes = answers.filter(a => a === 1).length;
    let scorePercent = Math.round((totalYes / questions.length) * 100);

    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    document.getElementById("final-score").innerText =
        `You scored ${scorePercent}%`;
}

// Initialize first question
loadQuestion();
