class Enemies  {
  constructor(ctx) {
    this.ctx = ctx;
  this.width = 50
  this.height = 50;
  this.x = 100;
    this.y = this.ctx.canvas.height / 2 - this.height + 2;
    this.movement = null;
    this.vx = 5;
    this.vy = -bg.speed;
  }



drawEnemy() {
  this.ctx.save();
  this.ctx.fillStyle = this.color;
  this.ctx.shadowBlur = 10;
  this.ctx.shadowColor = "black";
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
  this.ctx.restore();
}

updateEnemy () {

  this.checkBoundaries()
  if (this.x + this.width-5 > this.ctx.canvas.width) {
    this.vx *= -1;
  } else if (this.x < 0)
  this.vx *= -1


  this.x += this.vx;
   this.y -= this.vy;

}

checkBoundaries() {
  
  this.vy = -bg.speed
obstacles.forEach(el => {
  if (
    this.x >= el.x &&
    this.x <= this.ctx.canvas.width + el.x &&
    this.y + this.height >= el.y &&
    this.y <= el.height + el.y
  ) {      this.vy = 5

    } 




  }
);
}

}