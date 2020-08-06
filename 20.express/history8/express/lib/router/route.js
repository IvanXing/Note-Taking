const Layer = require('./layer')
const methods = require('methods');
function Route() {
    this.stack = [];
    this.methods = {}; // 用来描述内部存过哪些方法
}
Route.prototype.dispatch = function(req, res, out) { // 这里相当于将router.next方法传入进来了
    // 稍后调用此方法时 会去栈中拿出对应的handler 一次执行
    let idx = 0;
    const next = (err) => {
        err && out(err); /// 如果内部迭代的时候出现错误 直接到外层的stack中
        if (idx >= this.stack.length) return out();
        let layer = this.stack[idx++];
        console.log(layer.method)
        if (layer.method === req.method.toLowerCase()) {
            layer.handle_request(req, res, next);
        } else {
            next();
        }
    }
    next();
}
methods.forEach(method=>{
    Route.prototype[method] = function(handlers) {
        handlers.forEach((handler) => { 
            let layer = new Layer('', handler); // 路径没有意义
            layer.method = method; // layer上他是什么方法的

            this.methods[method] = true; // {post:true,get:true}
            this.stack.push(layer);
        })
    }
});

module.exports = Route;