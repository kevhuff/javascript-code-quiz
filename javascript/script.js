const username = prompt("What is your name?");
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
let shuffledQuestions, currentQuestionIndex;


// adds timer
let timeLeft = 120;
let timerId;
let score = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
  startTimer();
}

function startTimer() {
  timerId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timer.innerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  if (timeLeft === 0) {
    clearInterval(timerId);
    endGame();
  }
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    // add 1 to score
    score++;
    // display score
    document.getElementById("score").innerHTML = score;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      clearInterval(timerId);
      startButton.innerText = 'Restart';
      startButton.classList.remove('hide');
    }
  } else {
    timeLeft -= 10;
    setStatusClass(selectedButton, correct);
  }
}


function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

//javascript questions

const questions = [
  {
    question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
    answers: [
      { text: '<script href="xxx.js">', correct: false },
      { text: '<script name="xxx.js">', correct: false },
      { text: '<script src="xxx.js">', correct: true },
      { text: '<script value="xxx.js">', correct: false }
    ]
  },
  {
    question: 'How do you write "Hello World" in an alert box?',
    answers: [
      { text: 'alert("Hello World");', correct: true },
      { text: 'msg("Hello World");', correct: false },
      { text: 'msgBox("Hello World");', correct: false },
      { text: 'alertBox("Hello World");', correct: false }
    ]
  },
  {
    question: 'How do you start a for loop?',
    answers: [
      { text: 'for (i = 0; i <= 5; i++)', correct: true },
      { text: 'for (i = 0; i <= 5)', correct: false },
      { text: 'for (i <= 5; i++)', correct: false },
      { text: 'for i = 1 to 5', correct: false }
    ]
  },
  {
    question: 'How do you call a function named "myFunction"?',
    answers: [
      { text: 'call myFunction()', correct: false },
      { text: 'myFunction()', correct: true },
      { text: 'call function myFunction()', correct: false },
      { text: 'function myFunction()', correct: false }
    ]
  }
]

    

    