'use strict';

// Elements
var codeBlock = document.getElementById('codeBlock-img');
var userAnswerForm = document.getElementById('userAnswerForm');
var resultMessage = document.getElementById('resultMessage');
var enterButton = document.getElementById('enterButton');
var nextButton = document.getElementById('nextButton');

// Listeners
userAnswerForm.addEventListener('submit', handleSubmitAnswer);
nextButton.addEventListener('click', handleNextQuestion);

var codeBlockWithAnswers = [];
var currentCodeBlock;

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
}

function handleSubmitAnswer(event) {
  event.preventDefault();
  var userAnswer = +event.target.userAnswer.value;
  var playerSessionArray = playersData[currentPLayerIndex].session;
  var currentSession = playerSessionArray[playerSessionArray.length - 1];

  if (currentCodeBlock.answer.includes(userAnswer)) {
    currentSession.correctAttempts++;

    resultMessage.innerHTML = 'Correct!!';
    resultMessage.style.color = 'green';
  } else {
    resultMessage.innerHTML = 'INCORRECT!!';
    resultMessage.style.color = 'red';
  }
  currentSession.attempts++;
  playersData[currentPLayerIndex].session[playerSessionArray.length - 1] = currentSession;
  enterButton.style.visibility = 'hidden';
  nextButton.style.visibility = 'visible';
  saveToLocalStorage();
}

function handleNextQuestion(event) {}

initializeGame();
