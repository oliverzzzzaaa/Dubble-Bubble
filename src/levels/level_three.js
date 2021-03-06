const Player = require("../objects/player")
const Bubble = require("../objects/bubble")
const Rectangle = require("../objects/rectangle")

function levelThree(game) {
    this.players = [new Player({pos: [500,500], vel: [0,0]})]
    this.bubbles = [
        (new Bubble({
            pos: [500,100],
            vel: [1,0.3],
            radius: 40,
        })), new Bubble({
            pos: [500, 200],
            vel: [1,0.3],
            radius: 40,
        })
    ]
    // this.rectangles = [ new Rectangle({
    //     pos: [300,300],
    //     vel: [0,0],
    //     size: [80, 10],
    //     game: game
    // })];
    // this.rectangles = [new Rectangle({
    //     pos: [300,300],
    //     vel: [0,0],
    //     size: [80, 10],
    //     game: game
    // })];
    this.rectangles = [];
}

module.exports = levelThree