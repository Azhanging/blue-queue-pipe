/*!
 * blue-queue-pipe.js 1.0.6
 * (c) 2016-2020 Blue
 * Released under the MIT License.
 * https://github.com/azhanging/blue-queue-pipe
 * time:Fri, 28 Jun 2019 06:53:36 GMT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["BlueQueuePipe"] = factory();
	else
		root["BlueQueuePipe"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "./static";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* 队列管道
* */
var BlueQueuePipe = function () {
  function BlueQueuePipe(opts) {
    _classCallCheck(this, BlueQueuePipe);

    this._init(opts);
  }

  _createClass(BlueQueuePipe, [{
    key: '_init',
    value: function _init(opts) {
      if (!opts) opts = {};
      //配置
      this.options = opts;
      //队列
      this.queue = [];
      //数据
      this.data = opts.data || {};
    }
  }, {
    key: 'enqueue',
    value: function enqueue(obj) {
      this.hook(this, this.options.enqueued, [this.queue.push(obj)]);
    }
  }, {
    key: 'dequeue',
    value: function dequeue() {
      var dequeue = this.queue.shift();
      this.hook(this, this.options.dequeued, [dequeue]);
      return dequeue;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return this.queue.length === 0;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.queue = [];
    }
  }, {
    key: 'first',
    value: function first() {
      return this.queue[0];
    }

    //获取最后一个队列

  }, {
    key: 'last',
    value: function last() {
      return this.queue[this.queue.length - 1];
    }

    //执行队列

  }, {
    key: 'run',
    value: function run() {
      var opts = this.options;
      while (!this.isEmpty()) {
        var dequeue = this.dequeue();
        //如果队列项是function，执行
        if (typeof dequeue === 'function') {
          this.hook(this, opts.running, [dequeue({
            queueCtx: this,
            args: arguments
          })]);
        } else {
          //非function给dequeued执行
          this.hook(this, opts.running, [dequeue]);
        }
      }
      this.hook(this, opts.ran);
    }

    //使用钩子

  }, {
    key: 'hook',
    value: function hook(ctx, fn, args) {
      typeof fn === 'function' && fn.apply(ctx, args instanceof Array ? args : []);
    }

    //使用方法

  }, {
    key: 'useMethod',
    value: function useMethod(name, args) {
      var opts = this.options;
      if (!opts.methods) return;
      this.hook(this, opts.methods[name], args || []);
    }
  }]);

  return BlueQueuePipe;
}();

/* harmony default export */ __webpack_exports__["default"] = (BlueQueuePipe);

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=blue-queue-pipe.js.map