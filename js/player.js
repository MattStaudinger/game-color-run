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
    this.speed = 20;
    this.gravitiy = 0.1;
    this.width = this.ctx.canvas.width;
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.x + this.radius / 2, this.y + this.radius / 2);
    console.log(this.x + this.radius / 2, this.y + this.radius / 2);
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
    if (this.x > this.width - this.radius-12)  {
      if (this.movement === "left") this.speed = 20;
      else  this.movement = null;
    }
    if (this.x < 0+12)  {
      if (this.movement ==="right") this.speed = 20;
      else this.movement = null;
    }
  }


  update() {

    this.checkBoundaries()    
    if (this.movement) {
      var delta;
      if (this.movement === "right") {
        delta = 1;
        this.angle += Math.PI / 24;
      } else {
        delta = -1;
        this.angle -= Math.PI / 24;
      }
  
      this.x += this.speed * delta;
    }
  }
}
