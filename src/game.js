const Bubble = require("./objects/bubble")
const Player = require('./objects/player')
const LevelReducer = require('./level_reducer')

function Game(ctx) {
    this.bubbles = [];
    this.bullets = [];
    this.players = [];
    this.level = 1;
    this.rectangles = [];
    this.map = LevelReducer(this.level);
    const DIM_X = 900;
    const DIM_Y = 600;
    const BG_COLOR = "#FFFFF";
    this.ctx = ctx
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
    console.log('purple')
    this.bubbles.forEach(function(bubble) {
      bubble.draw(ctx);
    });
    this.players.forEach(function(player) {
        player.draw(ctx)
    })
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
    this.map = new (LevelReducer(this.level))
    this.ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
    this.map.players.forEach(player => {
        player.draw(this.ctx);       
    })
    this.map.bubbles.forEach(bubble => bubble.draw(this.ctx))
    this.map.rectangles.forEach(rectangle => rectangle.draw(this.ctx))
    console.log('done')
}

module.exports = Game;
  