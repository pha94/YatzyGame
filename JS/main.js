let terninger = [];
let selected = null;
let values = document.getElementsByTagName("input");

function rollAction() {
  if (selected != null) {
    endTurnAction();
    selected = null;
  }
  let audio = new Audio("sounds/Dice.mp3");
  audio.play();
  for (let i = 0; i < 5; i++) {
    if (!dices[i].classList.contains("hold")) {
      let roll = Math.floor(Math.random() * 6) + 1;
      terninger[i] = roll;
      let dices = document.getElementsByTagName("img");
      switch (roll) {
        case 1:
          dices[i].setAttribute("src", "images/1White.png");
          break;
        case 2:
          dices[i].setAttribute("src", "images/2White.png");
          break;
        case 3:
          dices[i].setAttribute("src", "images/3White.png");
          break;
        case 4:
          dices[i].setAttribute("src", "images/4White.png");
          break;
        case 5:
          dices[i].setAttribute("src", "images/5White.png");
          break;
        case 6:
          dices[i].setAttribute("src", "images/6White.png");
          break;
      }
    }
  }

  let turnNumber = document.getElementById("turn-number").innerHTML++;
  let button = document.querySelector("button");

  if (turnNumber == 2) {
    button.disabled = true;
  }
  update(terninger);
  diceRolling();
}

function diceRolling() {
  for (let i = 0; i < terninger.length; i++) {
    dices[i].style.transitionDuration = "1s";
    dices[i].style.transform += "rotate(" + 360 + "deg)";
  }
}

document.getElementById("button").addEventListener("click", rollAction);
let dices = document.getElementsByTagName("img");
for (let i = 0; i < dices.length; i++) {
  dices[i].addEventListener("click", function (e) {
    let turnNumber = document.getElementById("turn-number").innerHTML;
    if (turnNumber > 0) {
      e.target.classList.toggle("hold");
    }
  });
}

for (let i = 0; i < values.length; i++) {
  values[i].readOnly = true;
  values[i].addEventListener("click", function (e) {
    let turnNumber = document.getElementById("turn-number").innerHTML;
    if (turnNumber > 0) {
      if (!e.target.disabled) {
        if (selected != null) {
          selected.disabled = false;
        }
        e.target.disabled = true;
        selected = e.target;
        document.querySelector("button").disabled = false;
        sum();
        total();
      }
    }
    endgame();
  });
}

function endTurnAction() {
  document.getElementById("turn-number").innerHTML = 0;
  let dices = document.getElementsByTagName("img");
  for (let i = 0; i < dices.length; i++) {
    if (dices[i].classList.contains("hold")) {
      dices[i].classList.toggle("hold");
    }
  }
  for (let i = 0; i < values.length; i++) {
    if (values[i].disabled === false) {
      values[i].value = "";
    }
  }
  document.querySelector("button").disabled = false;
  sum();
  total();
}

function sum() {
  let sum = 0;
  for (let i = 0; i < 6; i++) {
    if (values[i].disabled === true) {
      sum += values[i].valueAsNumber;
    }
  }
  if (sum >= 63) {
    document.getElementsByTagName("input")[7].valueAsNumber = 50;
  }
  document.getElementsByTagName("input")[6].valueAsNumber = sum;
}

function total() {
  let total = 0;
  for (let i = 0; i < 18; i++) {
    if (values[i].disabled === true) {
      total += values[i].valueAsNumber;
    }
  }
  if (document.getElementsByTagName("input")[7].valueAsNumber === 50) {
    total += document.getElementsByTagName("input")[7].valueAsNumber;
  }
  document.getElementsByTagName("input")[17].valueAsNumber = total;
}

function endgame() {
  let counter = 0;
  for (let i = 0; i < values.length; i++) {
    if (values[i].disabled) {
      counter++;
    }
  }
  if (counter === 15) {
    setTimeout(function () {
      alert(
        "The game has now ended, your total score was: " +
          document.getElementsByTagName("input")[17].valueAsNumber
      );
      newGame();
    }, 2000);
  }
}

function newGame() {
  window.location.reload();
}

function holdPoints(number, total) {
  if (!document.getElementsByTagName("input")[number - 1].disabled) {
    document.getElementsByTagName("input")[number - 1].value = total;
  }
}
