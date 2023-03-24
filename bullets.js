class Bullets {
  constructor(
    ctx,
    playerPosX,
    playerPosY,
    playerPosY0,
    playerHeight,
    //CI
    isMovingLeft,
    isMovingRight
  ) {
    this.ctx = ctx;

    this.posX = playerPosX;
    this.posY = playerPosY + playerHeight * 0.5;

    this.playerPosY0 = playerPosY0;
    this.playerHeight = playerHeight;

    //CI
    this.radius = 10;

    // this.velX = 100;
    // this.velY = 10;

    // this.gravity = 10; CI
    this.velX = 4;
    this.velY = 4;

    this.gravity = 0.01;

    this.width = 50;
    this.height = 50;

    //CI
    this.isMovingRight = isMovingRight;
    this.isMovingLeft = isMovingLeft;

    this.image = new Image();
    this.image.src = "./img/sprites/2/fire.png";
    this.image.frames = 6;
    this.image.framesIndex = 0;
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

  // move() {
  //   //Cuanto mayor el número que multiplica, más lejos llega
  //   this.posX -= this.velX      ;
  //   this.posY += this.velY;

  //   this.velY += this.gravity;

  //   if (this.posY >= this.playerPosY0 + this.playerHeight) {
  //     this.velY += -1;

  //     this.posX += this.velX*5;
  //     this.posY += this.velY;

  //     this.velY += this.gravity;

  //     // if (this.posX >= playerPosX && this.posX <= playerPosX + this.width && this.posY <= )

  //       // if (this.posY >= this.playerPosY0 + this.playerHeight) { // Rebote
  //       //   this.velY *= 30;
  //       // }
  //   }

  // } CI
  move() {
    
    if (this.isMovingRight) {
      this.posX += this.velX;
    } 
    if (this.isMovingLeft) {
      this.posX -= this.velX;
    }

    this.posY -= this.velY;
    this.velY += this.gravity;

     if (this.posY < this.playerPosY0) {
       this.gravity -= 0.02;
     } 
  }

  animate(framesCounter) {
    if (framesCounter % 5 == 0) {
      this.image.framesIndex++;
    }

    if (this.image.framesIndex >= this.image.frames) {
      this.image.framesIndex = 0;
    }
  }

  //Intentando borrar las bullets que no estén dentro del canvas

// Esta función hace posible que las bullets se borren
  isCollision(posX, posY) { //colisión bullet que paso a game
    return (
      this.posX - posX <= 50 
      && posX - this.posX <= 50 
      && this.posY >= posY
    );
  }

  //CI
  // isCollisionBullet(posX, posY) {
  //   return (
  //     this.posX - posX <= 50 && posX - this.posX <= 50 && this.posY >= posY
  //   );
  // }
}
