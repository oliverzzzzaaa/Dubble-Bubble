const Bubble = require("./bubble")
const Player = require('./player')

function Game() {
    this.bubbles = [];
    this.bullets = [];
    this.players = [];
    const DIM_X = 900;
    const DIM_Y = 600;
    const BG_COLOR = "#FFFFF";
}

Game.prototype.addBubble = function(options) {
    let newBubble = new Bubble(options);
    this.bubbles.push(newBubble)
}

Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    console.log(this.player)
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
    return this.player;
}

module.exports = Game;
  