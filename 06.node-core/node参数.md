# 1.Node和浏览器的区别

- 前端里面有dom bom，服务端中没有widnow
- 服务端中有global属性，全局对象
- 打印global对象中的所有key：**console.log(Object.keys(global))**;

# 2.global中的重要key

## 2.1 一些key
- process 进程，每次启动服务都以进程为单位，一个进程包含多个线程
- Buffer 类型来处理二进制文件
- clearInterval、clearTimeout 
- setInterval、setTimeout（v8提供）
- clearImmediate、setImmediate 宏任务


## 2.2 浏览器以前的方法，V8提供了，还是可以使用的，只是默认没有被枚举出来
- 比如eval()
- 把隐藏属性都打印出来：**console.dir(global,{showHidden:true})**


## 2.3 process

- process 默认取值时会像global中查找，global.process可以直接写成process
- global不等于this：因为node中有一个模块化系统，是以文件为单位的，每个文件都是一个模块，模块中的this被更改了，是一个空对象

### 2.3.1 process.platform
- console.log(process.platform); // 可以用这个属性来判断当前执行的系统环境  win32 darwin

### 2.3.2 process.argv

- console.log(process.argv); // 第一个参数是node.exe， 第二个参数是node当前执行的文件，后面的参数：解析用户自己传递的配置参数
- 运行node文件 node + 文件名 + 若干配置参数  (webpack --mode --config --port --progress)
- let args = process.argv.slice(2); // 前两个参数没用，后面是配置参数
- 执行：node xx.js --port 3000 --color red --config a.js
- args是：[ '--port', '3000', '--color', 'red', '--config', 'a.js' ]
- 参数以--开头的，是key，没有--，就是值

```js
 // 实现重组配置参数
 let obj = {}
 args.forEach((item,index) => {
    if(item.startsWith('--')){
        obj[item.slice(2)] = args[index+1]
    }
 });
 console.log(obj);

```

### 2.3.3 commander用法

- 解析用户的参数：commander模块，TJ写的，yargs模块，webpack中的
- 在npm上的模块都需要先安装在使用 (模块内部也提供了几个属性，也可以在模块中直接访问 -参数)
- npm install commander
```js
const program = require('commander');
program.version('1.0.0')  // 设置版本号
       .command('create').action(()=>{   // 执行create命令，执行  node 2.js create
         console.log('创建项目')
        })
       .name('node')
       .usage('my-server')
       .option('-p,--port <v>', 'set your port') // node xxx -p 3000 => prot: '3000'
       .option('-c,--config <v>', 'set your config file') 
       .parse(process.argv); // -- 开头的是key  不带--是值
```

### 2.3.4 process.cwd()

- 需求：当用户在哪执行node命令时 就去哪找配置文件  
- webpack执行会在当前工作目录下找webpack.config文件
- console.log(process.cwd()); // 当前用户的工作目录 current working directory  (这个目录可以更改，用户自己切换即可)
- console.log(__dirname); // 当前文件的所在的目录 这个目录是不能手动修改的，不是global中的，实现模块化时传入

### 2.3.5 process.env

- console.log(process.env); // 环境变量，可以根据环境变量实现不同的功能
- window中set key=value，mac中export key=value，可以打印出来，但是这样设置的环境变量是临时的变量
```js
// 临时的
set b = 22
console.log(process.env.b) //22
// 根据环境变量区分
let domain = process.env.NODE_ENV === 'production'? 'localhost':'xxxx.com';
```

### 2.3.6 process.nextTick

- console.log(process.nextTick);
- process.nextTick 并不属于事件环的一部分，在本轮代码执行后执行 
#### a. node中自己实现的微任务  nextTick / queueMicrotask(试验性语法)
#### b. node中setImmediate 宏任务


# 3. Node中的Event-loop

- https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/

- 3.1 timer阶段：定时器，本阶段执行已经被 setTimeout() 和 setInterval() 的调度回调函数。
  - 清空完所有定时器，走入 pending callbacks阶段

- 3.2 pending callbacks阶段：待定回调，执行延迟到下一个循环迭代的 I/O 回调。

- 3.3 idle, prepare阶段：仅系统内部使用。  
  - 以上两个阶段系统内部使用，然后进入poll阶段

- 3.4 poll阶段：轮询，检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
  - 如果用户调用了setImmediate()，走入check阶段
  - 如果没有调用setImmediate()，就等定时器有没有到达，如果到达，返回timer阶段
  - 如果执行完成，在poll阶段直接关闭

- 3.5 check阶段：检测，setImmediate() 回调函数在这里执行。

```js
/*
** 先后顺序不确定
*/
setTimeout(() => {
    console.log('timeout')
}, 1000);
setImmediate(() => {
    console.log('setImmediate')
});
// 常规逻辑：timeout setImmediate
// 进入事件环时 setTimeout 有可能没有完成，setImmediate，timeout

/*
** 先后顺序确定
*/

const fs = require('fs');
// fs.readFile 在 poll轮询阶段
// poll 完成后走 check阶段 setImmediate
// 然后返回timer阶段：setTimeout
fs.readFile('./name.txt',()=>{ 
    setTimeout(() => {
        console.log('timeout')
    }, 0);
    setImmediate(() => {
        console.log('setImmediate')
    });
})
```

- process.nextTick 并不属于事件环的一部分  在本轮代码执行后执行 
- nextTick也是一个微任务，比then要快一些

```js
// 1 nextTick then 2
setTimeout(() => {
    console.log(1);
    Promise.resolve().then(()=>{
        console.log('then')
    })
    process.nextTick(()=>{
        console.log('nextTick')
    })
}, 0);
setTimeout(() => {
    console.log(2);
}, 0);
```

- 浏览器的事件环和node事件环，执行效果现在是一致的了
- vue的源码 nextTick 方法，描述了浏览器中常见的宏任务和微任务
  - 宏任务 script / ui渲染 / setTiemout / setInterval /requestFrameAnimation / setImmediate / MessageChannel  异步的  事件  ajax
  - 微任务：语言的本身提供的 promise.then mutationObserver nextTick
