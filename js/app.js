'use strict';

// Elements
var form = document.getElementById('userForm');

// Event Listeners
form.addEventListener('submit', handleSubmitName);

// Variables
var playersData = [];
var currentPLayerIndex;
var currentPlayerName;

function saveToLocalStorage() {
  var savedPlayers = JSON.stringify(playersData);
  localStorage.setItem('PlayerData', savedPlayers);
  localStorage.setItem('currentPlayerIndex', `${currentPLayerIndex}`);
  localStorage.setItem('currentPlayerName', currentPlayerName);
}

function loadLocalStorage() {
  if (localStorage.getItem('PlayerData')) {
    currentPLayerIndex = +localStorage.getItem('currentPlayerIndex');
    currentPlayerName = localStorage.getItem('currentPlayerName');
    playersData = JSON.parse(localStorage.getItem('PlayerData'));
  }
}

// Declare New PLayer Object
function Player(name) {
  this.name = name.toLowerCase();
  this.session = [];
  playersData.push(this);
}

// Declare New Player Session
function Session() {
  this.day = new Date().toString();
  this.attempts = 0;
  this.correctAttempts = 0;
  playersData[currentPLayerIndex].session.push(this);
}

function checkIfUserHasPlayed(name) {
  var playerPresent = false;
  currentPLayerIndex = playersData.length;
  for (var i = 0; i < playersData.length; i++) {
    if (name === playersData[i].name) {
      playerPresent = true;
      currentPLayerIndex = i;
      break;
    }
  }
  return playerPresent;
}

function addPlayerToData(currentPlayerName) {
  if (checkIfUserHasPlayed(currentPlayerName)) {
    new Session();
  } else {
    new Player(currentPlayerName);
    new Session();
  }
}

function handleSubmitName(event) {
  event.preventDefault();
  currentPlayerName = event.target.name.value;
  currentPlayerName = currentPlayerName.toLowerCase();
  addPlayerToData(currentPlayerName);
  saveToLocalStorage();
  window.location.replace('html/game.html');
}

loadLocalStorage();
