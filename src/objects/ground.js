function Ground() {
    this.color = "#696969";
    this.pos = [0, 520];
    // this.size = [1000, 2];
    this.width = 1000;
    this.height = 2;
}

Ground.prototype.draw = function(ctx) {
    console.log(this)
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height)
}

module.exports = Ground;