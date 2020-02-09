

function Bubble(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = "#B22222";
    this.accel =  0.12;
    // this.maxVelY = this.radius / 3;
}

Bubble.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
        this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true 
    )
    ctx.fill();
}

Bubble.prototype.move = function() {
    let newPos = [0,0];
    this.vel[1] = this.vel[1] + this.accel;
    
    newPos[0] = this.pos[0] + this.vel[0];
    newPos[1] = this.pos[1] + this.vel[1];
    this.vel[1] = this.vel[1] + this.accel;
    // if (this.vel[1] > this.maxVelY) {
    //     this.vel[1] = this.maxVelY;
    // }
    this.pos = newPos;  
}


module.exports = Bubble;

