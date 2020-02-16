const levelOne = require("./levels/level_one")
const levelTwo = require("./levels/level_two")
const levelThree = require("./levels/level_three");
const levelFour = require("./levels/level_four");
const levelFive = require("./levels/level_five");

function LevelReducer(level) {
    switch (level) {
        case 1:
            return levelOne;
        case 2:
            return levelTwo;
        case 3: 
            return levelThree;
        case 4:
            return levelFour;
        case 5:
            return levelFive;
        default:
            levelOne;
    }
}

module.exports = LevelReducer;