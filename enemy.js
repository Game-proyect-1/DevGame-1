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

    this.posX = (window.innerWidth*1.1) - window.innerWidth; //que empiece donde empieza la plataforma
    this.posY = window.innerHeight/1.2 - 150; //encima de la plataforma
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
    if (this.posY + this.width < this.posY0) {
      // Está saltando
      this.posY += this.velY;
      this.velY += this.gravity; //velocidad caida y frenado paulatino
    } else {
      // this.posY = this.posY0;
      this.velY = 1;
    }

    this.posX += 1;
    if (this.posX >= this.gameW + this.width) {
      this.posX = 0;
    }

//Ajustes para que caiga el enemy al salirse de la plataforma
    if (this.posX + this.width/1.3 <= leftGap) {
      this.posY += (this.velY*10);
    }
    if (this.posX + this.width/1.8 >= rightGap) {
      this.posY += (this.velY*10);
    }    

}
     
}