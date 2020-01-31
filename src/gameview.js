function GameView(game, ctx) {
    this.ctx = ctx;
    this.game = game;
}

GameView.MOVES = {
    w: [0, -1],
    a: [-1, 0],
    s: [0, 1],
    d: [1, 0]
};

GameView.prototype.bindKeyHandlers = function bindKeyHandlers() {
    const player = this.player
    Object.keys(GameView.MOVES).forEach(function(k) {
        const move = GameView.MOVES[k];
        key(k, function () {
            player.move(move)
        })
    })
}

GameView.prototype.start = function() {
    this.bindKeyHandlers()
    this.player = this.game.addPlayer();
    console.log(this.game)
    this.game.start();
}

GameView.prototype.playRound = function() {
    let interval = setInterval(() => {
        this.game.draw(this.ctx)
    }, 10)
}

GameView.prototype.animate = function animate(time) {
    const timeDelta = time - this.lastTime;
  
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;
  
    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
};


module.exports = GameView;