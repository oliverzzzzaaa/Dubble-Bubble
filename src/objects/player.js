const Bullet = require('./bullet')

function Player(options) {
    this.pos = options.pos;
    this.vel = [0,0];
    this.bullets = [];
    this.radius = 20;
    this.color = '#6495ED'
    this.maxBullets = 1;
}

Player.prototype.move = function() {
    let newPos = this.pos;
    newPos[0] += this.vel[0];
    newPos[1] += this.vel[1];
    this.vel = [0,0];
    this.pos = newPos;
    return newPos;
}

Player.prototype.increaseVel = function(move) {
    this.vel = move;
    console.log(this.vel)
}


Player.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
        this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true 
    )
    ctx.fill();
}

Player.prototype.shoot = function() {
    if (this.bullets.length < this.maxBullets) {
        let bullet = new Bullet(this.pos);
    }
}

module.exports = Player;



