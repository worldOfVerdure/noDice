let playerStartFlag = true;
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

/*
TODO: Introduce start game function to switch player order
! Don't create a new object, simply switch turn status and reset scores
*/

const player1 = new Player(1, true);
const player2 = new Player(2, false);

function resolvePlayerRoll(player, randNum) {
  player.setScore = randNum;

  if (player.getID === 1) {
    player1Score.innerText = player.getScore;

    if (player.getScore === MAX_SCORE) {
      holdPlayerTurns(player);

      if (player2.getHoldStatus)
        resolveMatch();
    }
  }

  else {
    player2Score.innerText = player.getScore;

    if (player.getScore === MAX_SCORE) {
      holdPlayerTurns(player);

      if (player1.getHoldStatus)
        resolveMatch();
    }
  }

  if (player.getScore > MAX_SCORE)
    resolveMatch();
  }

function resolveMatch() {
  if (player1.getScore === player2.getScore)
    matchConcludeComponent(3);
  else if ((player1.getScore > MAX_SCORE) || (player2.getScore > player1.getScore))
    matchConcludeComponent(2);
  else if ((player2.getScore > MAX_SCORE) || (player1.getScore > player2.getScore))
    matchConcludeComponent(1);

  playerStartFlag = !playerStartFlag;
}

function matchConcludeComponent(victor) {
  if (victor === 1) {
    winner.innerText = "Player 1";
    winner.classList.add("victorColor1");
    winningMessage.innerText = " is the victor!";
    winnerFlag.setAttribute("src", "../images/flagP1.svg");
    winnerFlag.setAttribute("alt", "Player 1 flag.");
  }
  else if (victor === 2) {
    winner.innerText = "Player 2";
    winner.classList.add("victorColor2");
    winningMessage.innerText = " is the victor!";
    winnerFlag.setAttribute("src", "../images/flagP2.svg");
    winnerFlag.setAttribute("alt", "Player 2 flag.");
  }

  else {
    winner.innerText = "";
    winningMessage.innerText = "It's a tie!";
  }
  matchConcludeMenu.style.display = "flex";
}

function holdPlayerTurns(player) {
  player.setHoldStatus = player.getHoldStatus;
  player.setTurnStatus = player.getTurnStatus;

  if (player.getID === 1) {
    toggleBtns(btnRollP1, btnHoldP1);
    toggleOutline(player1);
  }
  else {
    toggleBtns(btnRollP2, btnHoldP2);
    toggleOutline(player2);
  }

  switchTurns();
}

function switchTurnsNoHold () {
  toggleBtns(btnRollP1, btnHoldP1);
  toggleOutline(player1);
  toggleBtns(btnRollP2, btnHoldP2);
  toggleOutline(player2);
}

function switchTurnsOnePlayerHold(player) {
  if (player.getID === 1) {
    toggleBtns(btnRollP1, btnHoldP1);
    toggleOutline(player1);
    player1.setTurnStatus = player1.getTurnStatus;
  }
  else {
    toggleBtns(btnRollP2, btnHoldP2);
    toggleOutline(player2);
    player2.setTurnStatus = player2.getTurnStatus;
  }
}

function switchTurns() {
  if (player1.getHoldStatus && player2.getHoldStatus)
    resolveMatch();

  else if (player1.getHoldStatus) {
    if (!player2.getTurnStatus)
      switchTurnsOnePlayerHold(player2);
  }
    
  else if (player2.getHoldStatus) {
    if (!player1.getTurnStatus)
      switchTurnsOnePlayerHold(player1);
  }

  else {
    switchTurnsNoHold();
  }
}

function toggleBtns(rollBtn, holdBtn) {
  rollBtn.toggleAttribute("disabled");
  holdBtn.toggleAttribute("disabled");
}

function toggleOutline(player) {
  if (player.getID === 1)
    player1View.classList.toggle("playerOutline");

  else
    player2View.classList.toggle("playerOutline");
}

const againBtn = document.getElementById("againBtn");
const btnHoldP1 = document.getElementById("btnHoldP1");
const btnHoldP2 = document.getElementById("btnHoldP2");
const btnRollP1 = document.getElementById("btnRollP1");
const btnRollP2 = document.getElementById("btnRollP2");
const dieImgP1 = document.querySelector("#player1 > img");
const dieImgP2 = document.querySelector("#player2 > img");
const matchConcludeMenu = document.getElementById("matchConcludeMenu");
const player1Score = document.getElementById("player1Score");
const player2Score = document.getElementById("player2Score");
const player1View = document.getElementById("player1");
const player2View = document.getElementById("player2");
const winner = document.getElementById("winner");
const winnerFlag = document.getElementById("winningFlag");
const winningMessage = document.getElementById("winningMessage");

againBtn.addEventListener("click", () => {
  startRound(playerStartFlag);
});

btnRollP1.addEventListener("click", () => {
  resolveDieRoll(player1);
});

btnHoldP1.addEventListener("click", () => {
  // Last parameter ensures we don't call switchTurns twice in case when 21 is encountered
  holdPlayerTurns(player1, btnRollP1, btnHoldP1, true);
});

btnRollP2.addEventListener("click", () => {
  resolveDieRoll(player2);
});

btnRollP2.setAttribute("disabled", "");

btnHoldP2.addEventListener("click", () => {
  holdPlayerTurns(player2, btnRollP2, btnHoldP2, true);
});
// !Start the cycle (for now). Add start of cycle in starter function
btnHoldP2.setAttribute("disabled", "");
player1View.classList.add("playerOutline");

function resolveDieRoll(player) {
  const RAND_NUM = Math.floor(Math.random() * MAX_DIE_VALUE + 1);

  if (player.getID === 1) {
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
  else if (player.getID === 2) {
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

  switchTurns();
}

function startRound(flag) {
  matchConcludeMenu.style.display = "none";
  resetScores();
  // Player 1 starts next round
  if (flag) {
    if (!player1.getTurnStatus)
      player1.setTurnStatus = player1.getTurnStatus;
    if (player1.getHoldStatus)
      player1.setHoldStatus = player1.getHoldStatus;
    if (player2.getTurnStatus)
      player2.setTurnStatus = player2.getTurnStatus;
    if (!player2.getHoldStatus)
      player2.setHoldStatus = player2.getHoldStatus;

    if (btnRollP1.hasAttribute("disabled") && btnHoldP1.hasAttribute("disabled"))
      toggleBtns(btnRollP1, btnHoldP1);
    if (!(btnRollP2.hasAttribute("disabled") && btnHoldP2.hasAttribute("disabled")))
      toggleBtns(btnRollP1, btnHoldP1);
  }
  // Player 2 starts next round
  else {
    if (player1.getTurnStatus)
      player1.setTurnStatus = player1.getTurnStatus;
    if (!player1.getHoldStatus)
      player1.setHoldStatus = player1.getHoldStatus;
    if (!player2.getTurnStatus)
      player2.setTurnStatus = player2.getTurnStatus;
    if (player2.getHoldStatus)
      player2.setHoldStatus = player2.getHoldStatus;

    if (!(btnRollP1.hasAttribute("disabled") && btnHoldP1.hasAttribute("disabled")))
      toggleBtns(btnRollP1, btnHoldP1);
    if (btnRollP2.hasAttribute("disabled") && btnHoldP2.hasAttribute("disabled"))
      toggleBtns(btnRollP1, btnHoldP1);
  }
}

function resetScores () {
  player1.setScore = -1 * player1.getScore;
  player2.setScore = -1 * player2.getScore;

  player1Score.innerText = player1.getScore;
  player2Score.innerText = player2.getScore;
}
