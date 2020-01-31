const levelOne = require("./levels/level_one")

function LevelReducer(level) {
    switch (level) {
        case 1:
            return levelOne;
        default:
            levelOne;
    }
}

module.exports = LevelReducer;