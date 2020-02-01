/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/collision.js":
/*!**************************!*\
  !*** ./src/collision.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\nfunction iscollideRectangle(bubble, rectangle) {\n    let dX = Math.abs(bubble.pos[0] - (rectangle.pos[0] - rectangle.width / 2));\n    let dY = Math.abs(bubble.pos[1] - (rectangle.pos[1] - rectangle.height / 2));\n    if (dX <= (rectangle.width / 2)) {\n        bubble.vel[0] = bubble.vel[0] * -1;\n    }\n    if (dY <= (rectangle.height / 2)) {\n        bubble.vel[1] = bubble.vel[1] * -1;\n    }\n    let cornerX = dX + (rectangle.width / 2);\n    let cornerY = dY + (rectangle.height / 2);\n    if (cornerX * cornerX + cornerY + cornerY <= bubble.radius * bubble.radius) {\n        bubble.vel[1] = bubble.vel[1] * -1;\n        bubble.vel[0] = bubble.vel[0] * -1;\n    }\n\n}\n\n    // var distX = Math.abs(circle.x - rect.x-rect.w/2);\n    // var distY = Math.abs(circle.y - rect.y-rect.h/2);\n\n    // if (distX > (rect.w/2 + circle.r)) { return false; }\n    // if (distY > (rect.h/2 + circle.r)) { return false; }\n\n    // if (distX <= (rect.w/2)) { return true; } \n    // if (distY <= (rect.h/2)) { return true; }\n\n\n\nmodule.exports = iscollideRectangle\n\n//# sourceURL=webpack:///./src/collision.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Bubble = __webpack_require__(/*! ./objects/bubble */ \"./src/objects/bubble.js\")\nconst Player = __webpack_require__(/*! ./objects/player */ \"./src/objects/player.js\")\nconst LevelReducer = __webpack_require__(/*! ./level_reducer */ \"./src/level_reducer.js\")\nconst isCollideRectangle = __webpack_require__(/*! ./collision */ \"./src/collision.js\")\n\nfunction Game(ctx, width, height) {\n    this.bubbles = [];\n    this.bullets = [];\n    this.players = [];\n    this.level = 1;\n    this.rectangles = [];\n    this.map = LevelReducer(this.level);\n    this.DIM_X = width;\n    this.DIM_Y = height;\n    this.BG_COLOR = \"#FFFFF\";\n    this.ctx = ctx;\n    this.floor = 520;\n}\n\nGame.MOVES = {\n    w: [0, -15],\n    a: [-15, 0],\n    s: [0, 15],\n    d: [15, 0]\n};\n\n\nGame.prototype.bindKeyHandlers = function() {\n    const player = this.players[0]\n    Object.keys(Game.MOVES).forEach(function(k) {\n        const move = Game.MOVES[k];\n        key(k, function () {\n            player.increaseVel(move)\n        })\n    });\n    key(\"space\", () => { \n        if (player.canShoot()) {\n            console.log('pew');\n            this.bullets.push(player.shoot(this.ctx));\n        } else {\n            console.log(\"too many\")\n            console.log(player.bullets)\n        }\n    });\n}\n\nGame.prototype.addBubble = function(options) {\n    let newBubble = new Bubble(options);\n    this.bubbles.push(newBubble)\n}\n\nGame.prototype.draw = function() {\n    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n    ctx.fillStyle = Game.BG_COLOR;\n    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n    ctx.beginPath();\n    ctx.rect(20, 20, 150, 100);\n    this.ctx.strokeStyle = 'purple';\n    ctx.stroke();\n    this.bubbles.forEach(function(bubble) {\n      bubble.draw(ctx);\n    });\n    this.players.forEach(function(player) {\n        player.draw(ctx)\n        player.bullets.forEach(bullet => bullet.draw(ctx))\n    })\n};\n\nGame.prototype.move = function() {\n    this.bubbles.move()\n}\n\nGame.prototype.addPlayer = function() {\n    let player1 = new Player({\n        pos: [500,500],\n        vel: [0,0]\n    })\n    this.players.push(player1)\n    return this.players[0];\n}\n\n// Game.prototype.moveObjects = function(delta) {\n//     const allMovingObj = [];\n//     allMovingObj = allMovingObj.concat(this.bubbles, this.bullets, this.players)\n//     allMovingObj.forEach(obj => obj.move(this.ctx))\n//   };\n\nGame.prototype.step = function(delta) {\n    this.moveObjects(delta);\n    // this.checkCollisions();\n  };\n\nGame.prototype.start = function() {\n    this.lastTime = 0;\n    this.map = new (LevelReducer(this.level))\n    this.players = this.map.players;\n    this.bindKeyHandlers();\n    this.bubbles = this.map.bubbles;\n    requestAnimationFrame(this.animate.bind(this))\n}\n\nGame.prototype.animate = function(time) {\n    const timeD = time - this.lastTime;\n    this.move(timeD);\n    this.drawAll();\n    if (this.map.bubbles.length < 1) {\n        console.log(\"DONE\")\n        this.level += 1;\n        this.map = new (LevelReducer(this.level))\n        this.players = this.map.players;\n        this.bindKeyHandlers();\n        this.bubbles = this.map.bubbles;\n    }\n    requestAnimationFrame(this.animate.bind(this));\n}\n\nGame.prototype.move = function(timeD) {\n    this.map.players.forEach(player => {\n        player.move()\n        player.bullets.forEach(bullet => bullet.move())\n    })\n    this.map.bubbles.forEach(bubble => bubble.move());\n    // this.bullets.forEach(bullet => bullet.move());\n}\n\n\nGame.prototype.drawAll = function() {\n    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);\n    this.players.forEach(player => {\n        player.draw(this.ctx);       \n        player.bullets.forEach(bullet => bullet.draw(this.ctx))\n    })\n    console.log(this.map)\n    this.map.bubbles.forEach(bubble => bubble.draw(this.ctx))\n    this.map.rectangles.forEach(rectangle => rectangle.draw(this.ctx))\n    // this.bullets.forEach(bullet => bullet.draw(this.ctx))\n    this.checkCollisions();\n}\n\nGame.prototype.shouldPop = function(bullet) {\n    for (let i = 0; i < this.map.bubbles.length; i++) {\n        let bubble = this.map.bubbles[i];\n        if (bullet.top <= bubble.pos[1] + bubble.radius && (bullet.pos[0] > bubble.pos[0] - bubble.radius && bullet.pos[0] < bubble.pos[0] + bubble.radius)) {\n            let newBubbles = [new Bubble({\n                pos: bubble.pos.slice(),\n                vel: bubble.vel,\n                radius: (bubble.radius / 2)\n            }), new Bubble({\n                pos: bubble.pos.slice(),\n                vel: [(bubble.vel[0] * -1), bubble.vel[1]],\n                radius: (bubble.radius / 2)\n            })]\n            //two new bubbles in opposite X directions, half radius\n            if (bubble.radius > 10) {\n                this.map.bubbles = this.map.bubbles.concat(newBubbles)\n            }\n                this.map.bubbles.splice(i, 1);\n            return true\n        }\n    }\n}\n\nGame.prototype.checkCollisions = function() {\n\n    //clearing bullets at top\n    this.map.players.forEach(player => {\n        let i = 0;\n        while (i < player.bullets.length) {\n            if (player.bullets[i].top < 0) {\n                player.clearBullet()\n            } else if (this.shouldPop(player.bullets[i])) {\n                player.clearBullet()\n                i++;  \n            } else {\n                i++;\n            }\n        }\n\n    })\n    //bubbles bouncing\n    this.map.bubbles.forEach(bubble => {\n        if (bubble.pos[1] + bubble.radius >= this.floor) {\n            bubble.vel[1] = bubble.vel[1] * -1;\n        }\n        if (bubble.pos[0] + bubble.radius >= this.DIM_X) {\n            bubble.vel[0] = bubble.vel[0] * -1;\n        }\n        if (bubble.pos[1] - bubble.radius <= 0) {\n            bubble.vel[1] = bubble.vel[1] * -1;\n        }\n        if (bubble.pos[0] - bubble.radius <= 0) {\n            bubble.vel[0] = bubble.vel[0] * -1;\n        }\n        \n    })\n\n    // this.map.bubbles.forEach(bubble => {\n    //     this.map.rectangles.forEach(rectangle => {\n    //         isCollideRectangle(bubble, rectangle)\n    //     })\n    // })\n\n}\n\n\n\n// function onkeydown(e) {\n//         // if (e.key == ' ' || e.key == 'Enter') { downKeys.fire = true };\n//         // if (e.key == 'w' || e.key == 'ArrowUp') { downKeys.up = true };\n//         // if (e.key == 's' || e.key == 'ArrowDown') { downKeys.down = true };\n//         if (e.key == 'a' || e.key == 'ArrowLeft') { this.map.players[0].vel = [-10, 0] };\n//         if (e.key == 'd' || e.key == 'ArrowRight') { this.map.players[0].vel = [10, 0] };\n// };\n// function onkeyup(e){\n//     // if (e.key == ' ' || e.key == 'Enter') {downKeys.fire = false};\n//     // if (e.key == 'w' || e.key == 'ArrowUp') {downKeys.up = false};\n//     // if (e.key == 's' || e.key == 'ArrowDown') {downKeys.down = false};\n//     if (e.key == 'a' || e.key == 'ArrowLeft') { this.map.players[0].vel = [0, 0] };\n//     if (e.key == 'd' || e.key == 'ArrowRight') { this.map.players[0].vel = [0, 0] };\n// };\n\n// document.addEventListener('keydown', onkeydown);\n// document.addEventListener('keyup', onkeyup);\n// // hasListener = true;\n\nmodule.exports = Game;\n\n\n\n// \"Bullet has static X, once bubble passes through the X\"\n// \"If bullet.top <= bubble.pos[1] + radius\"\n// if (bullet.top <= bubble.pos[1] + radius && (bullet.pos[0] > bubble.pos[0] - radius && bullet.pos[0] < bubble.pos[0] + radius))\n\n// bullet.top <= bubble.pos[1] + bubble.radius && (bullet.pos[0] > bubble.pos[0] - bubble.radius && bullet.pos[0] < bubble.pos[0] + bubble.radius)\n// rectangle.pos <=\n// rectangle.pos <= bubble.pos[1] + bubble.radius && \n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/gameview.js":
/*!*************************!*\
  !*** ./src/gameview.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function GameView(game, ctx) {\n    this.ctx = ctx;\n    this.game = game;\n}\n\nGameView.MOVES = {\n    w: [0, -10],\n    a: [-10, 0],\n    s: [0, 10],\n    d: [10, 0]\n};\n\nGameView.prototype.bindKeyHandlers = function bindKeyHandlers() {\n    const player = this.game.players[0]\n    console.log(this.game)\n    Object.keys(GameView.MOVES).forEach(function(k) {\n        const move = GameView.MOVES[k];\n        key(k, function () {\n            player.increaseVel(move)\n        })\n    });\n    key(\"space\", function () { ship.fireBullet(); });\n}\n\nGameView.prototype.start = function() {\n    this.player = this.game.addPlayer();\n    this.bindKeyHandlers()\n    this.game.start();\n    \n}\n\n// GameView.prototype.playRound = function() {\n//     let interval = setInterval(() => {\n//         this.game.draw(this.ctx)\n//     }, 10)\n// }\n\n// GameView.prototype.animate = function animate(time) {\n//     const timeDelta = time - this.lastTime;\n  \n//     this.game.step(timeDelta);\n//     this.game.draw(this.ctx);\n//     this.lastTime = time;\n  \n//     // every call to animate requests causes another call to animate\n//     requestAnimationFrame(this.animate.bind(this));\n// };\n\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/gameview.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\")\nconst GameView = __webpack_require__(/*! ./gameview */ \"./src/gameview.js\")\n\ndocument.addEventListener(\"DOMContentLoaded\", e => {\n    let canvas = document.getElementById(\"game-canvas\")\n    canvas.width = 1000;\n    // canvas.width = canvas.parentElement.clientWidth;\n    canvas.height = 700;\n    // canvas.height = canvas.parentElement.clientHeight;\n    // console.log(canvas.parentElement.clientWidth)\n    // console.log(canvas.parentElement.clientHeight)\n    const ctx = canvas.getContext('2d');\n    const game = new Game(ctx, canvas.width, canvas.height);\n    // let a = new GameView(game, ctx)\n    game.start();\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level_reducer.js":
/*!******************************!*\
  !*** ./src/level_reducer.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const levelOne = __webpack_require__(/*! ./levels/level_one */ \"./src/levels/level_one.js\")\nconst levelTwo = __webpack_require__(/*! ./levels/level_two */ \"./src/levels/level_two.js\")\nconst levelThree = __webpack_require__(/*! ./levels/level_three */ \"./src/levels/level_three.js\");\n\nfunction LevelReducer(level) {\n    switch (level) {\n        case 1:\n            return levelOne;\n        case 2:\n            return levelTwo;\n        case 3: \n            return levelThree;\n        default:\n            levelOne;\n    }\n}\n\nmodule.exports = LevelReducer;\n\n//# sourceURL=webpack:///./src/level_reducer.js?");

/***/ }),

/***/ "./src/levels/level_one.js":
/*!*********************************!*\
  !*** ./src/levels/level_one.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst Player = __webpack_require__(/*! ../objects/player */ \"./src/objects/player.js\")\nconst Bubble = __webpack_require__(/*! ../objects/bubble */ \"./src/objects/bubble.js\")\nconst Rectangle = __webpack_require__(/*! ../objects/rectangle */ \"./src/objects/rectangle.js\")\n\nfunction levelOne(game) {\n    this.players = [new Player({pos: [500,500], vel: [0,0]})]\n    this.bubbles = [\n        (new Bubble({\n            pos: [500,100],\n            vel: [5,5],\n            radius: 80,\n            game: game\n        }))\n    ]\n    this.rectangles = [new Rectangle({\n        pos: [0, 520],\n        vel: [0,0],\n        size: [1000, 2],\n        game: game\n    })];\n}\n\nmodule.exports = levelOne\n\n//# sourceURL=webpack:///./src/levels/level_one.js?");

/***/ }),

/***/ "./src/levels/level_three.js":
/*!***********************************!*\
  !*** ./src/levels/level_three.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Player = __webpack_require__(/*! ../objects/player */ \"./src/objects/player.js\")\nconst Bubble = __webpack_require__(/*! ../objects/bubble */ \"./src/objects/bubble.js\")\nconst Rectangle = __webpack_require__(/*! ../objects/rectangle */ \"./src/objects/rectangle.js\")\n\nfunction levelThree(game) {\n    this.players = [new Player({pos: [500,500], vel: [0,0]})]\n    this.bubbles = [\n        (new Bubble({\n            pos: [500,100],\n            vel: [5,5],\n            radius: 40,\n        })), new Bubble({\n            pos: [500, 200],\n            vel: [5,6],\n            radius: 40,\n        })\n    ]\n    // this.rectangles = [ new Rectangle({\n    //     pos: [300,300],\n    //     vel: [0,0],\n    //     size: [80, 10],\n    //     game: game\n    // })];\n    this.rectangles = [new Rectangle({\n        pos: [0, 520],\n        vel: [0,0],\n        size: [1000, 2],\n        game: game\n    }), new Rectangle({\n        pos: [300,300],\n        vel: [0,0],\n        size: [80, 10],\n        game: game\n    })];\n}\n\nmodule.exports = levelThree\n\n//# sourceURL=webpack:///./src/levels/level_three.js?");

/***/ }),

/***/ "./src/levels/level_two.js":
/*!*********************************!*\
  !*** ./src/levels/level_two.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Player = __webpack_require__(/*! ../objects/player */ \"./src/objects/player.js\")\nconst Bubble = __webpack_require__(/*! ../objects/bubble */ \"./src/objects/bubble.js\")\nconst Rectangle = __webpack_require__(/*! ../objects/rectangle */ \"./src/objects/rectangle.js\")\n\nfunction levelTwo(game) {\n    this.players = [new Player({pos: [500,500], vel: [0,0]})]\n    this.bubbles = [\n        (new Bubble({\n            pos: [300,100],\n            vel: [5,5],\n            radius: 80\n        }))\n    ]\n    this.rectangles = [new Rectangle({\n        pos: [0, 520],\n        vel: [0,0],\n        size: [1000, 2],\n        game: game\n    }), new Rectangle({\n        pos: [300,300],\n        vel: [0,0],\n        size: [80, 10],\n        game: game\n    })];\n}\n\nmodule.exports = levelTwo\n\n//# sourceURL=webpack:///./src/levels/level_two.js?");

/***/ }),

/***/ "./src/objects/bubble.js":
/*!*******************************!*\
  !*** ./src/objects/bubble.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\nfunction Bubble(options) {\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.radius = options.radius;\n    this.color = \"#B22222\";\n}\n\nBubble.prototype.draw = function(ctx) {\n    ctx.fillStyle = this.color;\n    ctx.beginPath();\n    ctx.arc(\n        this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true \n    )\n    ctx.fill();\n}\n\nBubble.prototype.move = function() {\n    let newPos = [0,0];\n    newPos[0] = this.pos[0] + this.vel[0];\n    newPos[1] = this.pos[1] + this.vel[1];\n    this.pos = newPos;  \n}\n\n\nmodule.exports = Bubble;\n\n\n\n//# sourceURL=webpack:///./src/objects/bubble.js?");

/***/ }),

/***/ "./src/objects/bullet.js":
/*!*******************************!*\
  !*** ./src/objects/bullet.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Bullet(ctx, pos) {\n    this.ctx = ctx;\n    this.vel = [0,-2];\n    this.pos = [pos[0], pos[1]+20];\n    this.color = '#FFF0F5'\n    this.width = 5;\n    this.height = -100;\n    this.top = this.pos;\n}\n\nBullet.prototype.move = function() {\n    this.height += -15;\n    this.top = this.pos[1] + this.height;\n}\n\nBullet.prototype.draw = function(ctx) {\n    ctx.fillStyle = this.color;\n    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height)\n}\n\nmodule.exports = Bullet;\n\n//# sourceURL=webpack:///./src/objects/bullet.js?");

/***/ }),

/***/ "./src/objects/player.js":
/*!*******************************!*\
  !*** ./src/objects/player.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Bullet = __webpack_require__(/*! ./bullet */ \"./src/objects/bullet.js\")\n\nfunction Player(options) {\n    this.pos = options.pos;\n    this.vel = [0,0];\n    this.bullets = [];\n    this.radius = 20;\n    this.color = '#6495ED'\n    this.maxBullets = 1;\n}\n\nPlayer.prototype.move = function() {\n    let newPos = this.pos;\n    newPos[0] += this.vel[0];\n    newPos[1] += this.vel[1];\n    this.vel = [0,0];\n    this.pos = newPos;\n    return newPos;\n}\n\nPlayer.prototype.increaseVel = function(move) {\n    this.vel = move;\n    console.log(this.vel)\n}\n\n\nPlayer.prototype.draw = function(ctx) {\n    ctx.fillStyle = this.color;\n    ctx.beginPath();\n    ctx.arc(\n        this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true \n    )\n    ctx.fill();\n}\n\nPlayer.prototype.canShoot = function() {\n    return (this.bullets.length < this.maxBullets);\n}\n\nPlayer.prototype.shoot = function(ctx) {\n    if (this.bullets.length < this.maxBullets) {\n        let bullet = new Bullet(ctx, this.pos.slice());\n        this.bullets.push(bullet)\n        return bullet;\n    }\n}\n\nPlayer.prototype.clearBullet = function(i) {\n    this.bullets.splice(i, 1);\n    console.log('clear')\n}\n\nmodule.exports = Player;\n\n\n\n\n\n//# sourceURL=webpack:///./src/objects/player.js?");

/***/ }),

/***/ "./src/objects/rectangle.js":
/*!**********************************!*\
  !*** ./src/objects/rectangle.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Rectangle(options) {\n    this.width = options.size[0];\n    this.height = options.size[1];\n    this.pos = options.pos;\n    this.color = '#4B0082'\n}\n\nRectangle.prototype.draw = function(ctx) {\n    ctx.fillStyle = this.color;\n    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height)\n    \n}\n\nmodule.exports = Rectangle;\n\n\n//# sourceURL=webpack:///./src/objects/rectangle.js?");

/***/ })

/******/ });