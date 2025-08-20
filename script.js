const QA = {
  q: "What is the capital of Palestine ?",
  a: ["Jeruselem", "Ram Allah", "Gaza", "Deir el Balah"],
  cIDx: 0,
};

let selectedAnswers = null;
let hasConfirmed = false;
let time = 5;
let functionTimer;

const gameSection = document.getElementById("questions");
const timerSection = document.getElementById("timer");
const startSection = document.getElementById("start");
const qtext = document.getElementById("qest");
const optionsList = document.getElementById("quiz-questions");
const confirmBtn = document.getElementById("confirm-btn");
const timerButton = document.getElementById("timer-btn");
const nextButton = document.getElementById("next-btn");
const start = () => {
  startSection.style.display = "none";
  timerSection.style.display = "flex";
  timer();
  qtext.textContent = QA.q;

  const ans = QA.a
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
  qtext.textContent = QA.q;

  const ans = QA.a
    .map((el, idx) => {
      return `<li class="option" key="idx" onclick="select(${idx})"> ${el}</li>`;
    })
    .join("");

  optionsList.innerHTML = ans;
};
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
  const correctAnswer = QA.a
    .map((el, idx) => {
      const correctans =
        idx == QA.cIDx ? "correct" : idx == selectedAnswers ? "incorrect" : "";
      return `<li class="option ${correctans}"  data-index="${idx}onclick="select(${idx})"> ${el}</li>`;
    })
    .join("");

  optionsList.innerHTML = correctAnswer;
  hasConfirmed = true;
};
