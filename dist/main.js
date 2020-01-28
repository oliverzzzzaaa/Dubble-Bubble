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

/***/ "./src/bubble.js":
/*!***********************!*\
  !*** ./src/bubble.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Bubble(options) {\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.radius = options.radius;\n    this.game = options.game;\n    this.color = \"#B22222\";\n    this.maxHeight = options.maxHeight;\n}\n\nBubble.prototype.draw = function(ctx) {\n    ctx.fillStyle = this.color;\n    ctx.beginPath();\n    ctx.arc(\n        this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true \n    )\n    ctx.fill();\n}\n\nBubble.prototype.move = function() {\n    let newPos = [0,0];\n    newPos[0] = this.pos[0] + this.vel[0];\n    newPos[1] = this.pos[1] + this.vel[1];\n    this.pos = newPos;  \n}\n\n\nmodule.exports = Bubble;\n\n\n\n//# sourceURL=webpack:///./src/bubble.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Bubble = __webpack_require__(/*! ./bubble */ \"./src/bubble.js\")\nconst Player = __webpack_require__(/*! ./player */ \"./src/player.js\")\n\nfunction Game() {\n    this.bubbles = [];\n    this.bullets = [];\n    this.players = [];\n    const DIM_X = 900;\n    const DIM_Y = 600;\n    const BG_COLOR = \"#FFFFF\";\n}\n\nGame.prototype.addBubble = function(options) {\n    let newBubble = new Bubble(options);\n    this.bubbles.push(newBubble)\n}\n\nGame.prototype.draw = function(ctx) {\n    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n    ctx.fillStyle = Game.BG_COLOR;\n    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n    console.log(this.player)\n    this.bubbles.forEach(function(bubble) {\n      bubble.draw(ctx);\n    });\n    this.players.forEach(function(player) {\n        player.draw(ctx)\n    })\n};\n\nGame.prototype.move = function() {\n    this.bubbles.move()\n}\n\nGame.prototype.addPlayer = function() {\n    let player1 = new Player({\n        pos: [500,500],\n        vel: [0,0]\n    })\n    this.players.push(player1)\n    return this.player;\n}\n\nmodule.exports = Game;\n  \n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/gameview.js":
/*!*************************!*\
  !*** ./src/gameview.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function GameView(game, ctx) {\n    this.ctx = ctx;\n    this.game = game;\n    this.player = this.game.addPlayer();\n}\n\nGameView.MOVES = {\n    w: [0, -1],\n    a: [-1, 0],\n    s: [0, 1],\n    d: [1, 0]\n};\n\nGameView.prototype.bindKeyHandlers = function bindKeyHandlers() {\n    const player = this.player\n    Object.keys(GameView.MOVES).forEach(function(k) {\n        const move = GameView.MOVES[k];\n        key(k, function () {\n            player.move(move)\n        })\n    })\n}\n\nGameView.prototype.start = function() {\n    this.bindKeyHandlers()\n    console.log(\"started\")\n    console.log(this.player)\n    let interval = setInterval(() => {\n        this.game.draw(this.ctx)\n    }, 10)\n\n}\n\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/gameview.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\")\nconst GameView = __webpack_require__(/*! ./gameview */ \"./src/gameview.js\")\n\ndocument.addEventListener(\"DOMContentLoaded\", e => {\n    let canvas = document.getElementById(\"game-canvas\")\n    const ctx = canvas.getContext('2d');\n    const game = new Game();\n    new GameView(game, ctx).start(game);\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nfunction Player(options) {\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.bullets = [];\n}\n\nPlayer.prototype.move = function(dir) {\n    let newPos = this.pos;\n    newPos[0] += dir[0];\n    newPos[1] += dir[1];\n    this.pos = newPos;\n}\n\n\nPlayer.prototype.draw = function(ctx) {\n    ctx.fillStyle = \"#696969\";\n    ctx.beginPath();\n    ctx.arc(\n        this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true \n    )\n    ctx.fill();\n}\n\nmodule.exports = Player;\n\n\n\n\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ })

/******/ });