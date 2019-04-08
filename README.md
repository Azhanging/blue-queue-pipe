# blue-queue

队列处理

### BlueQueue

大致的使用预览
```javascript
    var blueQueue = new BlueQueue({
      data:{},
      methods:{
        someMethod:function(){
          //this指向当前队列实例
        }
      },
      enqueued:function(){
        //this指向当前队列实例
      },
      dequeued:function(){
        //this指向当前队列实例
      }
    });

    setTimeout(function () {
      blueQueue.useMethod('setStatus', [true]);
    }, 0);

    blueQueue.enqueue(function () {
      console.log(1);
    });

    blueQueue.enqueue(function () {
      console.log(2);
    });

    blueQueue.enqueue(function () {
      console.log(3);
    });

    blueQueue.enqueue(123);

    blueQueue.run();
```

#### 实例属性

data:实例化带入的data

queue:队列数组

options:默认带入的配置

methods:实例化带入的methods

#### 钩子
enqueued: 每次enqueue后调用的钩子，this指向队列实例，
带入的参数为enqueue后的返回值

dequeued: 每次dequeue后调用的钩子，this指向队列实例，
带入的参数为dequeue的值

ran: 在dequeue run 后执行


#### prototype methods
_init(opts): 初始化方法

enqueue(obj): 加入队列

dequeue(): 离开队列，返回离开队列的obj

isEmpty(): 检查当前队列是否为空

clear(): 清空队列

first(): 获取到第一个队列

last(): 获取到最后一个队列

run(arguments): 执行队列，arguments会被带入到function类型的dequeue中执行

hook(ctx,fn,args[]):执行fn使用

useMethod(methodName,args[]):使用某一个在methods定义的方法