class Brick{
  constructor(ctx, x,y,width,height,color, speed){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.color = color;
    this.speed = speed;
  }
  draw() {
    this.ctx.save();
    this.ctx.fillStyle = this.color
    this.ctx.shadowBlur = 5;
    this.ctx.shadowColor = "black";
    this.ctx.fillRect(
      this.x, this.y, this.width, this.height
    );
    this.ctx.restore();


  }
  update() {
    this.y -= this.speed // speed of all bricks
  }
}