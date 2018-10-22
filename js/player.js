class Player {
  constructor(ctx, url) {
    this.ctx = ctx;
    this.radius = 100;
    this.x = 100;
    this.y = this.ctx.canvas.height - this.radius + 5;
    this.movement = null;
    this.img = new Image();
    //this.img.onload = this.draw();
    this.img.src = url;
    this.angle = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.gravitiy = 4;
    this.width = this.ctx.canvas.width;
    this.jumpHeight = 40 ;
    this.justJumped = false;
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.x + this.radius / 2, this.y + this.radius / 2);
    this.ctx.rotate(this.angle);
    //  console.log(this.x, this.y)
    this.ctx.translate(
      -(this.x + this.radius / 2),
      -(this.y + this.radius / 2)
    );
    this.ctx.drawImage(this.img, this.x, this.y, this.radius, this.radius);
    this.ctx.restore();
  }

  checkBoundaries() {
    //X-Coordinate
    if (this.x > this.width - this.radius - 12 && this.movement === "right")
      this.movement = null;
    if (this.x < 0 + 12 && this.movement === "left") this.movement = null;

    //Y-Coordinate
    if (this.y+this.speedY > this.ctx.canvas.height - this.radius+5) {
      this.speedY = 0;
      this.movement = null;
      // this.justJumped = false;
    }
  }

  update() {
    this.checkBoundaries();
    var delta = 1;
    this.speedX = 0;
    this.speedY = 0;
    switch (this.movement) {
      case "right":
        delta = 1;
        this.angle += Math.PI / 24;
        this.speedY = 0;
        this.speedX = 20;
        break;

      case "left":
        delta = -1;
        this.angle -= Math.PI / 24;
        this.speedY = 0;
        this.speedX = 20;
        break;

      case "jump":
        this.speedY -= this.jumpHeight*0.8;
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
