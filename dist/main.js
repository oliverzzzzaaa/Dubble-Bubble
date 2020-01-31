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

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Bubble = __webpack_require__(/*! ./objects/bubble */ \"./src/objects/bubble.js\")\nconst Player = __webpack_require__(/*! ./objects/player */ \"./src/objects/player.js\")\nconst LevelReducer = __webpack_require__(/*! ./level_reducer */ \"./src/level_reducer.js\")\n\nfunction Game(ctx) {\n    this.bubbles = [];\n    this.bullets = [];\n    this.players = [];\n    this.level = 1;\n    this.rectangles = [];\n    this.map = LevelReducer(this.level);\n    const DIM_X = 900;\n    const DIM_Y = 600;\n    const BG_COLOR = \"#FFFFF\";\n    this.ctx = ctx\n}\n\nGame.prototype.addBubble = function(options) {\n    let newBubble = new Bubble(options);\n    this.bubbles.push(newBubble)\n}\n\nGame.prototype.draw = function() {\n    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n    ctx.fillStyle = Game.BG_COLOR;\n    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n    ctx.beginPath();\n    ctx.rect(20, 20, 150, 100);\n    this.ctx.strokeStyle = 'purple';\n    ctx.stroke();\n    console.log('purple')\n    this.bubbles.forEach(function(bubble) {\n      bubble.draw(ctx);\n    });\n    this.players.forEach(function(player) {\n        player.draw(ctx)\n    })\n};\n\nGame.prototype.move = function() {\n    this.bubbles.move()\n}\n\nGame.prototype.addPlayer = function() {\n    let player1 = new Player({\n        pos: [500,500],\n        vel: [0,0]\n    })\n    this.players.push(player1)\n    return this.players[0];\n}\n\nGame.prototype.moveObjects = function(delta) {\n    const allMovingObj = [];\n    allMovingObj = allMovingObj.concat(this.bubbles, this.bullets, this.players)\n    allMovingObj.forEach(obj => obj.move(this.ctx))\n  };\n\nGame.prototype.step = function(delta) {\n    this.moveObjects(delta);\n    // this.checkCollisions();\n  };\n\nGame.prototype.start = function() {\n    this.map = new (LevelReducer(this.level))\n    this.ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);\n    this.map.players.forEach(player => {\n        player.draw(this.ctx);       \n    })\n    this.map.bubbles.forEach(bubble => bubble.draw(this.ctx))\n    this.map.rectangles.forEach(rectangle => rectangle.draw(this.ctx))\n    console.log('done')\n}\n\nmodule.exports = Game;\n  \n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/gameview.js":
/*!*************************!*\
  !*** ./src/gameview.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function GameView(game, ctx) {\n    this.ctx = ctx;\n    this.game = game;\n}\n\nGameView.MOVES = {\n    w: [0, -1],\n    a: [-1, 0],\n    s: [0, 1],\n    d: [1, 0]\n};\n\nGameView.prototype.bindKeyHandlers = function bindKeyHandlers() {\n    const player = this.player\n    Object.keys(GameView.MOVES).forEach(function(k) {\n        const move = GameView.MOVES[k];\n        key(k, function () {\n            player.move(move)\n        })\n    })\n}\n\nGameView.prototype.start = function() {\n    this.bindKeyHandlers()\n    this.player = this.game.addPlayer();\n    console.log(this.game)\n    this.game.start();\n}\n\nGameView.prototype.playRound = function() {\n    let interval = setInterval(() => {\n        this.game.draw(this.ctx)\n    }, 10)\n}\n\nGameView.prototype.animate = function animate(time) {\n    const timeDelta = time - this.lastTime;\n  \n    this.game.step(timeDelta);\n    this.game.draw(this.ctx);\n    this.lastTime = time;\n  \n    // every call to animate requests causes another call to animate\n    requestAnimationFrame(this.animate.bind(this));\n};\n\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/gameview.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\")\nconst GameView = __webpack_require__(/*! ./gameview */ \"./src/gameview.js\")\n\ndocument.addEventListener(\"DOMContentLoaded\", e => {\n    let canvas = document.getElementById(\"game-canvas\")\n    canvas.width = 1000;\n    // canvas.width = canvas.parentElement.clientWidth;\n    canvas.height = 700;\n    // canvas.height = canvas.parentElement.clientHeight;\n    // console.log(canvas.parentElement.clientWidth)\n    // console.log(canvas.parentElement.clientHeight)\n    const ctx = canvas.getContext('2d');\n    const game = new Game(ctx);\n    let a = new GameView(game, ctx)\n    a.start();\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level_reducer.js":
/*!******************************!*\
  !*** ./src/level_reducer.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const levelOne = __webpack_require__(/*! ./levels/level_one */ \"./src/levels/level_one.js\")\n\nfunction LevelReducer(level) {\n    switch (level) {\n        case 1:\n            return levelOne;\n        default:\n            levelOne;\n    }\n}\n\nmodule.exports = LevelReducer;\n\n//# sourceURL=webpack:///./src/level_reducer.js?");

/***/ }),

/***/ "./src/levels/level_one.js":
/*!*********************************!*\
  !*** ./src/levels/level_one.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst Player = __webpack_require__(/*! ../objects/player */ \"./src/objects/player.js\")\nconst Bubble = __webpack_require__(/*! ../objects/bubble */ \"./src/objects/bubble.js\")\nconst Rectangle = __webpack_require__(/*! ../objects/rectangle */ \"./src/objects/rectangle.js\")\n\nfunction levelOne(game) {\n    this.players = [new Player({pos: [500,500], vel: [0,0]})]\n    this.bubbles = [\n        (new Bubble({\n            pos: [500,100],\n            vel: [5,5],\n            radius: 80,\n            game: game\n        }))\n    ]\n    this.rectangles = [new Rectangle({\n        pos: [0, 520],\n        vel: [0,0],\n        size: [1000, 10],\n        game: game\n    })];\n}\n\nmodule.exports = levelOne\n\n//# sourceURL=webpack:///./src/levels/level_one.js?");

/***/ }),

/***/ "./src/objects/bubble.js":
/*!*******************************!*\
  !*** ./src/objects/bubble.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\nfunction Bubble(options) {\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.radius = options.radius;\n    this.game = options.game;\n    this.color = \"#B22222\";\n    this.maxHeight = options.maxHeight;\n}\n\nBubble.prototype.draw = function(ctx) {\n    ctx.fillStyle = this.color;\n    ctx.beginPath();\n    console.log(this)\n    ctx.arc(\n        this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true \n    )\n    ctx.fill();\n}\n\nBubble.prototype.move = function() {\n    let newPos = [0,0];\n    newPos[0] = this.pos[0] + this.vel[0];\n    newPos[1] = this.pos[1] + this.vel[1];\n    this.pos = newPos;  \n}\n\n\nmodule.exports = Bubble;\n\n\n\n//# sourceURL=webpack:///./src/objects/bubble.js?");

/***/ }),

/***/ "./src/objects/player.js":
/*!*******************************!*\
  !*** ./src/objects/player.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nfunction Player(options) {\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.bullets = [];\n    this.radius = 20;\n    this.color = '#6495ED'\n}\n\nPlayer.prototype.move = function(dir) {\n    let newPos = this.pos;\n    newPos[0] += dir[0];\n    newPos[1] += dir[1];\n    this.pos = newPos;\n}\n\n\n\nPlayer.prototype.draw = function(ctx) {\n    ctx.fillStyle = this.color;\n    ctx.beginPath();\n    console.log(this)\n    ctx.arc(\n        this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true \n    )\n    ctx.fill();\n}\n\nmodule.exports = Player;\n\n\n\n\n\n//# sourceURL=webpack:///./src/objects/player.js?");

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