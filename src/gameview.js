function GameView(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.player = this.game.addPlayer();
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
    console.log("started")
    console.log(this.player)
    let interval = setInterval(() => {
        this.game.draw(this.ctx)
    }, 10)

}


module.exports = GameView;