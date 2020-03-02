const Bubble = require("./objects/bubble")
const Player = require('./objects/player')
const LevelReducer = require('./level_reducer')
const isCollideRectangle = require("./collision")
const floorBounce = require('./floor_bounce')
const Ground = require("./objects/ground")

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
    this.floorY = 520;
    this.ground = new Ground();
    this.playerOnelives = 5;
    this.paused = true;
    this.isOver = false;
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
            console.log(k)
        })
    });
    key("space", () => { 
        if (player.canShoot()) {
            console.log('pew');
            this.bullets.push(player.shoot(this.ctx));
        } else {
            console.log("too many")
        }
    });
    key("p", () => {
        this.paused = !this.paused
    })
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
    this.bindKeyHandlers();
    this.bubbles = this.map.bubbles;
    setTimeout(() => {
        this.paused = false}, 1000)
    requestAnimationFrame(this.animate.bind(this))
}

Game.prototype.animate = function(time) {
    if (this.isOver) {return null}
    const timeD = time - this.lastTime;
    this.drawAll();
    if (this.paused === false) {
        this.move(timeD);
        if (this.map.bubbles.length < 1) {
            this.level += 1;
            if (this.level > 5) {
                alert("Congratulations! You have won!")
                this.level = 1;
                this.playerOnelives = 5;
            }
            this.map = new (LevelReducer(this.level))
            // ({players: this.players})
            this.players = this.map.players
            // this.players.forEach(player => {
            //     player.pos = this.map.startPos
            // })
            this.bindKeyHandlers();
            this.bubbles = this.map.bubbles;
        }
    }
    requestAnimationFrame(this.animate.bind(this));
}

Game.prototype.move = function(timeD) {
    this.checkCollisions();
    this.map.players.forEach(player => {
        player.move()
        player.bullets.forEach(bullet => bullet.move())
    })
    this.map.bubbles.forEach(bubble => bubble.move());
    this.checkCollisions();
}


Game.prototype.drawAll = function() {
    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    // console.log(this.floor.prototype.draw)
    this.ground.draw(this.ctx);
    this.players.forEach(player => {
        player.bullets.forEach(bullet => bullet.draw(this.ctx))
        player.draw(this.ctx);       
    })
    this.map.bubbles.forEach(bubble => bubble.draw(this.ctx))
    this.map.rectangles.forEach(rectangle => rectangle.draw(this.ctx))
    this.drawLives(this.ctx)
    this.drawLevel(this.ctx)
    this.checkCollisions();
}

Game.prototype.shouldPop = function(bullet) {
    for (let i = 0; i < this.map.bubbles.length; i++) {
        let bubble = this.map.bubbles[i];
        if (bullet.top <= bubble.pos[1] + bubble.radius && (bullet.pos[0] > bubble.pos[0] - bubble.radius && bullet.pos[0] < bubble.pos[0] + bubble.radius)) {
            let newBubbles = [new Bubble({
                pos: bubble.pos.slice(),
                vel: [bubble.vel[0], bubble.vel[1] * 0.5],
                radius: (bubble.radius / 2)
            }), new Bubble({
                pos: bubble.pos.slice(),
                vel: [(bubble.vel[0] * -1), bubble.vel[1] * 0.5],
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
        if (bubble.pos[1] + bubble.radius >= this.floorY) {
            // bubble.vel[1] = bubble.vel[1] * -1;
            bubble.vel[1] = floorBounce(bubble)
            bubble.move()
        }
        if (bubble.pos[0] + bubble.radius >= this.DIM_X) {
            bubble.vel[0] = bubble.vel[0] * -1;
            bubble.move()
        }
        if (bubble.pos[1] - bubble.radius <= 0) {
            bubble.vel[1] = bubble.vel[1] * -1;
            bubble.move()
        }
        if (bubble.pos[0] - bubble.radius <= 0) {
            bubble.vel[0] = bubble.vel[0] * -1;
            bubble.move()
        }
        
    })

    //rectangle collisions
    // this.map.bubbles.forEach(bubble => {
    //     this.map.rectangles.forEach(rectangle => {
    //         let collision = isCollideRectangle(bubble, rectangle)
    //         if (collision) {
    //             if (collision === 'vertical') {
    //                 bubble.vel[1] = bubble.vel[1] * -1;
    //             } else if (collision === 'horizontal') {
    //                 bubble.vel[0] = bubble.vel[0] * -1;
    //             } else {
    //                 bubble.vel[0] = bubble.vel[0] * -1;
    //                 bubble.vel[1] = bubble.vel[1] * -1;
    //             }
    //         }
    //     })
    // })

    this.map.bubbles.forEach(bubble => {
        this.map.players.forEach(player => {
            let dX = Math.abs(bubble.pos[0] - player.pos[0])
            let dY = Math.abs(bubble.pos[1] - player.pos[1])
            if (dX * dX + dY * dY <= (player.radius + bubble.radius) * (player.radius + bubble.radius)) {
                this.players.forEach(player => player.clearBullet())
                this.playerOnelives -=1;
                if (this.playerOnelives > 0) {
                    this.restartLevel(player)
                } else {
                    this.isOver = true
                }
            }
        })
    })

}

Game.prototype.restartLevel = function(player) {
    this.map = new (LevelReducer(this.level))
    // ({players: this.players})
    console.log(this.map)
    // this.players.forEach(player => {
    //     player.pos = this.map.startPos
    // })
    this.players = this.map.players;
    console.log(this.players)
    // this.bindKeyHandlers();
    this.bubbles = this.map.bubbles;
    return;
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
        this.map.players[0].vel = [-5, 0] };
    if (e.key == 'd' || e.key == 'ArrowRight') { this.map.players[0].vel = [5, 0] };
}

Game.prototype.onkeyup = function(e) {
    // if (e.key == ' ' || e.key == 'Enter') {downKeys.fire = false};
    // if (e.key == 'w' || e.key == 'ArrowUp') {downKeys.up = false};
    // if (e.key == 's' || e.key == 'ArrowDown') {downKeys.down = false};
    if (e.key == 'a' || e.key == 'ArrowLeft') { this.map.players[0].vel = [0, 0] };
    if (e.key == 'd' || e.key == 'ArrowRight') { this.map.players[0].vel = [0, 0] };
}

Game.prototype.drawLives = function(ctx) {
    ctx.font = "24px Arial";
    ctx.fillText(`Lives remaining: `, 50, 550)
    ctx.fillStyle = '#6495ED';
    for (let i = 0; i < this.playerOnelives; i++) {
        ctx.beginPath();
        ctx.arc(
            (50 + (i * 20)), 600, 10, 0, 2 * Math.PI, true 
        )
        ctx.fill();
    }
    
}

Game.prototype.drawLevel = function(ctx) {
    ctx.font = "24px Arial";
    let level = `Level: ${this.level}`
    ctx.fillText(level, 500, 550)
}


// // hasListener = true;

module.exports = Game;


//webpack --watch --mode=development