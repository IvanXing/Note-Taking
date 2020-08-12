// 发布订阅  事件驱动，事件通知  发布订阅模式
// node中自己实现了一个发布订阅 

const EventEmitter = require('events');
const Util = require('util'); // util.promisfy / util.inherts
// 实例的属性和方法 (每个人都有一份) 原型上的属性和方法(所有人共同使用一个)
// 继承 常用的继承策略

function Girl(){}
Util.inherits(Girl,EventEmitter);
// 继承父类的原型方法
// Girl.prototype.__proto__ = EventEmitter.prototype;最早
// Object.create(EventEmitter.prototype) 
// Object.setPrototypeOf(Girl.prototype,EventEmitter.prototype) es6
// extends语法 class Girl extends EventEmitter ( 不光会继承原型 还会继承实例上的方法 )

// function create(parentProptype){
//     function Fn(){}
//     Fn.prototype = parentProptype;
//     return new Fn
// }
// Girl.prototype = create(EventEmitter.prototype)

let girl = new Girl;
console.log(girl.on);

// let girl = new Girl();
// console.log(girl.__proto__ == Girl.prototype);
// console.log(Girl.prototype.__proto__ === Object.prototype);
// console.log(Object.prototype.__proto__); // 对象的原型的__proto__ 指向的是null


// 继承父类的原型链

// Girl.prototype.__proto__ = EventEmitter.prototype


// prototype
// __proto__
// constructor


// events模块   npm的使用