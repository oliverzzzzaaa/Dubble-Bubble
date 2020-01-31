
function Player(options) {
    this.pos = options.pos;
    this.vel = [0,0];
    this.bullets = [];
    this.radius = 20;
    this.color = '#6495ED'
}

Player.prototype.move = function(dir) {
    let newPos = this.pos;
    newPos[0] += dir[0];
    newPos[1] += dir[1];
    this.vel = [0,0];
    this.pos = newPos;
    return newPos;
}

Player.prototype.increaseVel = function(move) {
    this.vel = move;
}


Player.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    console.log(this)
    ctx.arc(
        this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true 
    )
    ctx.fill();
}

module.exports = Player;



