// 观察者模式 有观察者 肯定有被观察者  
// 观察者需要放到被观察者中，被观察者的状态发生变化需要通知观察者，我变化了
// 内部也是基于发布订阅模式，被观察者收集(on)观察者，状态变化后要通知(emit)观察者
// 是有关联的，基于发布订阅的

// 原型写法
// function Subject(name){
//     this.name = name;
//     this.state = '开心的';
//     this.observers = [];
// }
// Subject.prototype.attach = function (o) {
//     this.observers.push(o);
// }
// Subject.prototype.setState = function (newState) {
//     this.state = newState;
//     this.observers.forEach(o=>o.update(this))
// }

// 被观察者  小宝宝，收集观察者
class Subject { 
    constructor(name){
        this.name = name;
        this.state = '开心的';
        this.observers = []; // 存储所有观察者
    }
    // 收集一个个观察者，原型上的方法Subject.prototype.attach
    attach(o){
        this.observers.push(o);
    }
    // 通知观察者
    setState(newState){
        this.state = newState;
        this.observers.forEach(o=>o.update(this))
    }
}

// 观察者  我  我媳妇 观察小宝宝的心理状态
class Observer{ 
    constructor(name){
        this.name = name
    }
    update(baby){
        console.log('当前'+this.name +'被通知了','当前小宝宝的状态是'+baby.state)
    }
}
// 我和我媳妇 需要观察小宝宝的心里状态的变化
let baby = new Subject('小宝宝');
let parent = new Observer('爸爸');
let mother = new Observer('妈妈');
baby.attach(parent);
baby.attach(mother);
baby.setState('被欺负了');  // 状态变化
