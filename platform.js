class Platform {
  constructor(ctx, gameWidth, playerPosY0, playerHeight) {
    this.ctx = ctx;
    this.posX = 75;
    this.posY = 905;
    this.width = 1700;
    this.height = 60;
  }
  draw() {
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }
}
