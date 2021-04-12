/*
* 队列管道
* */

interface QueuePipeOpts {
	//数据
	data?: any;
	//写入队里后调用
	enqueued?: Function;
	//离开队列后调用
	dequeued?: Function;
	//run的时候调用
	running?: Function;
	//run结束后调用
	ran?: Function;
	//定义方法
	methods?: {
		[ methodName: string ]: Function;
	};
}


class BlueQueuePipe {
	options: QueuePipeOpts;
	queue: any[] = [];
	data?: any = {};

	constructor ( opts: QueuePipeOpts ) {
		this._init(opts);
	}

	//初始化配置
	_init ( opts: QueuePipeOpts ): void {
		//配置
		this.options = opts;
		//队列
		this.queue = [];
		//数据
		this.data = opts.data || {};
	}

	//进入队列
	enqueue ( obj ): void {
		this.hook(this, this.options.enqueued, [this.queue.push(obj)]);
	}

	//离开队列
	dequeue (): any {
		const {queue, options} = this;
		const dequeue = queue.shift();
		this.hook(this, options.dequeued, [dequeue]);
		return dequeue;
	}

	//当前是否为空
	isEmpty (): boolean {
		return this.queue.length === 0;
	}

	//清空队列
	clear (): void {
		this.queue = [];
	}

	//第一位个队列
	first (): any {
		return this.queue[ 0 ];
	}

	//获取最后一个队列
	last (): any {
		return this.queue[ this.queue.length - 1 ];
	}

	//执行队列
	run ( ...args: any[] ): void {
		const opts = this.options;
		while (!this.isEmpty()) {
			const dequeue = this.dequeue();
			//如果队列项是function，执行
			this.hook(this, opts.running, [(() => {
				if (typeof dequeue === 'function') return dequeue.apply(this, args);
				return dequeue;
			})()]);
		}
		this.hook(this, opts.ran);
	}

	//执行function
	hook ( context: any, cb: any, args: any[] = [] ) {
		if (typeof cb === 'function') {
			return cb.apply(context, args);
		}
		return cb;
	}

	//使用方法
	useMethod ( name: string, args?: any[] ): any {
		const opts = this.options;
		if (!opts.methods) return;
		return this.hook(this, opts.methods[ name ], args || []);
	}
}

export default BlueQueuePipe;