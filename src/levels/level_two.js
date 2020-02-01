const Player = require("../objects/player")
const Bubble = require("../objects/bubble")
const Rectangle = require("../objects/rectangle")

function levelTwo(game) {
    this.players = [new Player({pos: [500,500], vel: [0,0]})]
    this.bubbles = [
        (new Bubble({
            pos: [300,100],
            vel: [5,5],
            radius: 80
        }))
    ]
    this.rectangles = [new Rectangle({
        pos: [0, 520],
        vel: [0,0],
        size: [1000, 2],
        game: game
    }), new Rectangle({
        pos: [300,300],
        vel: [0,0],
        size: [80, 10],
        game: game
    })];
}

module.exports = levelTwo