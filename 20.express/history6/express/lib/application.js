const http = require('http');
const Router = require('./router');
const methods = require('methods'); // 第三方


// websocket  可以当成监听函数来使用
function Application() { // 默认在创建时 就会生成一个路由系统
    // 路由的懒加载
}
Application.prototype.lazy_route = function () { // 调用此方法才开始创建路由，不是创建应用时直接装载路由
    if(!this._router){
        this._router = new Router();
    }
}

methods.forEach((method) => { // 批量生产方法
    Application.prototype[method] = function(path, ...handlers) {
        this.lazy_route();
        this._router[method](path, handlers);
    }
})
Application.prototype.listen = function() {
    const server = http.createServer((req, res) => {
        function done() {// 不属于路由的 
            res.end(`Cannot my ${req.method} ${req.url}`);
        }
        this.lazy_route();
        this._router.handle(req, res, done);
    });
    server.listen(...arguments)
}
module.exports = Application;