'use strict';

////////// Main Page /////////////


var playersData = [];
var codeBlockWithAnswers = [];
var currentPLayerIndex;
var currentPlayerName;


function saveToLocalStorage() {
  var savedPlayers = JSON.stringify(playersData);
  localStorage.setItem('PlayerData', savedPlayers);
  localStorage.setItem('currentPlayer', currentPLayerIndex);
  localStorage.setItem('currentPlayerName', currentPlayerName);
}


// Constructor Function for CodeBlockPair with Answers
function CodeBlockPair(codeBlockImg, answer) {
  this.codeBlockImg = codeBlockImg;
  this.answer = answer;
  codeBlockWithAnswers.push(this);
}


new CodeBlockPair('./codeBlock-images/Answer4.png', [4]);
new CodeBlockPair('./codeBlock-images/Answer8.png', [8]);
new CodeBlockPair('./codeBlock-images/Answer12.png', [12]);
new CodeBlockPair('./codeBlock-images/Answer16.png', [16]);
new CodeBlockPair('./codeBlock-images/Answer21.png', [21]);


// Constructor Function to Create New Player Object
function Player(name) {
  this.name = name.toLowerCase();
  this.session = [];
  playersData.push(this);
}


// Constructor Function to Create New Session Object
function Session(day) {
  this.day = new Date();
  this.attempts = 0;
  this.correctAttempts = 0;
  playersData[currentPLayerIndex].session.push(this);
}


function checkIfUserHasPlayed(name) {
  var playerPresent = false;
  for (var i = 0; i < playersData.length; i++) {
    if (name === playersData[i].name) {
      playerPresent = true;
      currentPLayerIndex = i;
      break;
    }
  }
  return playerPresent;
}


function addPlayerToData (currentPlayerName){
  if (checkIfUserHasPlayed(currentPlayerName)) {
    new Session();
  } else {
    new Player(currentPlayerName);
  }
}



// Add Event Listener to Name Submission on Main Page
var form = document.getElementById('userForm');
form.addEventListener('submit', handleSubmitName);

function handleSubmitName(event) {
  event.preventDefault();
  currentPlayerName = event.target.name.value;
  currentPlayerName = currentPlayerName.toLowerCase();
  addPlayerToData(currentPlayerName);
  saveToLocalStorage();
  console.log(localStorage);
}






