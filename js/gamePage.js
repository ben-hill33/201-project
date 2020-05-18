'use strict';

// Elements
var codeBlock = document.getElementById('codeBlock-img');
var userAnswerForm = document.getElementById('userAnswerForm');
var resultMessage = document.getElementById('resultMessage');
var enterButton = document.getElementById('enterButton');
var nextButton = document.getElementById('nextButton');
var timeBlock = document.getElementById('counter');
var statusBar = document.getElementById('correct-bars');

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

// new CodeBlockPair('../codeBlock-images/q1-a7.png', [7]);
// new CodeBlockPair('../codeBlock-images/q2-a7.png', [7]);
// new CodeBlockPair('../codeBlock-images/q3-a14.png', [14]);
// new CodeBlockPair('../codeBlock-images/q4-a4.png', [4]);
// new CodeBlockPair('../codeBlock-images/q5-a8.png', [8]);
// new CodeBlockPair('../codeBlock-images/q6-a2.png', [2]);
// new CodeBlockPair('../codeBlock-images/q7-a4.png', [4]);
// new CodeBlockPair('../codeBlock-images/q8-a5.png', [5]);
// new CodeBlockPair('../codeBlock-images/q9-a10or11.png', [10], [11]);
// new CodeBlockPair('../codeBlock-images/q10-a1.png', [1]);
// new CodeBlockPair('../codeBlock-images/q11-a4.png', [4]);
// new CodeBlockPair('../codeBlock-images/q12-a3.png', [3]);
// new CodeBlockPair('../codeBlock-images/q13-a5.png', [5]);
// new CodeBlockPair('../codeBlock-images/q14-a2.png', [2]);
// new CodeBlockPair('../codeBlock-images/q15-a2.png', [2]);
// new CodeBlockPair('../codeBlock-images/q16-a3.png', [3]);
// new CodeBlockPair('../codeBlock-images/q17-a2.png', [2]);
// new CodeBlockPair('../codeBlock-images/q18-a8.png', [8]);
// new CodeBlockPair('../codeBlock-images/q19-a1.png', [1]);
// new CodeBlockPair('../codeBlock-images/q20-a6.png', [6]);
// new CodeBlockPair('../codeBlock-images/q21-a3.png', [3]);
// new CodeBlockPair('../codeBlock-images/q22-a1or10.png', [1], [10]);
// new CodeBlockPair('../codeBlock-images/q23-a7.png', [7]);
// new CodeBlockPair('../codeBlock-images/q24-a7.png', [7]);
// new CodeBlockPair('../codeBlock-images/q25-a5.png', [5]);
// new CodeBlockPair('../codeBlock-images/q26-a4.png', [4]);
// new CodeBlockPair('../codeBlock-images/q27-a1.png', [1]);
// new CodeBlockPair('../codeBlock-images/q28-a7.png', [7]);
// new CodeBlockPair('../codeBlock-images/q29-a5.png', [5]);
// new CodeBlockPair('../codeBlock-images/q30-a4.png', [4]);

new CodeBlockPair('../codeBlock-images/A1.png', [1]);
new CodeBlockPair('../codeBlock-images/A5.png', [5]);
new CodeBlockPair('../codeBlock-images/A10.png', [10]);
new CodeBlockPair('../codeBlock-images/A15.png', [15]);
new CodeBlockPair('../codeBlock-images/A20.png', [20]);
new CodeBlockPair('../codeBlock-images/A25.png', [25]);

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
    // Increment Status Bar HERE
    addElementToPage('li', '  ', statusBar);
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
      resultMessage.textContent = "Time's up";
      enterButton.style.visibility = 'hidden';
      nextButton.style.visibility = 'visible';
    } else {
      timeBlock.textContent = timeleft + ' seconds remaining';
    }
    timeleft--;
  }, 1000);
}

function addElementToPage(elementType, content, parentEl) {
  var newEl = document.createElement(elementType);
  newEl.textContent = content;
  parentEl.appendChild(newEl);
}

initializeGame();
