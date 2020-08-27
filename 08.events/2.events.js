const EventEmitter = require('./events');
const util = require('util');

function Girl() {}
util.inherits(Girl, EventEmitter);

let girl = new Girl();

// 发布订阅 “发布”，“订阅” 把方法存数组[fn,fn,fn...]

// 订阅
// newListener 固定写法
girl.on('newListener', (type) => { 
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
girl.once('女生失恋', eat); // {女生失恋:[once.l=cry,once.l=eat]} 内部存的是once


girl.off('女生失恋',cry); // 关闭方法，找到数组删掉


// vue 中$on $emit 就是参考这种写法

girl.emit('女生失恋', '小美')
girl.emit('女生失恋', '小美')

// on emit off once newListener 发布订阅中应该有的方法 （好处：可以实现解耦合）

