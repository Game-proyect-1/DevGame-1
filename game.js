const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  FPS: 60,
  framesCounter: 0,
  background: undefined,
  player: undefined,
  enemy: undefined, // si luego queremos más aleatoriosdebería ser un array?
  platforms: [],

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
    this.setDimensions(); //responsive
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

    this.interval = setInterval(() => {
      // lo puedo poner tmb en cada js haciendo init en cada uno para poder gestionar el tiempo individualmente?

      this.framesCounter++;
      if (this.framesCounter > 5000) {
        this.framesCounter = 0;
      }

      this.clear();

      this.drawAll();

      // this.generateObstacles();

      // this.clearObstacles();
      console.log(
        "enemyPosX:" + this.enemy.posX + ", playerPosX:" + this.player.posX
      );
      console.log(
        "enemyPosY:" + this.enemy.posY + ", playerPosY:" + this.player.posY
      );
      if (this.isCollision()) {
        this.gameOver();
      }
    }, 1000 / this.FPS);
  },

  reset() {
    this.background = new Background(this.ctx, this.width, this.height);

    this.player = new Player(this.ctx, this.width, this.height, this.keys);

    this.enemy = new Enemy(this.ctx, this.width, this.height);

    // this.platform = new Platform(this.ctx, this.gameWidth, this.playerPosY0, this.playerHeight0);
  },

  drawAll() {
    this.background.draw();

    this.player.draw(this.framesCounter);
    this.enemy.draw(this.framesCounter);

    // this.platform.draw();

    // this.obstacles.forEach(function (obs) {
    //     obs.draw();
    // })
    //si hago de enemy un array, iria tmb aquí con un for Each
  },

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  isCollision() {
    return (
      this.player.posX - this.enemy.posX <= 50 &&
      this.enemy.posX - this.player.posX <= 50 &&
      this.player.posY >= this.enemy.posY
    );
    // recuerda que el sprite es la imagen más un espacio en blanco alrededor, por eso hay que cuadrar para que el choque sea perfecto y no se quede a unos pixeles
  },

  gameOver() {
    // .clearInterval
    clearInterval(this.interval);
  },
};

// generar obstaculos
// borrar obstaculos
// colisión ,
// contador vida player, sino hay colision y el enemigo sale del ancho de la
//destructionEnemy
// podemos meter función , colisión lineas extra arriba por ejemplo
// game over (  clearInterval(this.intervalId) )
