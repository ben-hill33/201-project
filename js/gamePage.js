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
new CodeBlockPair('../codeBlock-images/Answer12.png', [12]);
new CodeBlockPair('../codeBlock-images/Answer16.png', [16]);
new CodeBlockPair('../codeBlock-images/Answer21.png', [21]);

var codeBlock = document.getElementById('codeBlock-img');

function randomizer(max) {
  return Math.floor(Math.random() * max);
}

// create a function to randomize array of codeblocks
function displayRandomCodeBlock(array) {
  var codeBlockIndex = randomizer(array.length);
  currentCodeBlock = codeBlockWithAnswers[codeBlockIndex];
  var image = currentCodeBlock.codeBlockImg;
  codeBlock.src = image;
}

displayRandomCodeBlock(codeBlockWithAnswers);
