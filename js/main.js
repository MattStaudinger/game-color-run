  
  var canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  canvas.setAttribute("width", "1200");
  canvas.setAttribute("height", "800");
  var width = canvas.width;
  var height = canvas.height;

var bg = new Background(ctx, "../images/bg05.jpg");
var p1 = new Player(ctx, "../images/ball01.png")

  document.getElementById("start-button").onclick = function() {
    startGame();
  }

  function update() {
  bg.update();
  } 
  
  function drawEverything() {
    ctx.clearRect(0,0, width, height);
    bg.draw();
   p1.draw()

  }

  setInterval(()=> {
    document.onkeydown = (e) => {
      e.preventDefault()
      console.log(e)
      switch (e.key) {
        case "ArrowRight":
        console.log("Test")
        p1.moveRight();
        break;
        case "ArrowLeft":
        p1.moveLeft();
        break;
        case "ArrowTop":
        break;
        case "ArrowDown":
        break;
        case "Enter":
        startGame();
      }
    }
  }, 10)
