const Bubble = require("./objects/bubble")
const Player = require('./objects/player')
const LevelReducer = require('./level_reducer')

function Game(ctx, width, height) {
    this.bubbles = [];
    this.bullets = [];
    this.players = [];
    this.level = 2;
    this.rectangles = [];
    this.map = LevelReducer(this.level);
    this.DIM_X = width;
    this.DIM_Y = height;
    this.BG_COLOR = "#FFFFF";
    this.ctx = ctx
}

Game.MOVES = {
    w: [0, -15],
    a: [-15, 0],
    s: [0, 15],
    d: [15, 0]
};


Game.prototype.bindKeyHandlers = function() {
    const player = this.players[0]
    Object.keys(Game.MOVES).forEach(function(k) {
        const move = Game.MOVES[k];
        key(k, function () {
            player.increaseVel(move)
        })
    });
    // key("space", function () { player.shoot(); });
}

Game.prototype.addBubble = function(options) {
    let newBubble = new Bubble(options);
    this.bubbles.push(newBubble)
}

Game.prototype.draw = function() {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.beginPath();
    ctx.rect(20, 20, 150, 100);
    this.ctx.strokeStyle = 'purple';
    ctx.stroke();
    this.bubbles.forEach(function(bubble) {
      bubble.draw(ctx);
    });
    this.players.forEach(function(player) {
        player.draw(ctx)
    })
    this.bullets.forEach(bullet => bullet.draw(ctx))
};

Game.prototype.move = function() {
    this.bubbles.move()
}

Game.prototype.addPlayer = function() {
    let player1 = new Player({
        pos: [500,500],
        vel: [0,0]
    })
    this.players.push(player1)
    return this.players[0];
}

Game.prototype.moveObjects = function(delta) {
    const allMovingObj = [];
    allMovingObj = allMovingObj.concat(this.bubbles, this.bullets, this.players)
    allMovingObj.forEach(obj => obj.move(this.ctx))
  };

Game.prototype.step = function(delta) {
    this.moveObjects(delta);
    // this.checkCollisions();
  };

Game.prototype.start = function() {
    this.lastTime = 0;
    this.map = new (LevelReducer(this.level))
    this.players = this.map.players;
    this.bindKeyHandlers();
    this.bubbles = this.map.bubbles;
    // this.ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
    requestAnimationFrame(this.animate.bind(this))
}

Game.prototype.animate = function(time) {
    const timeD = time - this.lastTime;
    this.move(timeD);
    this.drawAll();
    requestAnimationFrame(this.animate.bind(this));
}

Game.prototype.move = function(timeD) {
    this.players.forEach(player => {
        player.move()
    })
    this.bubbles.forEach(bubble => bubble.move())
    this.bullets.forEach(bullet => bullet.move())
}


Game.prototype.drawAll = function() {
    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.map.players.forEach(player => {
        player.draw(this.ctx);       
    })
    this.map.bubbles.forEach(bubble => bubble.draw(this.ctx))
    this.map.rectangles.forEach(rectangle => rectangle.draw(this.ctx))
    this.checkCollisions();
}

Game.prototype.checkCollisions = function() {
    // this.bullets.forEach(bullet => {
    //     this.bubbles.forEach(bubble => {

    //     })
    // })
}

module.exports = Game;
  