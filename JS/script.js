const MAX_DIE_VALUE = 6;
const MAX_SCORE = 21;

class Player {
  constructor(id, turnStatus) {
    this.id = id;
    this.holdStatus = false;
    this.turnStatus = turnStatus;
    this.score = 0;
    this.wins = 0;
  }

  get getID() {
    return this.id;
  }

  set setID(id) {
    this.id = id;
  }

  get getHoldStatus() {
    return this.holdStatus;
  }

  set setHoldStatus(status) {
    this.holdStatus = !status;
  }

  get getTurnStatus() {
    return this.turnStatus;
  }

  set setTurnStatus(status) {
    this.turnStatus = !status;
  }

  get getScore() {
    return this.score;
  }
  
  set setScore(roll) {
    this.score += roll;
  }

  get getWins() {
    return this.wins;
  }

  set setWins(winStatus) {
    if(winStatus)
      this.wins += 1;
    else
      this.wins += 0;
  }
}

const player1 = new Player(1, true);
const player2 = new Player(2, false);

function resolvePlayerRoll(player, randNum) {
  player.setScore(randNum);

  if (player.getScore() > MAX_SCORE) {
    player.setHoldStatus(player.getholdStatus());
    if (player.getID() === 1)
      disableBtns(btnRollP1, btnHoldP1);
    else
      disableBtns(btnRollP2, btnHoldP2);
  }
}

// function resolveMatch() {

// }

const btnRollP1 = document.getElementById("btnRollP1");
const btnHoldP1 = document.getElementById("btnHoldP1");
const btnRollP2 = document.getElementById("btnRollP2");
const btnHoldP2 = document.getElementById("btnHoldP2");
const dieImgP1 = document.querySelector("#player1 > img");
const dieImgP2 = document.querySelector("#player2 > img");
const player1View = document.getElementById("player1");
const player2View = document.getElementById("player2");

btnRollP1.addEventListener("click", () => {
  dieRoll(player1);
});

btnHoldP1.addEventListener("click", () => {
  holdPlayerTurns(player1, btnRollP1, btnHoldP1);
});

btnRollP2.addEventListener("click", () => {
  dieRoll(player2);
});

btnRollP2.setAttribute("disabled", "");

btnHoldP2.addEventListener("click", () => {
  holdPlayerTurns(player2, btnRollP2, btnHoldP2);
});
// Start the cycle
btnHoldP2.setAttribute("disabled", "");
player1View.classList.add("playerOutline");

function dieRoll(player) {
  const RAND_NUM = Math.floor(Math.random() * MAX_DIE_VALUE + 1);

  if (player.getID() === 1) {
    resolvePlayerRoll(player1, RAND_NUM);

    switch (RAND_NUM) {
      case 1:
        dieImgP1.src = "images/oneDieP1.svg";
        dieImgP1.alt = "Player 1 die with value of 1";
        break;
      case 2:
        dieImgP1.src = "images/twoDieP1.svg";
        dieImgP1.alt = "Player 1 die with value of 2";
        break;
      case 3:
        dieImgP1.src = "images/threeDieP1.svg";
        dieImgP1.alt = "Player 1 die with value of 3";
        break;
      case 4:
        dieImgP1.src = "images/fourDieP1.svg";
        dieImgP1.alt = "Player 1 die with value of 4";
        break;
      case 5:
        dieImgP1.src = "images/fiveDieP1.svg";
        dieImgP1.alt = "Player 1 die with value of 5";
        break;
      case 6:
        dieImgP1.src = "images/sixDieP1.svg";
        dieImgP1.alt = "Player 1 die with value of 6";
        break;
      default:
        dieImgP1.src = "images/emptyDie.svg";
        dieImgP1.alt = "A blank die for player 1"; 
    }
  }
  else if (player.getID() === 2) {
    resolvePlayerRoll(player2, RAND_NUM);

    switch (RAND_NUM) {
      case 1:
        dieImgP2.src = "images/oneDieP2.svg";
        dieImgP2.alt = "Player 2 die with value of 1";
        break;
      case 2:
        dieImgP2.src = "images/twoDieP2.svg";
        dieImgP2.alt = "Player 2 die with value of 2";
        break;
      case 3:
        dieImgP2.src = "images/threeDieP2.svg";
        dieImgP2.alt = "Player 2 die with value of 3";
        break;
      case 4:
        dieImgP2.src = "images/fourDieP2.svg";
        dieImgP2.alt = "Player 2 die with value of 4";
        break;
      case 5:
        dieImgP2.src = "images/fiveDieP2.svg";
        dieImgP2.alt = "Player 2 die with value of 5";
        break;
      case 6:
        dieImgP2.src = "images/sixDieP2.svg";
        dieImgP2.alt = "Player 2 die with value of 6";
        break;
      default:
        dieImgP2.src = "images/emptyDie.svg";
        dieImgP2.alt = "A blank die for player 2"; 
    }
  }
  else {
    alert("Game has broken. Please fix the ride.");
  }

  // if (!player1.getholdStatus() && !player2.getholdStatus())
  //   resolveMatch();

  // if (player1.getHoldStatus() && player2.getHoldStatus())
  //   switchTurns();
}

function holdPlayerTurns(player, rollBtn, holdBtn) {
  // Hold player's future turns and disable their buttons
  player.setHoldStatus(player.getHoldStatus());

  rollBtn.toggleAttribute("disabled");
  holdBtn.toggleAttribute("disabled");
}

function switchTurns() {
  if (player1.getTurnStatus() && player1.getHoldStatus())
    // do stuff
  if (player2.getTurnStatus() && player2.getHoldStatus())
    // do stuff
  player1.setTurnStatus(player1.getTurnStatus());
  player2.setTurnStatus(player2.getTurnStatus());
  toggleBtns();
  toggleOutline();
}

function toggleBtns() {
  btnRollP1.toggleAttribute("disabled");
  btnHoldP1.toggleAttribute("disabled");
  btnRollP2.toggleAttribute("disabled");
  btnHoldP2.toggleAttribute("disabled");
}

function toggleOutline() {
  player1View.classList.toggle("playerOutline");
  player2View.classList.toggle("playerOutline");
}

// function resetGame() {

// }

// Scenario where one player holds, the other continues
