class Obstacle {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = this.ctx.canvas.height;
    this.color = "black";
    this.speed = 2;
    this.width = this.ctx.canvas.width;
    this.height = 50; // Height of the Bricks
    this.brickLines = [
      {
        x: [],
        y: [],
        width: [],
        height: [],
        color: []
      }
    ];
    this.nbOfBricks = 0;
  }

  createBrickLine() {
    var isTooWide = false;
    var brickWidth = [];
    var width = this.width;

    this.nbOfBricks = Math.floor(Math.random() * 5 + 4); //Maximum amount of bricks per line: 6
    for (var i = 0; i < this.nbOfBricks; i++) {
      if (i === this.nbOfBricks - 1) {
        brickWidth[i] = width;
      } else {
        brickWidth[i] = Math.floor(Math.random() * (width / 2) + 100);
        if (brickWidth[i] > 600) brickWidth[i] = 550; //in case the first random number is over 600
        if (width - brickWidth[i] < 100) {
          //If width of brick is smaller than the ball, the next iteration will stop
          brickWidth[i] = width; //and brickwiWidth[i] will get the whole rest width
          isTooWide = true;
        } else width -= brickWidth[i];
      }

      if (i === 0) this.brickLines[0].x.push(0);
      else
        this.brickLines[0].x.push(
          brickWidth.reduce((acc, el) => {
            return acc + el;
          }, 0) - brickWidth[i]
        );
      this.brickLines[0].y.push(this.y);
      this.brickLines[0].width.push(brickWidth[i]);
      this.brickLines[0].height.push(this.height);
      this.brickLines[0].color.push(this.randomColor());
    }
    if (isTooWide) {
      this.nbOfBricks = i + 1;
      isTooWide = false;
      i = this.nbOfBricks;
    }
  }

  draw() {
    for (var i = 0; i < this.nbOfBricks; i++) {
      this.ctx.save();
      this.ctx.fillStyle = this.brickLines[0].color[i];
      this.ctx.shadowBlur = 5;
      this.ctx.shadowColor = "black";
      this.ctx.fillRect(
        this.brickLines[0].x[i],
        this.brickLines[0].y[i],
        this.brickLines[0].width[i],
        this.brickLines[0].height[i]
      );
      this.ctx.restore();
    }
  }

  update() {
    for (let i = 0; i < this.brickLines[0].y.length; i++) {
      this.brickLines[0].y[i] -= this.speed;
    }
  }

  randomColor() {
    var colOrange = "#FAB752";
    var colRed = "#B64926";
    var colYellow = "#FFF0A5";
    var colGreen = "#468966";
    var colBlue = "#2C8693";

    var colorPicker = Math.floor(Math.random() * 5);

    switch (colorPicker) {
      case 0:
        if (this.color === colOrange) {
          this.color = colGreen;
        } else {
          this.color = colOrange;
          break;
        }
      case 1:
        if (this.color === colGreen) {
          this.color = colYellow;
          return colYellow;
        } else {
          this.color = colGreen;
          return colGreen;
          break;
        }
      case 2:
        if (this.color === colYellow) {
          this.color = colRed;
        } else {
          this.color = colYellow;
          break;
        }
      case 3:
        if (this.color === colRed) {
          this.color = colBlue;
        } else {
          this.color = colRed;
          break;
        }
      case 4:
        if (this.color === colBlue) {
          this.color = colOrange;
        } else {
          this.color = colBlue;
          break;
        }
    }
    return this.color;
  }
}
