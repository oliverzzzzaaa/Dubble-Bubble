

function floorBounce(bubble) {
    if (bubble.radius >= 60) {
        return -11;
    } else if (bubble.radius >= 30) {
        return -10;
    } else if (bubble.radius >= 15) {
        return -9;
    } else if (bubble.radius >= 7) {
        return -7;
    }
}

module.exports = floorBounce;