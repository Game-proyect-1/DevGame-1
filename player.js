class Player {
  constructor(ctx, gameW, gameH, keys) {
    this.ctx = ctx;

    this.gameWidth = gameW;
    this.gameHeight = gameH;

    this.width = 150;
    this.height = 150;

    this.image = new Image();
    this.image.src = "./img/sprites/2/Idle.png";
    this.image.frames = 4;
    this.image.framesIndex = 0;

    //Para colocar al jugador encima de la plataforma
    this.posX = (window.innerWidth - 150)- window.innerWidth/7;
    this.posY = window.innerHeight/1.2 - 150;

    this.posY0 = this.posY;
    this.isMovingRight = false;
    this.isMovingLeft = false;

    this.health = 150;

    this.keys = keys;

    this.bullets = [];

    this.setListeners();
    this.velY = 2;
    this.velX = 8;
    this.gravity = 1;
  }

  healthBarBar() {
    // ctx.fillText("this.health", this.posX, this.posY-100, this.width);
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

    this.bullets.forEach(function (bullet) {
      bullet.draw();
    });

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

    document.addEventListener("keyup", (e) => {
      switch (e.keyCode) {
        case this.keys.rigth:
          this.stop();
          break;
        case this.keys.left:
          this.stop();
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
      this.height
    );
    this.bullets.push(bullet);
    bullet.draw();
  }

  checkBulletCollision()  {
    for (i = 0; i < this.bullets.length; i++) {
      
    }
  }

  clearBullets() {
    // console.log(this.bullets)
    this.bullets = this.bullets.filter((bullet) => {
      return bullet.posX >= 0;
    });
  }

  moveRigth() {
    // refactorizar en una sola función
    this.isMovingRight = true;
    this.image.src = "./img/sprites/2/Walk.png";
    this.image.frames = 6;

    //this.posX += 80;
  }

  moveLeft() {
    this.isMovingLeft = true;
    this.image.src = "./img/sprites/2/Walk.png";
    this.image.frames = 6;
    //this.posX -= 80;
  }

  jump() {
    this.posY -= 80;
    this.velY -= 8;
  }

  stop() {
    this.isMovingRight = false;
    this.isMovingLeft = false;
    this.image.src = "./img/sprites/2/Idle.png";
    this.image.frames = 4;
  }
  target() {}

  //   clearBullets() {
  //     // Clear bullets (.filter 👀)
  //     this.bullets = this.bullets.filter((bullet) => {
  //       return bullet.posX <= this.gameWidth;
  //     });
  //   }

  animate(framesCounter) {
    if (framesCounter % 5 == 0) {
      this.image.framesIndex++;
    }

    if (this.image.framesIndex >= this.image.frames) {
      this.image.framesIndex = 0;
    }
  }

  move(interval) {
    if (this.posY < this.posY0) {
      // Está saltando
      this.posY += this.velY;
      this.velY += this.gravity; //velocidad caida y frenado paulatino
    } else {
      // this.posY = this.posY0;
      this.velY = 1;
    }
     if (this.isMovingRight && this.width + this.posX <= this.gameWidth + this.width) {
       this.posX += this.velX;
     }

     if (this.isMovingLeft && this.posX <= this.gameWidth + this.width) {
      this.posX -= this.velX;
    }

    if (this.posX + this.width/1.3 <= leftGap) {
      this.posY += (this.velY*10);
    }
    if (this.posX + this.width/1.3 >= rightGap) {
      this.posY += (this.velY*10);
    }

    if (this.posY + this.height >= window.innerHeight) {
      clearInterval(interval);
    }

  }

  healthBar(){

  }

}
