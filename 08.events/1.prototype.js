// 发布订阅  
// Node靠事件驱动，实现事件通知要靠发布订阅模式
// node中自己实现了一个发布订阅，event内置模块，是一个类，需要创建实例
// 但是一般做法是创建一个子类去继承

const EventEmitter = require('events');
const Util = require('util'); // util.promisfy / util.inherts

// 实例的属性和方法 (每个人都有一份) 原型上的属性和方法(所有人共同使用一个)
// 继承 常用的继承策略

function Girl(){}
Util.inherits(Girl, EventEmitter);

/*
** Girl继承父类的原型方法
*/
// 1. Girl.prototype.__proto__ = EventEmitter.prototype; 最早
// 2. Object.setPrototypeOf(Girl.prototype,EventEmitter.prototype); es6，设置原型链
// 3. Girl.prototype = Object.create(EventEmitter.prototype); ES5
function create(parentProptype){
    function Fn(){}
    Fn.prototype = parentProptype;
    return new Fn
}
Girl.prototype = create(EventEmitter.prototype)
// 4. extends语法 class Girl extends EventEmitter ( 不光会继承原型 还会继承实例上的方法 )



let girl = new Girl;
console.log(girl.on); // 父类有on方法，测试

let girl = new Girl();
console.log(girl.__proto__ == Girl.prototype);
console.log(Girl.prototype.__proto__ === Object.prototype);
console.log(Object.prototype.__proto__); // 对象的原型的__proto__ 指向的是null

// prototype
// __proto__
// constructor


// events模块   npm的使用