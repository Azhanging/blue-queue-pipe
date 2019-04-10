/*
* blue-queue-pipe.js v1.0.0
* (c) 2016-2020 Blue
* Released under the MIT License.
* https://github.com/azhanging/blue-queue-pipe
* time:2019-4-9 00:43:15
*/

function BlueQueuePipe(opts) {
  this._init(opts);
}

BlueQueuePipe.prototype = {

  constructor: BlueQueuePipe,

  _init: function (opts) {
    if (!opts) opts = {};
    //配置
    this.options = opts;
    //队列
    this.queue = [];
    //数据
    this.data = opts.data || {};
    //方法
    this.methods = opts.methods || {};
    //进列后的执行
    this.enqueued = opts.enqueued;
    //出列后的执行
    this.dequeued = opts.dequeued;
    //允许时钩子
    this.ran = opts.ran;
  },

  setEnqueued: function (enqueue) {
    this.options.enqueued = enqueue;
  },

  setDequeued: function (dequeue) {
    this.options.dequeued = dequeue;
  },

  enqueue: function (obj) {
    this.hook(this, this.enqueued, [this.queue.push(obj)]);
  },

  dequeue: function () {
    var dequeue = this.queue.shift();
    this.hook(this, this.dequeued, [dequeue]);
    return dequeue;
  },

  isEmpty: function () {
    return this.queue.length === 0;
  },

  clear: function () {
    this.queue = [];
  },

  first: function () {
    return this.queue[0];
  },

  last: function () {
    return this.queue[this.queue.length - 1];
  },

  run: function () {
    while (!this.isEmpty()) {
      var dequeue = this.dequeue();
      //如果队列项是function，执行
      if (typeof dequeue === 'function') {
        this.hook(this, this.ran, [dequeue({
          queueCtx: this,
          args: arguments
        })]);
      } else {
        //非function给dequeued执行
        this.hook(this, this.ran, [dequeue]);
      }
    }
  },

  hook: function (ctx, fn, args) {
    (typeof fn === 'function') &&
    fn.apply(ctx, (args instanceof Array) ? args : []);
  },

  //使用方法
  useMethod: function (name, args) {
    this.hook(this, this.methods[name], args || []);
  }
};

module.exports = BlueQueuePipe;


