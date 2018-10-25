class Background {
  constructor(ctx, url) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.style.opacity = "0.5"
    this.speed = 0.75;
    this.y = 0;
   //  this.img.onload = function() {
    this.img.src = url;//};
    this.height = this.img.height;
    this.width = this.ctx.canvas.width;
  }

  update() {
    //  if (p1.y+p1.radius > this.ctx.canvas.height / 2 + 100) {
    //     this.speed = 20;
    //   } else this.speed = 2;

    this.y -= this.speed;
  }
  draw() {
    this.ctx.save();
    for (var i = 0; this.y + i * this.img.height < this.ctx.canvas.height; i++) {
      this.ctx.drawImage(
        this.img,
        0,
        this.y + i * this.img.height,
        this.width,
        this.img.height
      );
      this.ctx.restore();
    }
  }

  reset() {
    this.speed = 3;
    this.y = 0;
    this.height = this.img.height;
    this.width = this.ctx.canvas.width;
  }
}
