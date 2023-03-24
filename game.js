const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  FPS: 60,
  framesCounter: 0,
  background: undefined,
  player: undefined,
  enemy: undefined,
  platform: undefined,
  bullets: undefined,
  //Inicio score a 0 porque si lo pongo undefined, me da NaN
  score: 0,

  keys: {
    jump: 38,
    shoot: 32,
    rigth: 39,
    left: 37,
    down: 40,
    target: 90,
  },

  init() {
    this.setContext();
    this.setDimensions();
    this.start();
  },
  setContext() {
    this.canvas = document.querySelector("#myCanvas");
    this.ctx = this.canvas.getContext("2d");
  },
  setDimensions() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.setAttribute("width", this.width);
    this.canvas.setAttribute("height", this.height);
  },

  start() {
    this.reset();

    //Aquí declaramos interval
    this.interval = setInterval(() => {
      this.framesCounter++;
      if (this.framesCounter > 5000) {
        this.framesCounter = 0;
      }

      this.clear();

      this.drawAll();
      this.checkEnemyStatus();
      this.checkPlayerStatus();
      

      // this.generateObstacles();

      // this.clearObstacles(); CI
      if (this.player.lifeTimeCount !== 0) {
        this.player.lifeTimeCount--;
      }

      if (this.isCollision()) {
        if (this.player.lives == 0) {
          this.gameOver();
        } else {
          if (this.player.lifeTimeCount == 0) {
            this.player.lives--;
            this.player.lifeTimeCount = 30;
          }
        }
      }

    }, 1000 / this.FPS);

    this.clearBullets();
  },

  reset() {
    this.background = new Background(this.ctx, this.width, this.height);

    this.player = new Player(this.ctx, this.width, this.height, this.keys);

    this.enemy = new Enemy(this.ctx, this.width, this.height);
    

    this.platform = new Platform(
      this.ctx,
      this.gameWidth,
      this.playerPosY0,
      this.playerHeight0
    );
  },

  drawAll() {
    this.background.draw();
    this.printScore();
    this.printHealth();
    this.player.draw(this.framesCounter, this.interval);
    this.enemy.draw(this.framesCounter);

    this.platform.draw();

    this.player.bullets.map((bullet, index) => {
      if (bullet.isCollision(this.enemy.posX, this.enemy.posY)) {
        this.player.bullets.splice(index, 1);
        //Con esto hacemos que reaparezca el enemy y sumamos el
        this.enemy = new Enemy(this.ctx, this.width, this.height);
        this.score += 100;
        console.log(this.score);
      }
      //colisión console.log bullet, enemy
      // if (!bullet.isCollision(this.enemy.posX, this.enemy.posY)) {
      //   bullet.draw(this.framesCounter);
      // }
      // if (this.isCollision) {
      // }
    });
    //si hago de enemy un array, iria tmb aquí con un for Each
  },

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  isCollision() {
    // colisión player y enemy
    return (this.player.posX - this.enemy.posX <= 50 
      && this.enemy.posX - this.player.posX <= 50 
      && this.player.posY - this.enemy.posY <= 50
      && this.enemy.posY - this.player.posY <= 50);
  },

  clearBullets() {
    this.player.bullets = this.player.bullets.map((bullet) => {
      if (this.isCollision) {
        let bulletCollision = this.player.bullets.indexOf(bullet);
        this.player.bullets.splice(bulletCollision, 1);
      }
    });

  },
  
  //Función de colisión entre enemy y bullet
  // isBulletCollision() {
  //   return (this.player.posX - this.enemy.posX <= 50 
  //     && this.enemy.posX - this.player.posX <= 50 
  //     && this.player.posY - this.enemy.posY <= 50
  //     && this.enemy.posY - this.player.posY <= 50);
    
  // },

  //CI
  gameOver() {
    // .clearInterval
    this.ctx.drawImage(
      this.player.imageGameOver,
      this.width / 2 - 250,
      200,
      500,
      250
    );
    clearInterval(this.interval);
  },

  checkPlayerStatus(){
    if (this.player.health <= 0) {
      this.gameOver();
    }
  },

//Funciones para el enemy
  checkEnemyStatus(){

    //Función para que el enemy muera al colisionar y vuelva a aparecer
    if (this.isCollision()) {
      this.player.health -= 50;
      console.log(this.player.health)
      
      //Para que pinte otro una vez pasado a undefined
      this.enemy = new Enemy(this.ctx, this.width, this.height);
      }

    if (this.enemy.posY + this.enemy.height >= window.innerHeight) {
      //Para que pinte otro una vez pasado a undefined
      this.enemy = new Enemy(this.ctx, this.width, this.height);
    }
  },

  printScore() {
    this.ctx.font = '30px Arial';
    this.ctx.fillText(`SCORE:`, 50, 40);
    this.ctx.fillText(`${this.score}`, 90, 80);
  },

  printHealth() {
    this.ctx.font = "30px Arial";
    this.ctx.fillText(`HEALTH:`, 200, 40);
    this.ctx.fillText(`${this.player.health}`, 230, 80);
  }
  
  }