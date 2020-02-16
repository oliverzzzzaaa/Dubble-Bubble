
const Player = require("../objects/player")
const Bubble = require("../objects/bubble")
const Rectangle = require("../objects/rectangle")

function levelFour(game) {
    this.players = [new Player({pos: [500,500], vel: [0,0], lives: 5})]
    this.bubbles = [
        (new Bubble({
            pos: [600,100],
            vel: [-1,0.1],
            radius: 60,
        })), new Bubble({
            pos: [200, 100],
            vel: [1,0.1],
            radius: 60,
        })
    ]
    this.rectangles = [];
    this.startPos = [300, 500]
}  

module.exports = levelFour;