function Bullet(ctx, pos) {
    this.ctx = ctx;
    this.vel = [0,-10];
    this.pos = pos
}

Bullet.prototype.move = function() {
    let newPos = this.pos
    newPos[0] += this.vel[0];
    newPos[1] += this.vel[1];
    this.pos = newPos;
    return newPos;
}