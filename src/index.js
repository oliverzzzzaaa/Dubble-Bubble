const Game = require('./game')
const GameView = require("./gameview")

document.addEventListener("DOMContentLoaded", e => {
    let canvas = document.getElementById("game-canvas")
    const ctx = canvas.getContext('2d');
    const game = new Game();
    new GameView(game, ctx).start(game);
})