class Brick{
  constructor(ctx, x,y,width,height,color){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.color = color;
  }
  draw() {
    this.ctx.save();
    this.ctx.globalAlpha=1;
    this.ctx.fillStyle = this.color
    this.ctx.shadowBlur = 5;
    this.ctx.shadowColor = "black";
    this.ctx.fillRect(
      this.x, this.y, this.width, this.height
    );
    this.ctx.restore();


  }
  update() {
    this.y -= speedGlobal // speed of all bricks
  }
}