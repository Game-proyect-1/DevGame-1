class Enemy {
  constructor(ctx, gameW, gameH) {
    this.ctx = ctx;

    this.gameWidth = gameW;
    this.gameHeight = gameH;

    this.width = 150;
    this.height = 150;

    this.image = new Image();
    this.image.src = "./img/sprites/1/Idle.png";
    this.image.frames = 4;
    this.image.framesIndex = 0;

    this.posX = this.gameWidth - this.gameWidth;
    this.posY = this.gameHeight - this.height * 1.5; //pegado al suelo
    this.posY0 = this.posY;
    this.isMovingRight = false;
    this.isMovingLeft = false;

    // this.bullets = [];

    //this.setListeners();
    // this.velY = 2;
    this.velX = 2;
    // this.gravity = 0.6;
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.image,
      (this.image.width / this.image.frames) * this.image.framesIndex,
      0,
      this.image.width / this.image.frames,
      this.image.height,
      this.posX,
      this.posY,
      this.width,
      this.height
    );

    this.animate(framesCounter);

    this.move();

    // this.bullets.forEach(function (bullet) {
    //   bullet.draw();
    // });

    //     this.clearBullets();
  }
  animate(framesCounter) {
    if (framesCounter % 5 == 0) {
      this.image.framesIndex++;
    }

    if (this.image.framesIndex >= this.image.frames) {
      this.image.framesIndex = 0;
    }
  }
  move() {
    this.posX += 1;
    if (this.posX + this.width >= this.gameWidth) {
      this.posX = 0;
    }
  }
}
