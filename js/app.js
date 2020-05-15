'use strict';

////////// Main Page /////////////

// add event listener to click here to play button
// if user hits button
// check if user is already in database
// if they aren't present
// create new user
// if they are present
// create player session
// assign current player
// assign current session
// direct user to game page


var playersData = [];
var codeBlockWithAnswers = [];
var currentPLayerIndex;
var currentPlayerName;


function savePlayerLocalStorage() {
  var savedPlayers = JSON.stringify(playersData);
  localStorage.setItem('PlayerData', savedPlayers);
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

// Testing Player Constructor
new Player('Ben');
new Player('Davee');
new Player('Taylor');


// Constructor Function to Create New Session Object
function Session(day) {
  this.day = day;
  this.attempts = 0;
  this.correctAttempts = 0;
  playersData[currentPLayer].session.push(this);
}


function checkIfUserHasPlayed(name) {
  var playerPresent = false;
  for (var i = 0; i < playersData.length; i++) {
    if (name === playersData[i].name) {
      playerPresent = true;
      break;
    }
  }
  return playerPresent;
}


var userName = document.getElementById('userForm');
userName.addEventListener('submit', handleSubmitName);


function handleSubmitName(event) {
  event.preventDefault();
  currentPlayerName = event.target.name.value;
  currentPlayerName = currentPlayerName.toLowerCase();
  localStorage.setItem('playerName', currentPlayerName);
  var name = localStorage.getItem('playerName');

}





