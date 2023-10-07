var timerEl = document.querySelector("#timer");
var startContainerEl = document.querySelector("#start-container");
var questionContainerEl = document.querySelector("#question-container");
var endContainerEl = document.querySelector("#end-container");
var buttonZoneEl = document.querySelector("#button-zone");
var startButton = document.querySelector("#start-quiz");



const questions = [
    {
      question: "What symbol do you use to select an id? ",
      answers: [
        { text: ".", correct: false },
        { text: "%", correct: false },
        { text: "#", correct: true },
        { text: "@", correct: false }
      ]
    },
    {
      question: "What language is used primarily for styling?",
      answers: [
        { text: "CSS", correct: true },
        { text: "Java", correct: false },
        { text: "Node", correct: false },
        { text: "HTML", correct: false }
      ]
    },
    {
        question: "What commmand do you use to update your repo?",
        answers:[
            { text: " git pull", correct: true },
        { text: "git push", correct: false },
        { text: "git commit", correct: false },
        { text: "git status", correct: false } 
        ]
    },
    {
        question: "How do you check what branch you are on?",
        answers:[
            { text: " git status", correct: true },
        { text: "git push", correct: false },
        { text: "git commit", correct: false },
        { text: "git pull", correct: false } 
        ]
    }, ]
    
  





startButton.addEventListener("click", function () {
  startContainerEl.classList.add("hide");
  questionContainerEl.classList.remove("hide");
});

buttonZoneEl.addEventListener('click',function(event){
    if(event.target.matches('button')){
        var selectedAnswer=event.target;
        var correct=selectedAnswer.dataset.correct;
        if(correct=== "true"){
            selectedAnswer.classList.add("correct");
        }else{
            selectedAnswer.classList.add("incorrect");
            timeLeft -=10;
        }
    }
})


function endQuiz(){
clearInterval(timerEl);
questionContainerEl.classList.add("hide")



}
function saveScore(event){
    event.preventDefault();
    const intials= intialsInput.value;
    const score = timeLeft;
    intialsInput.value=''
}


startButton.addEventListener("click", startQuiz);


answerButtons.addEventListener("click", function(event) {
  if (event.target.matches("button")) {
    const selectedAnswer = event.target;
    const correct = selectedAnswer.dataset.correct;

    
    if (correct === "true") {
      selectedAnswer.classList.add("correct");
    } else {
      selectedAnswer.classList.add("incorrect");
      timeLeft -= 10; 
    }

    
    disableAnswerButtons();

    
    if (currentQuestionIndex === questions.length - 1) {
      endQuiz();
    } else {
      setTimeout(nextQuestion, 1000);
    }
  }
});



function nextQuestion() {
  resetAnswerButtons();
  showQuestion(questions[currentQuestionIndex]);
  currentQuestionIndex++;
}


function showQuestion(question) {
  questionText.textContent = question.question;
  question.answers.forEach((answer, index) => {
    const answerButton = answerButtons.children[index];
    answerButton.textContent = answer.text;
    answerButton.dataset.correct = answer.correct;
  });
}


function resetAnswerButtons() {
  const answerButtonList = answerButtons.querySelectorAll("button");
  answerButtonList.forEach(button => {
    button.classList.remove("correct", "incorrect");
    button.disabled = false;
  });
}


function disableAnswerButtons() {
  const answerButtonList = answerButtons.querySelectorAll("button");
  answerButtonList.forEach(button => {
    button.disabled = true;
  });
}


function updateTimer() {
  timeLeft--;
  timer.textContent = timeLeft;

  if (timeLeft === 0) {
    endQuiz();
  }
}


function endQuiz() {
  clearInterval(timerId);
  questionContainer.classList.add("hide");
  timerContainer.classList.add("hide");
  gameOverContainer.classList.remove("hide");
}


function saveScore(event) {
  event.preventDefault();
  const initials = initialsInput.value;
  const score = timeLeft;

  

  
  initialsInput.value = "";
}
