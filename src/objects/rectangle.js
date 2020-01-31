function Rectangle(options) {
    this.width = options.size[0];
    this.height = options.size[1];
    this.pos = options.pos;
    this.color = '#4B0082'
}

Rectangle.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height)
    
}

module.exports = Rectangle;
