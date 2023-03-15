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
    TOP: 38,
    SPACE: 32,
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

      // if (this.isCollision()) {
      //     this.gameOver();
      // }
    }, 1000 / this.FPS);
  },

  reset() {
    this.background = new Background(this.ctx, this.width, this.height);

    this.player = new Player(this.ctx, this.width, this.height, this.keys);

    // this.obstacles = [];
  },

  drawAll() {
    this.background.draw();

    this.player.draw(this.framesCounter);

    // this.obstacles.forEach(function (obs) {
    //     obs.draw();
    // })
    //si hago de enemy un array, iria tmb aquí con un for Each
  },

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },
};
// generar obstaculos
// borrar obstaculos
// colisión ,
// contador vida player, sino hay colision y el enemigo sale del ancho de la
//destructionEnemy
// podemos meter función , colisión lineas extra arriba por ejemplo
// game over (  clearInterval(this.intervalId) )
