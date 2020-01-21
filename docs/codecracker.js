/*var grid = [
  [1, 0, 2, 0, 2, 0, 0, 0, 2, 0, 3, 0, 2],
  [4, 5, 6, 7, 8, 6, 0, 9, 10, 4, 11, 2, 9],
  [7, 0, 12, 0, 12, 0, 2, 0, 5, 0, 12, 0, 11],
  [1, 7, 13, 5, 14, 0, 15, 16, 12, 2, 2, 5, 14],
  [2, 0, 5, 0, 14, 0, 12, 0, 4, 0, 10, 0, 5],
  [0, 0, 0, 2, 16, 12, 17, 2, 0, 18, 5, 4, 6],
  [16, 0, 1, 0, 5, 0, 17, 0, 2, 0, 14, 0, 9],
  [7, 1, 11, 2, 0, 1, 12, 4, 9, 2, 0, 0, 0],
  [19, 0, 20, 0, 2, 0, 4, 0, 12, 0, 21, 0, 18],
  [5, 22, 1, 7, 11, 6, 14, 0, 20, 12, 23, 7, 4],
  [6, 0, 13, 0, 12, 0, 2, 0, 20, 0, 1, 0, 12],
  [21, 4, 24, 5, 25, 5, 0, 26, 5, 9, 2, 12, 20],
  [5, 0, 6, 0, 5, 0, 0, 0, 4, 0, 23, 0, 5],
];*/

// 90
var grid = [
  [1, 0, 2, 0, 3, 0, 0, 0, 4, 0, 3, 0, 4],
  [5, 6, 3, 7, 7, 8, 0, 9, 10, 11, 12, 13, 14],
  [5, 0, 4, 0, 1, 0, 4, 0, 4, 0, 15, 0, 3],
  [13, 1, 16, 11, 17, 18, 13, 0, 19, 14, 18, 12, 20],
  [10, 0, 18, 0, 11, 0, 3, 0, 3, 0, 6, 0, 11],
  [19, 3, 12, 20, 0, 3, 5, 5, 18, 21, 0, 0, 0],
  [4, 0, 11, 0, 1, 0, 5, 0, 12, 0, 17, 0, 3],
  [0, 0, 0, 4, 22, 1, 1, 6, 0, 23, 18, 12, 13],
  [5, 0, 11, 0, 22, 0, 6, 0, 4, 0, 3, 0, 18],
  [6, 1, 4, 11, 24, 0, 17, 3, 25, 17, 6, 11, 17],
  [3, 0, 4, 0, 11, 0, 4, 0, 18, 0, 6, 0, 18],
  [26, 6, 3, 4, 4, 8, 0, 3, 5, 5, 11, 13, 19],
  [4, 0, 8, 0, 4, 0, 0, 0, 19, 0, 17, 0, 8],
]; 

var selected = 0;
var used = 0;

var let2num = [];
let2num.length = 27;
var num2let = [];
num2let.length = 27;

function renderGrid(grid) {
  var table = document.createElement('table');
  for (var r = 0; r < grid.length; r++) {
    table.appendChild(renderRow(grid[r]));
  }
  return table;
}

function renderRow(row) {
  var tr = document.createElement('tr');
  for (var c = 0; c < row.length; c++) {
    tr.appendChild(renderCell(row[c]));
  }
  return tr;
}

function renderCell(cell) {
  if (cell == 0) {
    return renderBlackCell();
  }
  var td = document.createElement('td');
  td.className = cname(cell);
  td.appendChild(renderNumber(cell));
  td.appendChild(renderLetter(' '));
  td.onclick = function(event) {
    event.stopPropagation();
    handleClick(cell);
  }
  return td;
}

function renderHud() {
  var table = document.createElement('table');
  table.className = 'hud';
  table.appendChild(renderHudRow('A', 'M'));
  table.appendChild(renderHudRow('N', 'Z'));
  return table;
}

function letterCode(letter) {
  if (letter == ' ') return 0;
  return letter.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
}

function renderHudRow(start, stop) {
  var start = start.charCodeAt(0);
  var stop = stop.charCodeAt(0);
  var tr = document.createElement('tr');
  for (var c = start; c <= stop; c++) {
    tr.appendChild(renderHudCell(String.fromCharCode(c)));
  }
  return tr;
}

function renderHudCell(letter) {
  var td = document.createElement('td');
  td.appendChild(renderNumber(' '));
  td.appendChild(renderLetter(letter));
  td.id = cname(letter);
  return td;
}

function cname(number) {
  return 'cell-' + number;
}

function renderLetter(letter) {
  var span = document.createElement('span');
  span.className = 'letter';
  var text = document.createTextNode(letter);
  span.appendChild(text);
  return span;
} 

function renderNumber(number) {
  var span = document.createElement('span');
  span.className = 'number';
  var text = document.createTextNode(number);
  span.appendChild(text);
  return span;
} 

function renderBlackCell() {
  var td = document.createElement('td');
  td.className = 'black';
  return td;
}

function handleClick(number) {
  if (number == selected) return;
  if (selected) {
    deselect(selected);
  }
  if (number) {
    select(number);
  }
  return true;
}

function select(number) {
  var cells = document.getElementsByClassName(cname(number));
  for (var i = 0; i < cells.length; i++) {
    cells[i].classList.add('selected');
  }
  selected = number;
}

function deselect(number) {
  var cells = document.getElementsByClassName(cname(number));
  for (var i = 0; i < cells.length; i++) {
    cells[i].classList.remove('selected');
  }
  selected = 0;
}

function handleKey(event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  if (!selected) return;

  var key = event.key.toUpperCase();
  if (/^[A-Z]$/.test(key)) {
    setNumberToLetter(selected, key, event.shiftKey);
  } else if (key == 'BACKSPACE' || key == 'DELETE' || key == ' ') {
    setNumberToLetter(selected, ' ');
  }
  event.preventDefault();
}

function setNumberToLetter(number, letter, steal) {
  var index = letterCode(letter);
  if (num2let[number] == letter) return;
  if (index && let2num[index]) {
    flashRed(let2num[index]);
    if (!steal) return;
    setNumberToLetter(let2num[index], ' ');
  }
  if (num2let[number] && num2let[number] != ' ') {
    let2num[letterCode(num2let[number])] = 0;
    var cell = document.getElementById(cname(num2let[number]));
    cell.children[0].textContent = ' ';
    cell.classList.remove('used');
    used -= 1;
  }
    
  num2let[number] = letter;
  if (index) {
    let2num[index] = number;
  }

  var cells = document.getElementsByClassName(cname(number));
  for (var i = 0; i < cells.length; i++) {
    cells[i].children[1].textContent = letter;
  }
  if (index) {
    var cell = document.getElementById(cname(letter));
    cell.children[0].textContent = number;
    cell.classList.add('used');
    used += 1;
  }

  if (used == 26) {
    animateVictory();
  }
}

function animateVictory() {
  var cells = document.getElementsByTagName('td');
  for (var i = 0; i < cells.length; i++) {
    if (cells[i].classList.contains('black')) continue;
    cells[i].classList.add('yay');
    cells[i].style.animationDelay = Math.random() + 's';
  }
}

function flashRed(number) {
  var cells = document.getElementsByClassName(cname(number));
  for (var i = 0; i < cells.length; i++) {
    var cl = cells[i].classList;
    if (cl.contains('uhoh')) {
      cl.remove('uhoh');
      cl.add('ohno');
    } else {
      cl.remove('ohno');
      cl.add('uhoh');
    }
  }
}

function init() {
  document.body.appendChild(renderGrid(grid));
  document.body.appendChild(document.createElement('br'));
  document.body.appendChild(renderHud());
  document.body.onclick = function(event) {
    event.stopPropagation();
    handleClick(0);
  }
  window.addEventListener("keydown", handleKey);
  setNumberToLetter(22, 'P');
  setNumberToLetter(24, 'R');
}
