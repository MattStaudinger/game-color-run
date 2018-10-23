class Obstacle {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = this.ctx.canvas.height / 2;
    this.color = "black";
    this.speed = bg.speed;
    this.width = this.ctx.canvas.width;
    this.height = 30; // Height of the Bricks
    this.brickLines = [];
    this.nbOfBricks = 0;
    this.whichLine = 0;
    this.scrollAmount = 0;
    this.rowGapHeight = 175;
    this.isNewRow = false;
  }

  createBrickLine(lineNumber, position) {
    var index = lineNumber;
    var isTooWide = false;
    var brickWidth = [];
    var width = this.width;

    this.brickLines[index] = {
      x: [],
      y: [],
      widthBrick: [],
      height: [],
      color: []
    };

    // delete Brick-Line which is out of the canvas
    // for (let line = 0; line < this.whichLine - 1; line++) {
    //   if (this.whichLine > 0 && this.brickLines[line].y[0] + this.height < -500) {
    //     this.brickLines.shift();
    //     this.whichLine--;
    //     index = lineNumber - 1;
    //   }
    // }

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
      if (i === 0) this.brickLines[index].x.push(0);
      else {
        this.brickLines[index].x.push(
          brickWidth.reduce((acc, el) => {
            return acc + el;
          }, 0) - brickWidth[i]
        );
      }
      this.brickLines[index].y.push(position);
      this.brickLines[index].widthBrick.push(brickWidth[i]);
      this.brickLines[index].height.push(this.height);
      this.brickLines[index].color.push(this.randomColor());

      

      if (isTooWide) {
        this.nbOfBricks = i;
        isTooWide = false;
      }
    }

    var colorOfPlayerIndex = Math.floor(Math.random()*this.brickLines[index].color.length);
    this.brickLines[index].color[colorOfPlayerIndex] = p1.color;
    this.whichLine++;
  }

  draw() {
    if (this.isNewRow)
      this.createBrickLine(this.whichLine, this.ctx.canvas.height);
    if (this.whichLine === 0) {
      this.createBrickLine(this.whichLine, this.ctx.canvas.height / 2);
      this.createBrickLine(
        this.whichLine,
        this.ctx.canvas.height / 2 + this.rowGapHeight + 50
      );
    }

    for (let brickRow = 0; brickRow < this.whichLine; brickRow++) {
      for (var i = 0; i < this.brickLines[brickRow].x.length; i++) {
        this.ctx.save();
        this.ctx.fillStyle = this.brickLines[brickRow].color[i];
        this.ctx.shadowBlur = 5;
        this.ctx.shadowColor = "black";
        this.ctx.fillRect(
          this.brickLines[brickRow].x[i],
          this.brickLines[brickRow].y[i],
          this.brickLines[brickRow].widthBrick[i],
          this.brickLines[brickRow].height[i]
        );
        this.ctx.restore();
      }
    }
  }

  update() {
    this.speed = bg.speed;
    for (let brickRows = 0; brickRows < this.whichLine; brickRows++) {
      for (let i = 0; i < this.brickLines[brickRows].y.length; i++) {
        this.brickLines[brickRows].y[i] -= this.speed;
      }
    }
    if (this.scrollAmount >= this.rowGapHeight) {
      this.scrollAmount = 0;
      this.isNewRow = true;
    } else {
      this.scrollAmount += this.speed;
      this.isNewRow = false;
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
        }
        break;
      case 1:
        if (this.color === colGreen) {
          this.color = colYellow;
        } else {
          this.color = colGreen;
        }
        break;

      case 2:
        if (this.color === colYellow) {
          this.color = colRed;
        } else {
          this.color = colYellow;
        }
        break;

      case 3:
        if (this.color === colRed) {
          this.color = colBlue;
        } else {
          this.color = colRed;
        }
        break;

      case 4:
        if (this.color === colBlue) {
          this.color = colOrange;
        } else {
          this.color = colBlue;
        }
        break;
    }
    return this.color;
  }
}
