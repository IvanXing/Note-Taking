const Layer = require('./layer')

function Route() {
    this.stack = [];
}
Route.prototype.dispatch = function() {
    // 稍后调用此方法时 会去栈中拿出对应的handler 一次执行
}
Route.prototype.get = function(handlers) {
    handlers.forEach((handler) => {
        let layer = new Layer('/', handler); // 路径没有意义
        layer.method = 'get'; // layer上他是什么方法的
        this.stack.push(layer);
    })
}
module.exports = Route;