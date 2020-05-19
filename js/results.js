'use strict';

// Elements
var pEl = document.getElementById('table');
var trEl = document.createElement('tr');

function addElementToPage(elementType, content, parentEl) {
  var newEl = document.createElement(elementType);
  newEl.textContent = content;
  parentEl.appendChild(newEl);
}

function createRowElement() {
  trEl = document.createElement('tr');
  pEl.appendChild(trEl);
}

function createHeading() {
  createRowElement();
  addElementToPage('th', 'Name', trEl);
  addElementToPage('th', 'Game Session Date', trEl);
  addElementToPage('th', 'Attempts', trEl);
  addElementToPage('th', 'Correct Answers', trEl);
  addElementToPage('th', 'Correct Answers Ratio', trEl);
}

function renderRows() {
  for (var i = 0; i < playersData.length; i++) {
    for (var j = playersData[i].session.length - 1; j >= 0; j--) {
      var attempts = playersData[i].session[j].attempts;
      var correctAttempts = playersData[i].session[j].correctAttempts;
      var ratio = correctAttempts / attempts * 100;
      var stringRatio = Math.round(ratio) + '%';
      createRowElement();
      addElementToPage('td', playersData[i].name, trEl);
      addElementToPage('td', playersData[i].session[j].day, trEl);
      addElementToPage('td', attempts, trEl);
      addElementToPage('td', correctAttempts, trEl);
      addElementToPage('td', stringRatio, trEl);
    }
  }
}

loadLocalStorage();
createHeading();
renderRows();


