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
  addElementToPage('th', 'Date', trEl);
  addElementToPage('th', 'Attempts', trEl);
  addElementToPage('th', 'Correct Answers', trEl);
}

function renderRows() {
  for (var i = 0; i < playersData.length; i++) {
    for (var j = playersData[i].session.length - 1; j >= 0; j--) {
      createRowElement();
      addElementToPage('td', playersData[i].name, trEl);
      addElementToPage('td', playersData[i].session[j].day, trEl);
      addElementToPage('td', playersData[i].session[j].attempts, trEl);
      addElementToPage('td', playersData[i].session[j].correctAttempts, trEl);
    }
  }
}


loadLocalStorage();
createHeading();
renderRows();
