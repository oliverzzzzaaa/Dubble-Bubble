const levelOne = require("./levels/level_one")
const levelTwo = require("./levels/level_two")
const levelThree = require("./levels/level_three");

function LevelReducer(level) {
    switch (level) {
        case 1:
            return levelOne;
        case 2:
            return levelTwo;
        case 3: 
            return levelThree;
        default:
            levelOne;
    }
}

module.exports = LevelReducer;