const Player = require("../objects/player")
const Bubble = require("../objects/bubble")
const Rectangle = require("../objects/rectangle")

function levelTwo(options) {
    this.players = [new Player({pos: [500,500], vel: [0,0]})]
    // this.players = options.players
    this.startPos = [[500,500]]
    this.bubbles = [
        (new Bubble({
            pos: [300,100],
            vel: [1,0.3],
            radius: 80
        }))
    ]
    // this.rectangles = [new Rectangle({
    //     pos: [300,300],
    //     vel: [0,0],
    //     size: [80, 10]
    // }), new Rectangle({
    //     pos: [500, 100],
    //     vel: [0,0],
    //     size: [10, 200]
    // })];
    this.rectangles = [];
}

module.exports = levelTwo