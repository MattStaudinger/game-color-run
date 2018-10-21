class Player {
  constructor(ctx, url) {
    this.ctx = ctx;
    this.radius = 100;
    this.x = 100;
    this.y = this.ctx.canvas.height - this.radius;

    this.img = new Image()
    this.img.src = url;
    
    this.speedX = 20
    this.speedY = -2;
    this.gravitiy = 0.1
  }

   moveRight() {
    this.x += this.speedX;
   }
   moveLeft() {
     this.x -= this.speedX;
   }

   draw() {
     this.ctx.drawImage(this.img,this.x, this.y,this.radius,this.radius)

   }
}