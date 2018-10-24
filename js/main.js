var canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
var timer = document.getElementById("timerSec");
var timerText = document.getElementById("timerText");
canvas.setAttribute("width", "1200");
canvas.setAttribute("height", "800");
var width = canvas.width;
var canvasHeight = canvas.height;
var obstacles = [];
var scrollAmount = 0;
//var enemies = [];

var bg = new Background(ctx, "../images/bg09.jpg");
var p1 = new Player(ctx);
var time = new Chronometer();
// var enemy = new Enemies(ctx);





 function startGame() {
time.startClick();
time.setCountdown(10);
  document.getElementById("nav-btn").style = "display: none";
  canvas.style = "margin-top: 20px;";
  document.getElementById("playfield").append(canvas);
  scrollAmount = 300;
  obstacleCreation(canvasHeight / 2);
  scrollAmount = 300;
  obstacleCreation((canvasHeight / 4) * 3);
  scrollAmount = 300;
  obstacleCreation((canvasHeight / 4) * 3 + 200);
  requestAnimationFrame(interval);
}

function interval() {
  obstacleCreation(canvasHeight);
  update();
  drawEverything();
  if (p1.stop) return;
  requestAnimationFrame(interval);
}

function update() {
  scrollAmount += bg.speed;
  if (time.seconds > 10) bg.speed = 8;
  bg.update();
  obstacles.forEach(el => {
    el.update();
  });
  p1.update();
  if (p1.y > canvasHeight*0.7) {
    moveTheCamera(6)
  }
  // enemies.forEach(el => {
  //   el.updateEnemy();
  // });
}

function moveTheCamera(amount) {
  p1.y-=amount
  bg.y-=amount
  obstacles.forEach(el => {
    el.y-=amount
  });
  scrollAmount+=amount
}

function drawEverything() {
  ctx.clearRect(0, 0, width, canvasHeight);
  bg.draw();
  obstacles.forEach(el => {
    el.draw();
  });
  p1.draw();
  // enemies.forEach(el => {
  //   el.drawEnemy();
  // });
}

document.onkeydown = event => {
  event.preventDefault();
  switch (event.key) {
    case "ArrowRight":
      p1.movement = "right";
      break;
    case "ArrowLeft":
      p1.movement = "left";
      break;
    case "Enter":
      startGame();
      break;
    case " " :
    p1.movement = "boost"
    break;
  }
};

document.onkeyup = event => {
  event.preventDefault();
  switch (event.key) {
    case "ArrowRight":
    case "ArrowLeft":
    case "ArrowTop":
    case "ArrowDown":
    case " ":
      p1.movement = null;
      break;
  }
};

function obstacleCreation(obstacleY) {
  var widthOfLine = width;
  var brickWidth = [];
  var isTooWide = false;
  var brickHeight = 30;
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
          //If width of brick is smaller than the ball, the next iteration will stop
          brickWidth[brickNo] = widthOfLine; //and brickwiWidth[i] will get the whole rest width
          isTooWide = true;
        } else widthOfLine -= brickWidth[brickNo];
      }
      //only for the first brick to be 0 at x-Coordinate
      if (brickNo === 0) {
        obstacles.push(
          new Brick(
            ctx,
            0,
            obstacleY,
            brickWidth[brickNo],
            brickHeight,
            randomColor()          )
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
            randomColor()          )
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
              p1.color            )
          );
        }
      }
     //enemies.push(new Enemies(ctx));

    }
  }
}

function randomColor() {
  var colOrange = "#FAB752";
  var colRed = "#B64926";
  var colYellow = "#FFF0A5";
  var colGreen = "#9FBCA9";
  var colBlue = "#E4847F";
  var color;
  var colorPicker = Math.floor(Math.random() * 5);

  switch (colorPicker) {
    case 0:
      if (color === colOrange) {
        color = colGreen;
      } else {
        color = colOrange;
      }
      break;
    case 1:
      if (color === colGreen) {
        color = colYellow;
      } else {
        color = colGreen;
      }
      break;

    case 2:
      if (color === colYellow) {
        color = colRed;
      } else {
        color = colYellow;
      }
      break;

    case 3:
      if (color === colRed) {
        color = colBlue;
      } else {
        color = colRed;
      }
      break;

    case 4:
      if (color === colBlue) {
        color = colOrange;
      } else {
        color = colBlue;
      }
      break;
  }
  return color;
}


