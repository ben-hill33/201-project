'use strict';

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

var codeBlock = document.getElementById('codeBlock-img');

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
  displayRandomCodeBlock();
}

var userAnswerForm = document.getElementById('userAnswerForm');
userAnswerForm.addEventListener('submit', handleSubmitAnswer);

var resultMessage = document.getElementById('resultMessage');

function handleSubmitAnswer(event) {
  // when user hits enter
  // save answer into a variable answer
  // check if the answer is one of the correct answers
  // increment correct answers
  // display correct answer message
  // otherwise
  // display incorrect answer message

  // increment attempts
  event.preventDefault();
  var userAnswer = +event.target.userAnswer.value;
  var playerSessionArray = playersData[currentPLayerIndex].session;
  var currentSession = playerSessionArray[playerSessionArray.length - 1];
  console.log(currentCodeBlock.answer, userAnswer);
  if (currentCodeBlock.answer.includes(userAnswer)) {
    currentSession.correctAttempts++;
    resultMessage.innerHTML = 'Correct!!';
  } else {
    resultMessage.innerHTML = 'INCORRECT!!';
  }
  currentSession.attempts++;
  console.log('CurrentSession: ', currentSession);
}

var nextButton = document.getElementById('nextButton');

initializeGame();
