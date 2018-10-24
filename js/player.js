class Player {
  constructor(ctx) {
    this.ctx = ctx;
    this.radius = 30;
    this.x = 100;
    this.y = this.ctx.canvas.height / 2 - this.radius + 2;
    this.movement = null;
    this.speedX = 0;
    this.speedY = 0;
    this.width = this.ctx.canvas.width;
    this.color = "#2C8693";
    this.onLine = 0;
    this.isNewLine = false;
    this.stop = false;
    this.amountOfBricksWithSameColor = [];
    this.indexCounter = -1;
  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = "black";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  changeColor(brickLine) {
    if (this.isNewLine) {
      //var randomIndex = Math.floor(Math.random() * brickLine.color.length);
      this.isNewLine = false;
      // this.color = brickLine.color[randomIndex];
      this.color = "#2C8693";
    }
  }

  checkWhereSameBrick(brickLine) {
    var indexBrickWithSameColor = brickLine.color.indexOf(this.color);
    var brickCoordinatesWithSameColor = {
      x: brickLine.x[indexBrickWithSameColor],
      y: brickLine.y[indexBrickWithSameColor],
      width: brickLine.widthBrick[indexBrickWithSameColor],
      height: brickLine.height[indexBrickWithSameColor],
      index: brickLine.color.indexOf(
        this.color,
        this.amountOfBricksWithSameColor[this.indexCounter]
      )
    };
    if (this.indexCounter === this.amountOfBricksWithSameColor.length - 1) {
      this.indexCounter = -1;
      this.amountOfBricksWithSameColor = [];
    }
    return brickCoordinatesWithSameColor;
  }

  checkBoundaries() {
    //Check for color
    obstacles.forEach(el => {
      if (
        this.x >= el.x &&
        this.x <= el.width + el.x &&
        this.y + this.radius >= el.y &&
        this.y <= el.height + el.y
      ) {
        this.speedY = -bg.speed;
        if (Object.values(el).indexOf(this.color) > -1) {
          el.width = 0;
          this.speedY = 5;
        }
      }
    });

    //X-Coordinate
    if (this.x > this.width - this.radius - 12 && this.movement === "right")
      this.movement = null;
    if (this.x < 0 + 12 && this.movement === "left") this.movement = null;

    //check for Game-Stop
    if (this.y - this.radius / 2 - 30 < 0) {
      this.stop = true;
    }
  }

  update() {
    //this.speedY = 5;
    this.checkBoundaries();
    //this.changeColor(obstacle1.brickLines[this.onLine]);
    var delta = 1;
    this.speedX = 0;
    switch (this.movement) {
      case "right":
        delta = 1;
        this.angle += Math.PI / 24;
        this.speedX = 14;
        break;

      case "left":
        delta = -1;
        this.angle -= Math.PI / 24;
        this.speedX = 14;
        break;
    }

    this.x += this.speedX * delta;
    this.y += this.speedY;
  }
}
