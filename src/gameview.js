function GameView(game, ctx) {
    this.ctx = ctx;
    this.game = game;
}

GameView.MOVES = {
    w: [0, -10],
    a: [-10, 0],
    s: [0, 10],
    d: [10, 0]
};

GameView.prototype.bindKeyHandlers = function bindKeyHandlers() {
    const player = this.game.players[0]
    console.log(this.game)
    Object.keys(GameView.MOVES).forEach(function(k) {
        const move = GameView.MOVES[k];
        key(k, function () {
            player.increaseVel(move)
        })
    });
    key("space", function () { ship.fireBullet(); });
}

GameView.prototype.start = function() {
    this.player = this.game.addPlayer();
    this.bindKeyHandlers()
    this.game.start();
    
}

// GameView.prototype.playRound = function() {
//     let interval = setInterval(() => {
//         this.game.draw(this.ctx)
//     }, 10)
// }

// GameView.prototype.animate = function animate(time) {
//     const timeDelta = time - this.lastTime;
  
//     this.game.step(timeDelta);
//     this.game.draw(this.ctx);
//     this.lastTime = time;
  
//     // every call to animate requests causes another call to animate
//     requestAnimationFrame(this.animate.bind(this));
// };


module.exports = GameView;