const Game = require('./game')
const GameView = require("./gameview")

document.addEventListener("DOMContentLoaded", e => {
    let canvas = document.getElementById("game-canvas")
    canvas.width = 1000;
    // canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 700;
    // canvas.height = canvas.parentElement.clientHeight;
    // console.log(canvas.parentElement.clientWidth)
    // console.log(canvas.parentElement.clientHeight)
    const ctx = canvas.getContext('2d');
    let game = new Game(ctx, canvas.width, canvas.height);
    // let a = new GameView(game, ctx)
    // while (true) {
    game.start();
    // }
    let intervalId = setInterval(() => {
        if (game.isOver) {
            alert("You lose!")
            game = new Game(ctx, canvas.width, canvas.height);
            game.start();
        }
    }, 2000)
})