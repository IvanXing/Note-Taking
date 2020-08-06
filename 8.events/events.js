function EventEmitter (){
    this._events = {}; // 默认给EventEmitter准备的
}
EventEmitter.prototype.on = function (eventName,callback) {
    if(!this._events) this._events = {};
    // 如果不是newListener 那就需要触发newListener的回调
    if(eventName !== 'newListener'){
        this.emit('newListener',eventName)
    }

    (this._events[eventName] || (this._events[eventName] = [])).push(callback)
}
EventEmitter.prototype.emit = function (eventName,...args) {
    if(this._events && this._events[eventName]){
        this._events[eventName].forEach(event =>event(...args));
    }
}
EventEmitter.prototype.off = function (eventName,callback) {
    // 先找到对应的数组
    if(this._events && this._events[eventName]){
        // 1.可以使用数组自带的filter方法 直接过滤，找到索引采用splice删除
        // 删除时获取once中的l属性和callback 比较，如果相等则删除
        this._events[eventName] = this._events[eventName].filter(cb=>(cb != callback)&&(cb.l !== callback))
    }
}   
EventEmitter.prototype.once = function (eventName,callback) {
    const once =(...args)=> {
        callback(...args);
        this.off(eventName,once)
    }
    once.l = callback; // 给once增加callback的标识
    this.on(eventName,once); // 先绑定一个一次性事件，稍后触发时，再将事件清空
}
// 观察者模式 会有两个类，观察者会被存到被观察者中，如果被观察者状态变化，会主动通知观察者，调用观察者的更新方法
// 观察者模式和发布订阅的场景 区分
module.exports = EventEmitter;