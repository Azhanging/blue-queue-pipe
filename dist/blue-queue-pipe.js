/*!
 * 
 * blue-queue-pipe.js 1.0.8
 * (c) 2016-2020 Blue
 * Released under the MIT License.
 * https://github.com/azhanging/blue-queue-pipe
 * time:Fri, 27 Mar 2020 07:24:02 GMT
 * 
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
})(window, function() {
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
/******/ 	__webpack_require__.p = "./static";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
* 队列管道
* */
(function (factory) {
    if ( true && typeof module.exports === "object") {
        var v = factory(__webpack_require__(1), exports);
        if (v !== undefined) module.exports = v;
    }
    else if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BlueQueuePipe = /** @class */ (function () {
        function BlueQueuePipe(opts) {
            this._init(opts);
        }
        BlueQueuePipe.prototype._init = function (opts) {
            if (!opts)
                opts = {};
            //配置
            this.options = opts;
            //队列
            this.queue = [];
            //数据
            this.data = opts.data || {};
        };
        BlueQueuePipe.prototype.enqueue = function (obj) {
            this.hook(this, this.options.enqueued, [this.queue.push(obj)]);
        };
        BlueQueuePipe.prototype.dequeue = function () {
            var _a = this, queue = _a.queue, options = _a.options;
            var dequeue = queue.shift();
            this.hook(this, options.dequeued, [dequeue]);
            return dequeue;
        };
        BlueQueuePipe.prototype.isEmpty = function () {
            return this.queue.length === 0;
        };
        BlueQueuePipe.prototype.clear = function () {
            this.queue = [];
        };
        BlueQueuePipe.prototype.first = function () {
            return this.queue[0];
        };
        //获取最后一个队列
        BlueQueuePipe.prototype.last = function () {
            return this.queue[this.queue.length - 1];
        };
        //执行队列
        BlueQueuePipe.prototype.run = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var opts = this.options;
            var _loop_1 = function () {
                var dequeue = this_1.dequeue();
                //如果队列项是function，执行
                this_1.hook(this_1, opts.running, [(function () {
                        if (typeof dequeue === 'function') {
                            return dequeue.apply(_this, args);
                        }
                        return dequeue;
                    })()]);
            };
            var this_1 = this;
            while (!this.isEmpty()) {
                _loop_1();
            }
            this.hook(this, opts.ran);
        };
        //执行function
        BlueQueuePipe.prototype.hook = function (context, cb, args) {
            if (args === void 0) { args = []; }
            if (typeof cb === 'function') {
                return cb.apply(context, args);
            }
            return cb;
        };
        //使用方法
        BlueQueuePipe.prototype.useMethod = function (name, args) {
            var opts = this.options;
            if (!opts.methods)
                return;
            return this.hook(this, opts.methods[name], args || []);
        };
        return BlueQueuePipe;
    }());
    exports.default = BlueQueuePipe;
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 1;

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=blue-queue-pipe.js.map