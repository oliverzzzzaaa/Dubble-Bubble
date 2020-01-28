
function Player(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.bullets = [];
}

Player.prototype.move = function(dir) {
    let newPos = this.pos;
    newPos[0] += dir[0];
    newPos[1] += dir[1];
    this.pos = newPos;
}


Player.prototype.draw = function(ctx) {
    ctx.fillStyle = "#696969";
    ctx.beginPath();
    ctx.arc(
        this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true 
    )
    ctx.fill();
}

module.exports = Player;



