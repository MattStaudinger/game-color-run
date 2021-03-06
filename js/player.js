
class Player {
  constructor(ctx) {
    this.ctx = ctx;
    this.radius = 30;
    this.x = this.ctx.canvas.width/2;
    this.y = this.ctx.canvas.height / 2 - this.radius;
    this.movement = null;
    this.speedX = 0;
    this.speedY = -speedGlobal;
    this.friction = 0.9;
    this.width = this.ctx.canvas.width;
    this.color = "#2C8693";
    this.stop = false;
    this.isFalling = false;
    this.fallingCounter = 0;
    this.delta = 1;
  }

  draw() {
    this.ctx.save();
    this.ctx.globalAlpha=1;
    this.ctx.fillStyle = this.color;
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = "black";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  checkBoundaries() {
    // to fix a "bug" where the player is stuck because he moved too fast in between bricks
    if (this.isFalling && this.fallingCounter < 15) {
      this.fallingCounter++;
      return;
    } else {
      //Check for color
      for (let brick = 0; brick < obstacles.length; brick++) {
        if (
          this.x >= obstacles[brick].x &&
          this.x <= obstacles[brick].width + obstacles[brick].x &&
          this.y + this.radius >= obstacles[brick].y &&
          this.y <= obstacles[brick].height + obstacles[brick].y
        ) {
          this.isFalling = false;
          if (Object.values(obstacles[brick]).indexOf(this.color) > -1) {
            this.isFalling = true;
            obstacles[brick].width = 0;
            this.fallingCounter = 0;
          }
         
          this.speedY = -speedGlobal;
          if (this.isFalling) this.speedY = 4;
          break;

        }
      };

      //X-Coordinate
      if (this.x > this.width - this.radius - 12 && this.movement === "right")
        this.x = 0;
      if (this.x < 0 + 12 && this.movement === "left") this.x = this.width;

      //check for Game-Stop
      if (this.y - this.radius / 2 < 0) {
        this.stop = true;
      }
    }
  }
    
  reset() {
    this.radius = 30;
    this.x = this.ctx.canvas.width/2;
    this.y = this.ctx.canvas.height / 2 - this.radius + 2;
    this.movement = null;
    this.speedX = 0;
    this.speedY = -speedGlobal;
    this.width = this.ctx.canvas.width;
    this.color = "#2C8693";
    this.stop = false;
    this.isFalling = false;
    this.fallingCounter = 0;
    this.delta = 1;
    this.friction = 0.9;
  }

  

  update() {
    this.checkBoundaries();
    this.speedX = 0;

    switch (this.movement) {
      case "right":
        this.delta = 1;
        this.speedX = 5;
        break;

      case "left":
        this.delta = -1;
        this.speedX = 5;
        break;
    }

    this.speedX *= this.friction
    this.x += this.speedX * this.delta;
    this.y += this.speedY;

  }
}
