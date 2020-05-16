'use strict';

// Elements
var codeBlock = document.getElementById('codeBlock-img');
var userAnswerForm = document.getElementById('userAnswerForm');
var resultMessage = document.getElementById('resultMessage');
var enterButton = document.getElementById('enterButton');
var nextButton = document.getElementById('nextButton');
var timeBlock = document.getElementById('counter');

// Listeners
userAnswerForm.addEventListener('submit', handleSubmitAnswer);
nextButton.addEventListener('click', handleNextQuestionButton);

// Variables
var codeBlockWithAnswers = [];
var currentCodeBlock;
var gameTimer;

// Constructor Function for CodeBlockPair with Answers
function CodeBlockPair(codeBlockImg, answer) {
  this.codeBlockImg = codeBlockImg;
  this.answer = answer;
  codeBlockWithAnswers.push(this);
}

new CodeBlockPair('../codeBlock-images/Answer4.png', [4]);
new CodeBlockPair('../codeBlock-images/Answer8.png', [8, 18]);
new CodeBlockPair('../codeBlock-images/Answer12.png', [12, 13, 14]);
new CodeBlockPair('../codeBlock-images/Answer16.png', [16, 18, 19]);
new CodeBlockPair('../codeBlock-images/Answer21.png', [21]);

function randomizer(max) {
  return Math.floor(Math.random() * max);
}

// create a function to randomize array of codeblocks
function displayRandomCodeBlock() {
  var codeBlockIndex = randomizer(codeBlockWithAnswers.length);
  currentCodeBlock = codeBlockWithAnswers[codeBlockIndex];
  var image = currentCodeBlock.codeBlockImg;
  codeBlock.src = image;
}

function initializeGame() {
  loadLocalStorage();
  displayRandomCodeBlock();
  timer(60);
}

function handleSubmitAnswer(event) {
  event.preventDefault();
  var userAnswer = +event.target.userAnswer.value; //plus is the same as parseInt
  var playerSessionArray = playersData[currentPLayerIndex].session;
  var currentSession = playerSessionArray[playerSessionArray.length - 1];

  if (currentCodeBlock.answer.includes(userAnswer)) {
    currentSession.correctAttempts++;
    /// Increment Status Bar HERE
    resultMessage.textContent = 'Correct!!';
    resultMessage.style.color = 'green';
    timeBlock.style.visibility = 'hidden';
    enterButton.style.visibility = 'hidden';
    nextButton.style.visibility = 'visible';
    clearInterval(gameTimer);
  } else {
    resultMessage.textContent = 'INCORRECT!! Try Again';
    resultMessage.style.color = 'red';
  }
  currentSession.attempts++;
  playersData[currentPLayerIndex].session[playerSessionArray.length - 1] = currentSession;
  saveToLocalStorage();
  event.target.userAnswer.value = '';
}

function handleNextQuestionButton(event) {
  event.preventDefault();
  timeBlock.textContent = '';
  displayRandomCodeBlock();
  timer(60);
  timeBlock.style.visibility = 'visible';
  nextButton.style.visibility = 'hidden';
  enterButton.style.visibility = 'visible';
  resultMessage.textContent = '';
}

function timer(seconds) {
  var timeleft = seconds;
  clearInterval(gameTimer);
  gameTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(gameTimer);
      resultMessage.style.color = 'red';
      resultMessage.textContent = "Time's up!";
      enterButton.style.visibility = 'hidden';
      nextButton.style.visibility = 'visible';
    } else {
      timeBlock.textContent = timeleft + ' seconds remaining';
    }
    timeleft--;
  }, 1000);
}

initializeGame();
