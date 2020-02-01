const Bubble = require("./objects/bubble")
const Player = require('./objects/player')
const LevelReducer = require('./level_reducer')
const isCollideRectangle = require("./collision")

function Game(ctx, width, height) {
    this.bubbles = [];
    this.bullets = [];
    this.players = [];
    this.level = 1;
    this.rectangles = [];
    this.map = LevelReducer(this.level);
    this.DIM_X = width;
    this.DIM_Y = height;
    this.BG_COLOR = "#FFFFF";
    this.ctx = ctx;
    this.floor = 520;
}

Game.MOVES = {
    w: [0, -15],
    a: [-15, 0],
    s: [0, 15],
    d: [15, 0]
};


Game.prototype.bindKeyHandlers = function() {
    const player = this.players[0]
    Object.keys(Game.MOVES).forEach(function(k) {
        const move = Game.MOVES[k];
        key(k, function () {
            player.increaseVel(move)
        })
    });
    key("space", () => { 
        if (player.canShoot()) {
            console.log('pew');
            this.bullets.push(player.shoot(this.ctx));
        } else {
            console.log("too many")
            console.log(player.bullets)
        }
    });
}

Game.prototype.move = function() {
    this.bubbles.move()
}


Game.prototype.start = function() {
    document.addEventListener('keydown', this.onkeydown.bind(this));
    document.addEventListener('keyup', this.onkeyup.bind(this));
    this.lastTime = 0;
    this.map = new (LevelReducer(this.level))
    this.players = this.map.players;
    // this.bindKeyHandlers();
    this.bubbles = this.map.bubbles;
    requestAnimationFrame(this.animate.bind(this))
}

Game.prototype.animate = function(time) {
    const timeD = time - this.lastTime;
    this.move(timeD);
    this.drawAll();
    if (this.map.bubbles.length < 1) {
        console.log("DONE")
        this.level += 1;
        this.map = new (LevelReducer(this.level))
        this.players = this.map.players;
        this.bindKeyHandlers();
        this.bubbles = this.map.bubbles;
    }
    requestAnimationFrame(this.animate.bind(this));
}

Game.prototype.move = function(timeD) {
    this.map.players.forEach(player => {
        player.move()
        player.bullets.forEach(bullet => bullet.move())
    })
    this.map.bubbles.forEach(bubble => bubble.move());
}


Game.prototype.drawAll = function() {
    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.players.forEach(player => {
        player.draw(this.ctx);       
        player.bullets.forEach(bullet => bullet.draw(this.ctx))
    })
    this.map.bubbles.forEach(bubble => bubble.draw(this.ctx))
    this.map.rectangles.forEach(rectangle => rectangle.draw(this.ctx))
    this.checkCollisions();
}

Game.prototype.shouldPop = function(bullet) {
    for (let i = 0; i < this.map.bubbles.length; i++) {
        let bubble = this.map.bubbles[i];
        if (bullet.top <= bubble.pos[1] + bubble.radius && (bullet.pos[0] > bubble.pos[0] - bubble.radius && bullet.pos[0] < bubble.pos[0] + bubble.radius)) {
            let newBubbles = [new Bubble({
                pos: bubble.pos.slice(),
                vel: bubble.vel,
                radius: (bubble.radius / 2)
            }), new Bubble({
                pos: bubble.pos.slice(),
                vel: [(bubble.vel[0] * -1), bubble.vel[1]],
                radius: (bubble.radius / 2)
            })]
            //two new bubbles in opposite X directions, half radius
            if (bubble.radius > 10) {
                this.map.bubbles = this.map.bubbles.concat(newBubbles)
            }
                this.map.bubbles.splice(i, 1);
            return true
        }
    }
}

Game.prototype.checkCollisions = function() {

    //clearing bullets at top
    this.map.players.forEach(player => {
        let i = 0;
        while (i < player.bullets.length) {
            if (player.bullets[i].top < 0) {
                player.clearBullet()
            } else if (this.shouldPop(player.bullets[i])) {
                player.clearBullet()
                i++;  
            } else {
                i++;
            }
        }

    })
    //bubbles bouncing
    this.map.bubbles.forEach(bubble => {
        if (bubble.pos[1] + bubble.radius >= this.floor) {
            bubble.vel[1] = bubble.vel[1] * -1;
        }
        if (bubble.pos[0] + bubble.radius >= this.DIM_X) {
            bubble.vel[0] = bubble.vel[0] * -1;
        }
        if (bubble.pos[1] - bubble.radius <= 0) {
            bubble.vel[1] = bubble.vel[1] * -1;
        }
        if (bubble.pos[0] - bubble.radius <= 0) {
            bubble.vel[0] = bubble.vel[0] * -1;
        }
        
    })

    // this.map.bubbles.forEach(bubble => {
    //     this.map.rectangles.forEach(rectangle => {
    //         isCollideRectangle(bubble, rectangle)
    //     })
    // })

    this.map.bubbles.forEach(bubble => {
        this.map.players.forEach(player => {
            let dX = Math.abs(bubble.pos[0] - player.pos[0])
            let dY = Math.abs(bubble.pos[1] - player.pos[1])
            if (dX * dX + dY * dY <= (player.radius + bubble.radius) * (player.radius + bubble.radius)) {
                alert("You lose!")
            }
        })
    })

}

Game.prototype.onkeydown = function(e) {
    if (e.key == ' ' || e.key == 'Enter') { 
        let player = this.map.players[0];
        if (player.canShoot()) {
            this.bullets.push(player.shoot(this.ctx));
        } else {
            console.log("too many")
            console.log(player.bullets)
        }
     };
    // if (e.key == 'w' || e.key == 'ArrowUp') { downKeys.up = true };
    // if (e.key == 's' || e.key == 'ArrowDown') { downKeys.down = true };
    if (e.key == 'a' || e.key == 'ArrowLeft') { 
        this.map.players[0].vel = [-10, 0] };
    if (e.key == 'd' || e.key == 'ArrowRight') { this.map.players[0].vel = [10, 0] };
}

Game.prototype.onkeyup = function(e) {
    // if (e.key == ' ' || e.key == 'Enter') {downKeys.fire = false};
    // if (e.key == 'w' || e.key == 'ArrowUp') {downKeys.up = false};
    // if (e.key == 's' || e.key == 'ArrowDown') {downKeys.down = false};
    if (e.key == 'a' || e.key == 'ArrowLeft') { this.map.players[0].vel = [0, 0] };
    if (e.key == 'd' || e.key == 'ArrowRight') { this.map.players[0].vel = [0, 0] };
}


// // hasListener = true;

module.exports = Game;
