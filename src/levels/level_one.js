
const Player = require("../objects/player")
const Bubble = require("../objects/bubble")
const Rectangle = require("../objects/rectangle")

function levelOne(game) {
    this.players = [new Player({pos: [500,500], vel: [0,0], lives: 5})]
    this.bubbles = [
        (new Bubble({
            pos: [600,200],
            vel: [1,0.1],
            radius: 60,
            game: game
        }))
    ]
    this.rectangles = [];
    this.startPos = [500, 500]
}

module.exports = levelOne