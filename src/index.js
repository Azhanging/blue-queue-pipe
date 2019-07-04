/*
* 队列管道
* */
class BlueQueuePipe {
  constructor(opts) {
    this._init(opts);
  }

  _init(opts) {
    if (!opts) opts = {};
    //配置
    this.options = opts;
    //队列
    this.queue = [];
    //数据
    this.data = opts.data || {};
  }

  enqueue(obj) {
    this.hook(this, this.options.enqueued, [this.queue.push(obj)]);
  }

  dequeue() {
    const dequeue = this.queue.shift();
    this.hook(this, this.options.dequeued, [dequeue]);
    return dequeue;
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  clear() {
    this.queue = [];
  }

  first() {
    return this.queue[0];
  }

  //获取最后一个队列
  last() {
    return this.queue[this.queue.length - 1];
  }

  //执行队列
  run() {
    const opts = this.options;
    while (!this.isEmpty()) {
      const dequeue = this.dequeue();
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
  hook(ctx, fn, args) {
    (typeof fn === 'function') &&
    fn.apply(ctx, (args instanceof Array) ? args : []);
  }

  //使用方法
  useMethod(name, args) {
    const opts = this.options;
    if (!opts.methods) return;
    this.hook(this, opts.methods[name], args || []);
  }
}

export default BlueQueuePipe;