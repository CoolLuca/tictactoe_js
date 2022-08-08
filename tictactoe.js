function initBoard() {
  let window = document.getElementById("game-window");
  let board = document.createElement("div");
  board.id = "game-board";

  for (let r = 0; r < 3; r++) {
    let row = document.createElement("div");
    row.className = "board-row";

    for (let c = 0; c < 3; c++) {
      let box = document.createElement("div");
      box.className = "box noselect";
      row.appendChild(box);
    }

    board.appendChild(row);
  }
  window.appendChild(board);
}

initBoard();
//* get elements
let board = document.getElementById("game-board");
let boxes = document.getElementsByClassName("box");

playAgain();

board.addEventListener("mouseup", (event) => {
  if (determineWinner() == true) {
    return;
  }
  let loc = getLocation(event);

  //* if location is taken, return
  if (checkLocation(loc) == false) {
    // console.log("not allowed");
    return;
  }

  // console.log("allowed");

  let symbol = checkSymbol();
  boxes[row * 3 + col].classList.add(symbol);
  boxes[row * 3 + col].textContent = symbol;
  if (boardFull()) {
    // console.log("draw");
    gameEnd(null);
  }
  if (determineWinner(symbol)) {
    // console.log("win");
    gameEnd(symbol);
    return;
  } else {
    turn++;
    return;
  }
});

//* FUNCTIONS
function checkSymbol() {
  if (turn % 2 == 0) {
    symbol = "X";
    document.getElementById("icon").href = "O.png";
  } else if (turn % 2 != 0) {
    symbol = "O";
    document.getElementById("icon").href = "X.png";
  }
  return symbol;
}

function getLocation(event) {
  col = Math.floor((3 * (event.pageX - board.offsetLeft)) / board.clientWidth);
  row = Math.floor((3 * (event.pageY - board.offsetTop)) / board.clientHeight);
  // console.log(row, col);
  return [row, col];
}

function checkLocation(loc) {
  let row = loc[0];
  let col = loc[1];

  if (boxes[row * 3 + col].textContent == "") {
    return true;
  } else {
    return false;
  }
}

function determineWinner() {
  //* checking rows
  for (let i = 0; i < 3; i++) {
    if (
      boxes[i * 3 + 0].textContent == boxes[i * 3 + 1].textContent &&
      boxes[i * 3 + 0].textContent == boxes[i * 3 + 2].textContent &&
      boxes[i * 3 + 0].textContent != ""
    ) {
      return true;
    }
  }

  //* checking cols
  for (let i = 0; i < 3; i++) {
    if (
      boxes[0 * 3 + i].textContent == boxes[1 * 3 + i].textContent &&
      boxes[0 * 3 + i].textContent == boxes[2 * 3 + i].textContent &&
      boxes[0 * 3 + i].textContent != ""
    ) {
      return true;
    }
  }

  //* checking diagonal
  if (
    boxes[0].textContent == boxes[4].textContent &&
    boxes[0].textContent == boxes[8].textContent &&
    boxes[0].textContent != ""
  ) {
    return true;
  }

  if (
    boxes[2].textContent == boxes[4].textContent &&
    boxes[2].textContent == boxes[6].textContent &&
    boxes[2].textContent != ""
  ) {
    return true;
  }
  return false;
}

function boardFull() {
  for (let i = 0; i < 9; i++) {
    if (boxes[i].textContent == "") {
      return false;
    }
  }
  return true;
}

function playAgain() {
  let splash = document.getElementById("splash");
  splash.style.visibility = "hidden";
  clear();

  //* randomise icon and symbol
  const icons = ["X.png", "O.png"];
  let num = Math.floor(Math.random() * 2);
  document.getElementById("icon").href = icons[num];
  turn = num;
}

function gameEnd(symbol) {
  if (symbol == null) {
    phrase = "DRAW!";
  } else {
    phrase = `${symbol}'s WIN!`;
  }
  let splash = document.getElementById("splash");
  let winnerPhrase = document.getElementById("winner-phrase");
  winnerPhrase.textContent = phrase;
  splash.style.visibility = "visible";
}

function clear() {
  for (let i = 0; i < 9; i++) {
    boxes[i].textContent = "";
    if (boxes[i].classList.contains("X")) {
      boxes[i].classList.remove("X");
    } else if (boxes[i].classList.contains("O")) {
      boxes[i].classList.remove("O");
    }
  }
}
