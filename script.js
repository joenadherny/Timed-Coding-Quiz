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
    question: "Which of the following is a programming language?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: false },
      { text: "Python", correct: true },
      { text: "URL", correct: false }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Counter Strike: Source", correct: false },
      { text: "Corrective Style Sheet", correct: false },
      { text: "Computer Style Sheet", correct: false },
      { text: "Cascading Style Sheet", correct: true }
    ]
  },
  {
    question: "Which of the following is not a JavaScript framework or library?",
    answers: [
      { text: "React", correct: false },
      { text: "Angular", correct: false },
      { text: "JavaSpring", correct: true },
      { text: "Vue", correct: false }
    ]
  },
  {
    question: "What is the result of the expression: 2 + 2 * 2?",
    answers: [
      { text: "4", correct: false },
      { text: "6", correct: true },
      { text: "8", correct: false },
      { text: "10", correct: false }
    ]
  },
  {
    question: "Which of the following is used to declare a variable in JavaScript?",
    answers: [
      { text: "var", correct: true },
      { text: "let", correct: false },
      { text: "const", correct: false },
      { text: "both let and const", correct: false }
    ]
  },
  {
    question: "What is the purpose of the 'git clone' command?",
    answers: [
      { text: "To push changes to a remote repository", correct: false },
      { text: "To create a new branch", correct: false },
      { text: "To copy a repository from the internet to your computer", correct: true },
      { text: "To delete a repository", correct: false }
    ]
  },
  {
    question: "Which of the following is an example of a block-level element in HTML?",
    answers: [
      { text: "<span>", correct: false },
      { text: "<a>", correct: false },
      { text: "<div>", correct: true },
      { text: "<strong>", correct: false }
    ]
  },
  {
    question: "What does API stand for?",
    answers: [
      { text: "Application Programming Interface", correct: true },
      { text: "Automated Programming Integration", correct: false },
      { text: "Advanced Programming Interface", correct: false },
      { text: "Application Process Integration", correct: false }
    ]
  },
  {
    question: "Which of the following is not a valid data type in JavaScript?",
    answers: [
      { text: "string", correct: false },
      { text: "boolean", correct: false },
      { text: "numeric", correct: true },
      { text: "object", correct: false }
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
  // Save your score logic here...
}
// Function to save high score to local storage
function saveHighScore(initials, score) {
  // Retrieve existing high scores from local storage
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

  // Add the new high score
  highScores.push({ initials, score });

  // Sort high scores in descending order
  highScores.sort((a, b) => b.score - a.score);

  // Save the updated high scores to local storage
  localStorage.setItem('highScores', JSON.stringify(highScores));
}

// Function to display high scores on the page
function displayHighScores() {
  const highScoreList = document.getElementById('high-score-list');
  highScoreList.innerHTML = '';

  // Retrieve high scores from local storage
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

  // Display each high score in the list
  highScores.forEach((score, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${score.initials}: ${score.score}`;
    highScoreList.appendChild(listItem);
  });
}

// Call the function to display high scores when the page loads
displayHighScores();

