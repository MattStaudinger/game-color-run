class Background {
  constructor (ctx, url) {
    this.ctx = ctx;
    this.img = new Image()
    this.speed = 2;
    this.y = 0;
   // this.img.onload = this.draw();
    this.img.src = url;
    this.height = this.img.height;
    this.width = this.ctx.canvas.width
  
  }

  update() {
    this.y -= this.speed
  }
    draw() {
      this.ctx.save();
      for (var i = 0; this.y+i*this.img.height < this.ctx.canvas.height; i++) {
        this.ctx.drawImage(this.img,0,this.y+i*this.img.height,this.width,this.img.height)
        this.ctx.restore();
      }
    }

}