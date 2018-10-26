class Background {
  constructor(ctx, url) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.style.opacity = "0.5"
    this.speed = 0.75;
    this.y = 0;
    this.img.src = url;
    this.height = this.img.height;
    this.width = this.ctx.canvas.width;
  }

  update() {
 
    this.y -= this.speed;
  }


  reset() {
    this.speed = 3;
    this.y = 0;
    this.height = this.img.height;
    this.width = this.ctx.canvas.width;
  }
}
