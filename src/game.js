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

Game.prototype.addBubble = function(options) {
    let newBubble = new Bubble(options);
    this.bubbles.push(newBubble)
}

Game.prototype.draw = function() {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.beginPath();
    ctx.rect(20, 20, 150, 100);
    this.ctx.strokeStyle = 'purple';
    ctx.stroke();
    this.bubbles.forEach(function(bubble) {
      bubble.draw(ctx);
    });
    this.players.forEach(function(player) {
        player.draw(ctx)
        player.bullets.forEach(bullet => bullet.draw(ctx))
    })
};

Game.prototype.move = function() {
    this.bubbles.move()
}

Game.prototype.addPlayer = function() {
    let player1 = new Player({
        pos: [500,500],
        vel: [0,0]
    })
    this.players.push(player1)
    return this.players[0];
}

// Game.prototype.moveObjects = function(delta) {
//     const allMovingObj = [];
//     allMovingObj = allMovingObj.concat(this.bubbles, this.bullets, this.players)
//     allMovingObj.forEach(obj => obj.move(this.ctx))
//   };

Game.prototype.step = function(delta) {
    this.moveObjects(delta);
    // this.checkCollisions();
  };

Game.prototype.start = function() {
    this.lastTime = 0;
    this.map = new (LevelReducer(this.level))
    this.players = this.map.players;
    this.bindKeyHandlers();
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
    // this.bullets.forEach(bullet => bullet.move());
}


Game.prototype.drawAll = function() {
    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.players.forEach(player => {
        player.draw(this.ctx);       
        player.bullets.forEach(bullet => bullet.draw(this.ctx))
    })
    console.log(this.map)
    this.map.bubbles.forEach(bubble => bubble.draw(this.ctx))
    this.map.rectangles.forEach(rectangle => rectangle.draw(this.ctx))
    // this.bullets.forEach(bullet => bullet.draw(this.ctx))
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

}



// function onkeydown(e) {
//         // if (e.key == ' ' || e.key == 'Enter') { downKeys.fire = true };
//         // if (e.key == 'w' || e.key == 'ArrowUp') { downKeys.up = true };
//         // if (e.key == 's' || e.key == 'ArrowDown') { downKeys.down = true };
//         if (e.key == 'a' || e.key == 'ArrowLeft') { this.map.players[0].vel = [-10, 0] };
//         if (e.key == 'd' || e.key == 'ArrowRight') { this.map.players[0].vel = [10, 0] };
// };
// function onkeyup(e){
//     // if (e.key == ' ' || e.key == 'Enter') {downKeys.fire = false};
//     // if (e.key == 'w' || e.key == 'ArrowUp') {downKeys.up = false};
//     // if (e.key == 's' || e.key == 'ArrowDown') {downKeys.down = false};
//     if (e.key == 'a' || e.key == 'ArrowLeft') { this.map.players[0].vel = [0, 0] };
//     if (e.key == 'd' || e.key == 'ArrowRight') { this.map.players[0].vel = [0, 0] };
// };

// document.addEventListener('keydown', onkeydown);
// document.addEventListener('keyup', onkeyup);
// // hasListener = true;

module.exports = Game;



// "Bullet has static X, once bubble passes through the X"
// "If bullet.top <= bubble.pos[1] + radius"
// if (bullet.top <= bubble.pos[1] + radius && (bullet.pos[0] > bubble.pos[0] - radius && bullet.pos[0] < bubble.pos[0] + radius))

// bullet.top <= bubble.pos[1] + bubble.radius && (bullet.pos[0] > bubble.pos[0] - bubble.radius && bullet.pos[0] < bubble.pos[0] + bubble.radius)
// rectangle.pos <=
// rectangle.pos <= bubble.pos[1] + bubble.radius && 