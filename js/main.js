var canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
var timer = document.getElementById("timerSec");
var timerText = document.getElementById("timerText");
var startButton = document.querySelector(".start-button");
var playerButton = document.getElementById("player-btn");
var stopButton = document.getElementById("stop-button");
playField = document.getElementById("playfield")
var gameOver = document.getElementById("game-over");
canvas.setAttribute("width", "1200");
canvas.setAttribute("height", "800");
var width = canvas.width;
var canvasHeight = canvas.height;
var obstacles = [];
var scrollAmount = 0;
var secondsUntilNewLevel = 6;
var gameStop = true;
var brickHeight = 30;
var seconds = 0;
var minutes = 0;
var milSec = 0;
var currentSecond = 0;
var currenCountdownSecond = 0;
var currentInterval = 0;
var level = 1;
var intervalID;
var countDown = secondsUntilNewLevel;
var isNewLevel = false;
var score = 0;
var speedGlobal = 0.75

var p1 = new Player(ctx);
gameStop = true;

function resetEverything() {
  ctx.clearRect(0, 0, width, canvasHeight);
  p1.reset();
  obstacles = [];
  scrollAmount = 0;
  secondsUntilNewLevel = 6;
  brickHeight = 30;
  gameStop = true;
  seconds = 0;
  minutes = 0;
  milSec = 0;
  currentSecond = 0;
  currenCountdownSecond = 0;
  currentInterval = 0;
  level = 1;
  score = 0;
  isNewLevel = false;
  countDown = secondsUntilNewLevel;
speedGlobal = 0.75

}


startButton.onclick = function() {
  if (!gameStop) {
    resetEverything();
    gameStop = true;
  }

  if (gameStop) {
    startGame();
    gameStop = false;
  }
};

stopButton.onclick = function() {
  window.location.reload(true);
};


document.onkeydown = event => {
  event.preventDefault();
  switch (event.key) {
    case "ArrowRight":
      p1.movement = "right";
      break;
    case "ArrowLeft":
      p1.movement = "left";
      break;
  }
};

document.onkeyup = event => {
  event.preventDefault();
  switch (event.key) {
    case "ArrowRight":
    case "ArrowLeft":
      p1.movement = null;
      break;
  }
};

function gameIsOver () {
  clearInterval(intervalID);
  gameStop = false;
  startButton.style.display = "block";
  gameOver.append(startButton)
  gameOver.style.display = "flex"
  playField.style.display = "none"
  document.querySelector(".score-text").innerText = "Your distance was " + parseInt(score / 10) + " m"
  p1.stop = false;
}


function startGame() {
  playField.style.display = "flex"
  stopButton.style.display = "block";
  startButton.style.display = "none";
  timer.style.display = "block";
  timerText.style.display = "block";
  playField.style.flexDirection = "row";
  document.getElementById("heading").style.display = "none";
  document.getElementById("playfield").append(canvas);
  document.getElementById("img-controls").style.display = "none";

  //default first 3 lines of bricks
  scrollAmount = 300;
  obstacleCreation(canvasHeight / 2);
  scrollAmount = 300;
  obstacleCreation((canvasHeight / 4) * 3);
  scrollAmount = 300;
  obstacleCreation((canvasHeight / 4) * 3 + 200);

  intervalID = setInterval(() => {
    update();
    drawEverything();

    if (p1.stop) {
      gameIsOver();
    }

    var dateInterval = new Date();

    // Changing color of Button
    if (countDown === 0) timerText.style.backgroundColor = "#E4847F";
    if (countDown === secondsUntilNewLevel) timerText.style.backgroundColor = "rgba(159, 188, 169, 0)";

    //set the Countdown to be one less each second
    countDown = secondsUntilNewLevel - 
    (dateInterval.getSeconds() % (secondsUntilNewLevel + 1));

    if (countDown === 0 && !isNewLevel) {
      speedGlobal += 0.4;
      level++;
      countDown = secondsUntilNewLevel;
      isNewLevel = true;
    }

    if (countDown === 1 && isNewLevel) {
      isNewLevel = false;
    }

    timerText.innerHTML =
      '<h2 style="font-size:2em">LEVEL ' +
      level +
      "</h2>" +
      "<br></br>" +
      "Time until next Level: " +
      twoDigitsNumber(countDown) +
      " s";

    timer.innerText = "Score:   " + parseInt(score / 10) + " m";
  }, 1000 / 100);
}

function twoDigitsNumber(value) {
  if (value < 10) {
    return "0" + value;
  } else return value.toString();
}

function update() {
  obstacleCreation(canvasHeight);
  scrollAmount += speedGlobal;
  obstacles.forEach(el => {
    el.update();
  });
  p1.update();
  if (p1.y > canvasHeight * 0.7) {
    moveTheCamera(6);
  }
  score += speedGlobal;
}

function moveTheCamera(amount) {
  p1.y -= amount;
  obstacles.forEach(el => {
    el.y -= amount;
  });
  scrollAmount += amount;
}

function drawEverything() {
  ctx.clearRect(0, 0, width, canvasHeight);
  obstacles.forEach(el => {
    el.draw();
  });
  p1.draw();
}



function obstacleCreation(obstacleY) {
  var widthOfLine = width;
  var brickWidth = [];
  var isTooWide = false;
  var obstaclesGapHeight = 250;
  var obstaclesOverCanvasIndex = 0;
  var isNewLine = false;

  //check if new Line needs to be created
  if (scrollAmount > obstaclesGapHeight) {
    isNewLine = true;
    scrollAmount = 0;
  } else isNewLine = false;

  //old lines will be deleted
  obstacles.forEach(el => {
    if (el.y + brickHeight < 0) obstaclesOverCanvasIndex++;
  });
  for (let brickLine = 0; brickLine < obstaclesOverCanvasIndex; brickLine++) {
    obstacles.shift();
  }

  //the random width will be created and pushed inside the obstacles-array
  if (isNewLine) {
    var nbOfBricks = Math.floor(Math.random() * 5 + 4); //Maximum amount of bricks per line: 6

    for (var brickNo = 0; brickNo < nbOfBricks; brickNo++) {
      if (brickNo === nbOfBricks - 1) {
        brickWidth[brickNo] = width;
      } else {
        brickWidth[brickNo] = Math.floor(
          Math.random() * (widthOfLine / 2) + 100
        );
        if (brickWidth[brickNo] > 600) brickWidth[brickNo] = 500; //in case the first random number is over 600
        if (widthOfLine - brickWidth[brickNo] < 100) {
         
          brickWidth[brickNo] = widthOfLine;  //If width of brick is smaller than the ball, the next iteration will stop
          isTooWide = true; //and brickwiWidth[i] will get the whole rest width
        } else widthOfLine -= brickWidth[brickNo];
      }

      //only checks the first brick so it will be 0 at x-Coordinate
      if (brickNo === 0) {
        obstacles.push(
          new Brick(
            ctx,
            0,
            obstacleY,
            brickWidth[brickNo],
            brickHeight,
            randomColor()
          )
        );
      } else {
        obstacles.push(
          new Brick(
            ctx,
            brickWidth.reduce((acc, el) => {
              return acc + el;
            }, 0) - brickWidth[brickNo],
            obstacleY,
            brickWidth[brickNo],
            brickHeight,
            randomColor()
          )
        );
      }

      if (isTooWide) {
        nbOfBricks = brickNo;
        isTooWide = false;
      }

      //check if color of player exists in the line of bricks and if not, pushes this color inside it
      for (
        let counter = obstacles.length - 1;
        counter > obstacles.length - nbOfBricks;
        counter--
      ) {
        if (
          counter < 0 ||
          Object.values(obstacles[counter]).indexOf(p1.color) > -1
        )
          break;
        if (counter === obstacles.length - nbOfBricks + 1) {
          //else {
          obstacles.pop();
          obstacles.push(
            new Brick(
              ctx,
              brickWidth.reduce((acc, el) => {
                return acc + el;
              }, 0) - brickWidth[brickNo],
              obstacleY,
              brickWidth[brickNo],
              brickHeight,
              p1.color
            )
          );
        }
      }
      //enemies.push(new Enemies(ctx));
    }
  }
}

function randomColor() {
  colors = ["#FAB752", "#B64926", "#FFF0A5", "#9FBCA9", "#2C8693", "#EFCB9B"];
  var colorPicker = Math.floor(Math.random() * colors.length);
  return colors[colorPicker];
}
