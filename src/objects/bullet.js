function Bullet(ctx, pos) {
    this.ctx = ctx;
    this.vel = [0,-10];
    this.pos = pos;
    this.color = '#FFF0F5'
    this.width = 10;
    this.height = 100;
    this.top = 0;
}

Bullet.prototype.move = function() {
    this.height += -15;
    this.top = this.pos[1] + this.height;
}

Bullet.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height)
}

module.exports = Bullet;