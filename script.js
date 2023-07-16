var timerEl = document.querySelector("#timer");
var startContainerEl = document.querySelector("#start-container");
var questionContainerEl = document.querySelector("#question-container");
var endContainerEl = document.querySelector("#end-container");
var buttonZoneEl = document.querySelector("#button-zone");
var startButton = document.querySelector("#start-quiz");

startButton.addEventListener("click", function () {
  startContainerEl.classList.add("hide");
  questionContainerEl.classList.remove("hide");
});

if (correct === "true") {
  selectedAnswer.classList.add("correct");
} else {
  selectedAnswer.classList.add("incorrect");
  timeLeft -= 10; // Subtract 10 seconds for incorrect answers
}
