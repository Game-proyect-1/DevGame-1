class Player {
  constructor(ctx, gameW, gameH, keys) {
    this.ctx = ctx;

    this.gameWidth = gameW;
    this.gameHeight = gameH;

    this.width = 100;
    this.height = 100;

    this.image = new Image();
    this.image.src = "./img/7887096.jpg";
    this.image.frames = 5;
    this.image.framesIndex = 0;

    this.posX = this.gameWidth - this.width * 1.5;
    this.posY = this.gameHeight - this.height * 1.5; //pegado al suelo
    this.posY0 = this.posY;

    this.keys = keys; 

    // this.bullets = [];

    this.setListeners();
    this.velY = 2;
    this.gravity = 0.6;
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
  setListeners() {
    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case this.keys.TOP:
          if (this.posY >= this.posY0) {
            this.jump();
          }
          break;
        // case this.keys.SPACE:
        //   this.shoot();
        //   break;
      }
    });
  }

  //   shoot() {
  //     // Add new Bullet to the bullets array
  //     this.bullets.push(
  //       new Bullets(
  //         this.ctx,
  //         this.posX,
  //         this.posY,
  //         this.posY0,
  //         this.width,
  //         this.height
  //       )
  //     );
  //   }

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

  move() {
    if (this.posY < this.posY0) {
      // Está saltando
      this.posY += this.velY;
      this.velY += this.gravity; //velocidad caida y frenado paulatino
    } else {
      this.posY = this.posY0;
      this.velY = 1;
    }
  }

  jump() {
    this.posY -= 40;
    this.velY -= 8;
  } // aqui no tendría que llamar a move???
}
// generar ataque
// recibir daño, sumar vida, ¿agacharse?

// cuando se de a la Z no se mueva sino que apunte .
