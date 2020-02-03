
const Player = require("../objects/player")
const Bubble = require("../objects/bubble")
const Rectangle = require("../objects/rectangle")

function levelOne(game) {
    this.players = [new Player({pos: [500,500], vel: [0,0]})]
    this.bubbles = [
        (new Bubble({
            pos: [600,200],
            vel: [2,2],
            radius: 50,
            game: game
        }))
    ]
    this.rectangles = [new Rectangle({
        pos: [0, 520],
        vel: [0,0],
        size: [1000, 2],
        game: game
    })];
}

module.exports = levelOne