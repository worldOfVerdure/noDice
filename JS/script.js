const maxDieValue = 6;

function dieRoll(player) {
  let randNum = Math.floor(Math.random() * maxDieValue + 1);

  if (player === 1) {
    let dieImgP1 = document.querySelector("#player1 > img");

    switch (randNum) {
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

  if (player === 2) {
    let dieImgP2 = document.querySelector("#player2 > img");

    switch (randNum) {
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
}