const Layer = require('./layer')

function Route() {
    this.stack = [];
}
Route.prototype.dispatch = function(req, res, out) { // 这里相当于将router.next方法传入进来了
    // 稍后调用此方法时 会去栈中拿出对应的handler 一次执行
    let idx = 0;
    const next = () => {
        if (idx >= this.stack.length) return out();
        let layer = this.stack[idx++];
        if (layer.method === req.method.toLowerCase()) {
            layer.handle_request(req, res, next);
        } else {
            next();
        }
    }
    next();
}
Route.prototype.get = function(handlers) {
    handlers.forEach((handler) => {
        let layer = new Layer('', handler); // 路径没有意义
        layer.method = 'get'; // layer上他是什么方法的
        this.stack.push(layer);
    })
}
module.exports = Route;