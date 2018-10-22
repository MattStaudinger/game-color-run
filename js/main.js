  
  var canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  canvas.setAttribute("width", "1200");
  canvas.setAttribute("height", "800");
  var width = canvas.width;
  var height = canvas.height;

var bg = new Background(ctx, "../images/bg09.jpg");
var p1 = new Player(ctx, "../images/ball/ball_blue_small.png")



function startGame (){
  document.getElementById("nav-btn").style = "display: none";
  canvas.style = "margin-top: 20px;"
  document.querySelector("body").append(canvas);
  requestAnimationFrame(interval);
  }

function interval () {
    update();
    drawEverything();
    requestAnimationFrame(interval)
}

  function update() {
  bg.update();
  p1.update();
  } 
  
  function drawEverything() {
    ctx.clearRect(0,0, width, height);
    bg.draw();
    p1.draw()

  }

  document.onkeydown = (event) => {
    event.preventDefault()
    console.log(event)
    switch (event.key) {
      case "ArrowRight":
      p1.movement = "right";
      break;
      case "ArrowLeft":
      p1.movement = "left";
      break;
      case "ArrowTop":
      break;
      case "ArrowDown":
      break;
      case "Enter":
      startGame();
    }
  }

  document.onkeyup = (event) => {
    event.preventDefault()
    console.log("Up")
    switch (event.key) {
      case "ArrowRight":
      case "ArrowLeft":
      case "ArrowTop":
      case "ArrowDown":
      p1.movement = null;
      break;
    }
  }


