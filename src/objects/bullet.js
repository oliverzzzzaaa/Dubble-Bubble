function Bullet(ctx, pos) {
    this.ctx = ctx;
    this.vel = [0,-2];
    this.pos = [pos[0], pos[1]+20];
    this.color = '#FFF0F5'
    this.width = 1;
    this.height = -100;
    this.top = this.pos;
}

Bullet.prototype.move = function() {
    this.height += -8;
    this.top = this.pos[1] + this.height;
}

Bullet.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height)
}

module.exports = Bullet;