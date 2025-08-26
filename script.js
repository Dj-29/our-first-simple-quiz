const QA = [
  {
    q: "What is the capital of Palestine ?",
    a: ["Jeruselem", "Ram Allah", "Gaza", "Deir el Balah"],
    cIDx: 0,
  },
  {
    q: "who's the goat?",
    a: ["messi", "Ronaldo", "mahrez", "rayan"],
    cIDx: 3,
  },
  {
    q: "what's the capital of Algeria ?",
    a: ["algiers", "oran", "ourgla", "blida"],
    cIDx: 0,
  },
];
const RES = [];

let selectedAnswers = null;
let hasConfirmed = false;
let results = false;
let time = 4;
let functionTimer;
let qidx = 0;
let cdownInterval;
cdown = 10;

const gameSection = document.getElementById("questions");
const timerSection = document.getElementById("timer");
const startSection = document.getElementById("start");
const qtext = document.getElementById("qest");
const optionsList = document.getElementById("quiz-questions");
const confirmBtn = document.getElementById("confirm-button");
const timerButton = document.getElementById("timer-btn");
const nextButton = document.getElementById("next-button");
const cdownText = document.getElementById("countdown");
const finishButton = document.getElementById("finish-button");
const resultsSection = document.getElementById("results");
const scoreSection = document.getElementById("score");

const start = () => {
  startSection.style.display = "none";
  timerSection.style.display = "flex";
  timer();
  qtext.textContent = QA[qidx].q;

  const ans = QA[qidx].a
    .map((el, idx) => {
      return `<li class="option" key="idx" onclick="select(${idx})"> ${el}</li>`;
    })
    .join("");

  optionsList.innerHTML = ans;
};
const timer = () => {
  console.log("timer", time);
  functionTimer = setInterval(() => {
    timerButton.textContent = time;

    if (time == 0) {
      timerButton.textContent = "Start Quiz";
      timerButton.addEventListener("click", startQuiz);
      clearInterval(functionTimer);
    }
    time--;
  }, 1000);
};

const startQuiz = () => {
  timerSection.style.display = "none";
  gameSection.style.display = "block ";
  qtext.textContent = QA[qidx].q;

  const ans = QA[qidx].a
    .map((el, idx) => {
      return `<li class="option" key="idx" onclick="select(${idx})"> ${el}</li>`;
    })
    .join("");
  //counting();

  optionsList.innerHTML = ans;
};
// const counting = () => {
//   cdownInterval = setInterval(() => {
//     cdownText.textContent = `Time left: ${cdown}s`;

//     if (cdown <= 0) {
//       console.log("yooooo", cdown <= 0);
//       clearInterval(cdownInterval);
//     }
//     cdown--;
//   }, 1000);
// };

const select = (idx) => {
  selectedAnswers = idx;
  const options = document.querySelectorAll(".option");
  options.forEach((el, index) => {
    el.classList.remove("selected");
    if (index == idx && !hasConfirmed) el.classList.add("selected");
  });
};
const confirm = () => {
  if (typeof selectedAnswers != "number") {
    window.alert("Select answer first");
    return;
  }
  if (hasConfirmed) return;
  const correctAnswer = QA[qidx].a
    .map((el, idx) => {
      const correctans =
        idx == QA[qidx].cIDx
          ? "correct"
          : idx == selectedAnswers
          ? "incorrect"
          : "";
      return `<li class="option ${correctans}"  data-index="${idx}onclick="select(${idx})"> ${el}</li>`;
    })
    .join("");

  optionsList.innerHTML = correctAnswer;
  hasConfirmed = true;
  nextButton.style.display = "inline-block";
  RES.push({
    question: qidx,
    select: selectedAnswers,
    correct: QA[qidx].cIDx,
  });
  console.log(RES);
};
const next = () => {
  if (!hasConfirmed) return;
  qidx++;
  hasConfirmed = false;
  nextButton.style.display = "none";

  if (qidx >= QA.length) {
    window.alert("The quiz is over! Thanks for playing!");
    return;
  }

  startQuiz();
};
const finish = () => {
  resultsSection.style.display = "block";
  gameSection.style.display = "none";
  resultsSection.innerHTML = "<h1>Your Answers:</h1>";
  console.log(displayResults());
  resultsSection.innerHTML = displayResults();

  saveQuiz();
};
const displayResults = () => {
  return RES.map((el) => {
    console.log(el);
    return `<li class="qa-item">
                <div class="question">
                  <span class="question-label">Q:</span>
                  <span class="question-text">${QA[el.question].q}</span>
                </div>
                <div class="answer">
                  <span class="answer-label">A:</span>
                  <span class="answer-text">${
                    QA[el.question].a[el.select]
                  }</span>
                </div>
              </li>
              <div class="correct-answer">
                  <span class="answer-label">CA:</span>
                  <span class="answer-text">${
                    QA[el.question].a[el.correct]
                  }</span>
                </div>
              </li>
              `;
  }).join("");
};

const saveQuiz = () => {
  let history = JSON.parse(localStorage.getItem("quizHistory")) || [];
  const scoreCounting = RES.filter((el) => el.select === el.correct).length;
  history.push({
    date: new Date().toISOString(),
    score: `${scoreCounting}/${QA.length}`,
    total: QA.length,
    answers: RES,
  });

  localStorage.setItem("quizHistory", JSON.stringify(history));
};

const QuizHistory = () => {
  return JSON.parse(localStorage.getItem("quizHistory"));
};
