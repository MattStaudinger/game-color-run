class Background {
  constructor (ctx, url) {
    this.ctx = ctx;
    this.img = new Image()
    this.img.src = url;
    this.speed = 2;
    this.y = 0;
    this.height = this.img.height;
    this.width = this.ctx.canvas.width
  }

  update() {
    this.y -= this.speed
    // if (this.x < -this.width) {
    //   this.x += this.width
    // }
  }
    draw() {
      for (var i = 0; this.y+i*this.height < this.ctx.canvas.height; i++) {
        this.ctx.drawImage(this.img,0,this.y+i*this.height,this.width,this.height)
      }
    }

}