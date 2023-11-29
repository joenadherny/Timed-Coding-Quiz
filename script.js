var timerEl = document.querySelector("#timer-value");
var startContainerEl = document.querySelector("#start-container");
var questionContainerEl = document.querySelector("#question-container");
var endContainerEl = document.querySelector("#end-container");
var buttonZoneEl = document.querySelector("#button-zone");
var startButton = document.querySelector("#start-quiz");
var initialsInput = document.querySelector("#initials");

var currentQuestionIndex = 0;
var timeLeft = 60;
var timerId;

const questions = [
  {
    question: "In JavaScript, what is a closure?",
    answers: [
      { text: "A function with no parameters", correct: false },
      { text: "A way to lock variables", correct: false },
      { text: "A combination of a function and the lexical environment within which that function was declared", correct: true },
      { text: "A loop that never ends", correct: false }
    ]
  },
  {
    question: "Which of the following is a CSS preprocessor?",
    answers: [
      { text: "JavaScript", correct: false },
      { text: "HTML", correct: false },
      { text: "Sass", correct: true },
      { text: "Python", correct: false }
    ]
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "HyperText Markup Language", correct: true },
      { text: "High-Level Text Manipulation Language", correct: false },
      { text: "Hyperlink and Text Markup Language", correct: false },
      { text: "Home Tool Markup Language", correct: false }
    ]
  },
  {
    question: "What is the purpose of the 'git clone' command in Git?",
    answers: [
      { text: "To create a new branch", correct: false },
      { text: "To copy a repository to a new location", correct: true },
      { text: "To delete a branch", correct: false },
      { text: "To merge two branches", correct: false }
    ]
  },
  {
    question: "What does the acronym 'API' stand for?",
    answers: [
      { text: "Advanced Programming Interface", correct: false },
      { text: "Application Programming Interface", correct: true },
      { text: "Automated Program Interaction", correct: false },
      { text: "All-Purpose Integration", correct: false }
    ]
  },
  {
    question: "In which programming language is React.js primarily written?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true },
      { text: "Ruby", correct: false }
    ]
  },
  {
    question: "What is the purpose of the 'addEventListener' method in JavaScript?",
    answers: [
      { text: "To remove an event listener", correct: false },
      { text: "To add an event listener to an HTML element", correct: true },
      { text: "To create a new event", correct: false },
      { text: "To execute an event immediately", correct: false }
    ]
  },
  {
    question: "Which of the following is NOT a valid data type in JavaScript?",
    answers: [
      { text: "String", correct: false },
      { text: "Boolean", correct: false },
      { text: "Float", correct: true },
      { text: "Number", correct: false }
    ]
  },
  {
    question: "What is the purpose of the 'box-sizing' property in CSS?",
    answers: [
      { text: "To set the size of a text box", correct: false },
      { text: "To specify the type of box model to be used for an element", correct: true },
      { text: "To add a border to a box", correct: false },
      { text: "To define the padding of an element", correct: false }
    ]
  }
];


startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startContainerEl.classList.add("hide");
  questionContainerEl.classList.remove("hide");
  showQuestion(questions[currentQuestionIndex]);
  timerId = setInterval(updateTimer, 1000);
}

buttonZoneEl.addEventListener("click", function (event) {
  if (event.target.matches("button")) {
    var selectedAnswer = event.target;
    var correct = selectedAnswer.dataset.correct;

    if (correct === "true") {
      selectedAnswer.classList.add("correct");
    } else {
      selectedAnswer.classList.add("incorrect");
      timeLeft -= 10;
    }

    disableAnswerButtons();

    if (currentQuestionIndex === questions.length - 1 || timeLeft <= 0) {
      endQuiz();
    } else {
      setTimeout(nextQuestion, 1000);
    }
  }
});

function nextQuestion() {
  resetAnswerButtons();
  showQuestion(questions[++currentQuestionIndex]);
}

function showQuestion(question) {
  document.getElementById("question-text").textContent = question.question;

  buttonZoneEl.innerHTML = "";

  question.answers.forEach((answer) => {
    const answerButton = document.createElement("button");
    answerButton.textContent = answer.text;
    answerButton.dataset.correct = answer.correct;
    buttonZoneEl.appendChild(answerButton);
  });
}

function resetAnswerButtons() {
  const answerButtonList = buttonZoneEl.querySelectorAll("button");
  answerButtonList.forEach((button) => {
    button.classList.remove("correct", "incorrect");
    button.disabled = false;
  });
}

function disableAnswerButtons() {
  const answerButtonList = buttonZoneEl.querySelectorAll("button");
  answerButtonList.forEach((button) => {
    button.disabled = true;
  });
}

function updateTimer() {
  timeLeft--;
  timerEl.textContent = timeLeft;

  if (timeLeft <= 0) {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerId);
  questionContainerEl.classList.add("hide");
  endContainerEl.classList.remove("hide");
  document.getElementById("final-score").textContent = timeLeft;
}

document.getElementById("submit-button").addEventListener("click", saveScore);

function saveScore(event) {
  event.preventDefault();
  const initials = initialsInput.value;
  const score = timeLeft;
  
}




