class Enemy {
  constructor(ctx, gameW, gameH) {
    this.ctx = ctx;

    this.gameWidth = gameW;
    this.gameHeight = gameH;

    this.width = 150;
    this.height = 150;

    // this.image = new Image();
    // this.image.src = "./img/sprites/1/Idle.png";
    // this.image.frames = 4;
    // this.image.framesIndex = 0; CI

    this.image = new Image();
    this.image.src = "./img/sprites juego/enemy/andar enemy.png";
    this.image.frames = 16;
    this.image.framesIndex = 0;
    this.lives = 30;

    this.posX = (window.innerWidth*1.1) - window.innerWidth; //que empiece donde empieza la plataforma
    this.posY = window.innerHeight/1.2 - 150 ; //encima de la plataforma
    this.posY0 = this.posY;
    this.isMovingRight = false;
    this.isMovingLeft = false;


    this.velX = 2;
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
    if (this.posY + this.height <= this.posY0) {
      // Está saltando
      this.posY += this.velY;
      this.velY += this.gravity; //velocidad caida y frenado paulatino
    } else {
      // this.posY = this.posY0;
      this.velY = 1;
    }

    this.posX += 1;
    if (this.posX >= rightGap) {
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

//CI
// move() {
//   this.posX += 2;
//   if (this.posX + this.width >= this.gameWidth) {
//     this.posX = 0;
//   }
// }
     
}