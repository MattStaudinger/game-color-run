class Player {
  constructor(ctx, url) {
    this.ctx = ctx;
    this.radius = 30;
    this.x = 100;
    this.y = this.ctx.canvas.height / 2 - this.radius + 2;
    this.movement = null;
    this.img = new Image();
    //this.img.onload = this.draw();
    this.img.src = url;
    this.angle = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.gravitiy = 4;
    this.width = this.ctx.canvas.width;
    this.jumpHeight = 40;
    this.justJumped = false;
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
    //check for same color of Player and Brick
    for (let k = 0; k < obstacle1.brickLines.length; k++) {
      obstacle1.brickLines[k].color.forEach((element, index) => {
        if (element.includes(this.color))
          this.amountOfBricksWithSameColor.push(index);
      });
      for (let h = 0; h < this.amountOfBricksWithSameColor.length; h++) {
        this.indexCounter++;
        if (
          this.x > this.checkWhereSameBrick(obstacle1.brickLines[k]).x &&
          this.x <
            this.checkWhereSameBrick(obstacle1.brickLines[k]).width +
              this.checkWhereSameBrick(obstacle1.brickLines[k]).x &&
          this.y + this.radius + 5 >=
            this.checkWhereSameBrick(obstacle1.brickLines[k]).y &&
          this.y <=
            this.checkWhereSameBrick(obstacle1.brickLines[k]).height +
              this.checkWhereSameBrick(obstacle1.brickLines[k]).y
        ) {
          obstacle1.brickLines[k].widthBrick[
            this.checkWhereSameBrick(obstacle1.brickLines[k]).index
          ] = 0;
          this.isNewLine = true;
          this.onLine = k + 1;
          break;
        }
      }
    }

    if (this.y > obstacle1.brickLines[this.onLine].y[0] - this.radius) {
      this.speedY = -obstacle1.speed;
    }
    if (this.y - this.radius / 2 - 30 < 0) {
      this.stop = true;
    }
    //X-Coordinate
    if (this.x > this.width - this.radius - 12 && this.movement === "right")
      this.movement = null;
    if (this.x < 0 + 12 && this.movement === "left") this.movement = null;
  }

  update() {
    this.speedY = 5;
    this.checkBoundaries();
    this.changeColor(obstacle1.brickLines[this.onLine]);
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

      case "jump":
        this.speedY -= this.jumpHeight * 0.8;
        this.speedX = 0;
        break;
      case "down":
        this.speedY += this.gravitiy;
        this.speedX = 0;
        //this.y += this.speedY;
        break;
    }

    this.x += this.speedX * delta;
    this.y += this.speedY;
  }
}
