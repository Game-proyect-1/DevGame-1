class Player {
  constructor(ctx, gameW, gameH, keys) {
    this.ctx = ctx;

    this.gameWidth = gameW;
    this.gameHeight = gameH;

    this.width = 150;
    this.height = 150;

    this.image = new Image();
    // this.image.src = "./img/sprites/2/Idle.png"; CI
    this.image.src =
      "./img/sprites juego/player/player quieto derecha.izquierda.png";
    this.image.frames = 8;
    this.image.framesIndex = 0;

    //CI
    this.lives = 3;
    this.livesImage = new Image();
    this.livesImage.src = "./img/sprites juego/player/life.png";
    this.lifePosX = this.gameWidth - 100;
    this.lifePosY = 0;

    //CI imagen Game Over PREGUNTAR PORQUE AQUI FUNCIONA Y EN GAME.JS NO
    this.imageGameOver = new Image();
    this.imageGameOver.src = "./img/sprites juego/player/gameover.png";

    //Para colocar al jugador encima de la plataforma
    this.posX = (window.innerWidth - 150)- window.innerWidth/7;
    this.posY = window.innerHeight/1.2 - 150;
    this.posY0 = this.posY;
    // this.isMovingRight = false;
    // this.isMovingLeft = false; CI
    this.isMoving = false;
    this.isStopped = false;
    this.isLookingLeft = false;
    this.isLookingRigth = false;
    this.lifeTimeCount = 0;

    this.health = 150;

    this.keys = keys;

    this.bullets = [];

    this.setListeners();
    this.velY = 2;
    this.velX = 8;
    this.gravity = 1;
  }

  draw(framesCounter, interval) {
    //Aquí dibujar la barrita de vida encima del player
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

    this.move(interval);

    //CI
    let lookRigth = this.isLookingRigth;

    this.bullets.forEach(function (bullet) {
      bullet.draw();
    });

    //CI Pintar vidas
    let lifePosX = this.lifePosX;
    for (let index = 0; index < this.lives; index++) {
      this.ctx.drawImage(this.livesImage, lifePosX, this.lifePosY, 80, 80);
      lifePosX -= 60;
    }

    this.clearBullets();
  }
  setListeners() {
    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case this.keys.jump:
          if (this.posY >= this.posY0) {
            this.jump();
          }
          break;
        case this.keys.shoot:
          this.shoot();
          break;
        case this.keys.rigth:
          this.moveRigth();
          break;
        case this.keys.left:
          this.moveLeft();
          break;
        case this.keys.target:
          this.target();
          break;
      }
    });

    // document.addEventListener("keyup", (e) => {
    //   switch (e.keyCode) {
    //     case this.keys.rigth:
    //       this.stop();
    //       break;
    //     case this.keys.left:
    //       this.stop();
    //       break;
    //   }
    // }); CI

    document.addEventListener("keyup", (e) => {
      switch (e.keyCode) {
        case this.keys.rigth:
          this.stop(true);
          break;
        case this.keys.left:
          this.stop(false);
          break;
      }
    });
  }

  shoot() {
    let bullet = new Bullets(
      this.ctx,
      this.posX,
      this.posY,
      this.posY0,
      this.width,
      this.height,
      //CI
      this.isLookingLeft,
      this.isLookingRigth);
      this.bullets.push(bullet);
    
    // bullet.draw();
  }

  clearBullets() {
    // console.log(this.bullets)
    this.bullets = this.bullets.filter((bullet) => {
      return bullet.posX >= 0 && bullet.posX <= this.gameWidth && bullet.posY >= 0 && bullet.posY <= this.gameHeight;
    });
  }

  // moveRigth() {
  //   // refactorizar en una sola función
  //   this.isMovingRight = true;
  //   this.image.src = "./img/sprites/2/Walk.png";
  //   this.image.frames = 6;

  //   //this.posX += 80;
  // } CI

  moveRigth() {
    // refactorizar en una sola función??
    // if (this.posX + this.width >= this.gameWidth) {
    //   this.posX = 0;
    // } //por si queremos que de derecha pueda volver al inicio
    this.isStopped = false;
    this.isMoving = true;
    this.isLookingRigth = true;
    this.isLookingLeft = false;
    this.image.src = "./img/sprites juego/player/andarPlayer.png";
    this.image.frames = 15;

    //this.posX += 80;
  }

  // moveLeft() {
  //   this.isMovingLeft = true;
  //   this.image.src = "./img/sprites/2/Walk.png";
  //   this.image.frames = 6;
  //   //this.posX -= 80;
  // } CI

  moveLeft() {
    // if ((this.posX = this.gameWidth - this.gameWidth)) {
    //   this.posX = this.gameWidth;
    // } //por si queremos que de la izquierda pueda volver a la derecha del todo, PERO AHORA NO FUNCIONA
    this.isStopped = false;
    this.isMoving = true;
    this.isLookingLeft = true;
    this.isLookingRigth = false;
    this.image.src =
      "./img/sprites juego/player/andar player derecha-izquierda.png";
    this.image.frames = 15;
  }

  jump() {
    this.posY -= 100;
    this.velY -= 8;
  }

  // stop() {
  //   this.isMovingRight = false;
  //   this.isMovingLeft = false;
  //   this.image.src = "./img/sprites/2/Idle.png";
  //   this.image.frames = 4;
  // } CI

  stop(isLookingRigth) {
    if (isLookingRigth) {
      this.image.src = "./img/sprites juego/player/quietp.png";
      this.image.frames = 8;
    } else {
      this.image.src =
        "./img/sprites juego/player/player quieto derecha.izquierda.png";
      this.image.frames = 8;
    }
    this.isMoving = false;
    this.isStopped = true;
  }


  animate(framesCounter) {
    if (framesCounter % 5 == 0) {
      this.image.framesIndex++;
    }

    if (this.image.framesIndex >= this.image.frames) {
      this.image.framesIndex = 0;
    }
  }

  // move(interval) {
  //   if (this.posY < this.posY0) {
  //     // Está saltando
  //     this.posY += this.velY;
  //     this.velY += this.gravity; //velocidad caida y frenado paulatino
  //   } else {
  //     // this.posY = this.posY0;
  //     this.velY = 1;
  //   }
  //    if (this.isMovingRight && this.width + this.posX <= this.gameWidth + this.width) {
  //      this.posX += this.velX;
  //    }

  //    if (this.isMovingLeft && this.posX <= this.gameWidth + this.width) {
  //     this.posX -= this.velX;
  //   }

  //   if (this.posX + this.width/1.3 <= leftGap) {
  //     this.posY += (this.velY*10);
  //   }
  //   if (this.posX + this.width/1.3 >= rightGap) {
  //     this.posY += (this.velY*10);
  //   }

  //   if (this.posY >= window.innerHeight) {    
  //     clearInterval(interval);
  //   }

  // } CI

  move() {
    if (this.posY < this.posY0) {
      // Está saltando
      this.posY += this.velY;
      this.velY += this.gravity; //velocidad caida y frenado paulatino
    } 

    if (this.isMoving) {
      if (this.isLookingRigth && this.width + this.posX <= this.gameWidth) {
        this.posX += this.velX;
      }

      if (this.posX + this.width/1.3 <= leftGap) {
        this.posY += (this.velY*10);
      }
      if (this.posX + this.width/1.8 >= rightGap) {
        this.posY += (this.velY*10);
      }  

      if (this.isLookingLeft && this.posX  >= 0) {
        //revisar el width /2.5.
        this.posX -= this.velX;
      }

       if (this.posY >= window.innerHeight) {    
            this.clearInterval(interval);
            }
    }
  }

}
