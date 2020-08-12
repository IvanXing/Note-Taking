const EventEmitter = require('./events');
const util = require('util');
function Girl() {}
util.inherits(Girl, EventEmitter);
let girl = new Girl();
// 发布订阅 “发布”  “订阅” [fn,fn,fn...]

girl.on('newListener', (type) => { // newListener 固定写法
    console.log(type)
    if (type === '女生失恋') {
        process.nextTick(() => { // 在当前同步代码执行完毕后触发事件
            girl.emit(type); // 第一次触发 [cry,eat]
        })
    }
});

const cry = (w) => console.log('哭', w);
const eat = (w) => console.log('吃', w);
girl.once('女生失恋', cry);
girl.once('女生失恋', eat); // {女生失恋:[once.l=cry,once.l=eat]}


// girl.off('女生失恋',cry);


// vue $on $emit

// girl.emit('女生失恋', '小美')
// girl.emit('女生失恋', '小美')

// on emit off once newListener 发布订阅中应该有的方法 （好处：可以实现解耦合）

