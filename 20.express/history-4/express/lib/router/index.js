const url = require('url');
const Layer = require('./layer');
const Route = require('./route');

function Router() {
    this.stack = [];
}
Router.prototype.route = function (path) {
    let route = new Route(); // 产生route
    // 产生layer 让layer和route进行关联
    let layer = new Layer(path,route.dispatch.bind(route))
    layer.route = route; // 每个路由都具备一个route属性，稍后路径匹配到后会调用route中的每一层
    this.stack.push(layer);
    return route;
}
Router.prototype.get = function(path, ...handlers) { 
    // 1.用户调用get时 需要保存成一个layer 放到栈中
    // 2.产生一个Route实例和 当前的layer创造关系
    // 3.要将route的dsiaptch方法存到layer上

    let route = this.route(path);
    // 用户调用get方法时 传入的handler 就不一定是一个了
    route.get(handlers); // 让route记录用户传入的handler并且标记这个handler是什么方法
   
}
Router.prototype.handle = function(req, res, done) {
    // let { pathname } = url.parse(req.url);
    // let requestMethod = req.method.toLowerCase();
    // for (let i = 0; i < this.stack.length; i++) {
    //     let { path, method, handler } = this.stack[i];
    //     if (method == requestMethod && path == pathname) {
    //         return handler(req, res);
    //     }
    // }
    // done();
}
module.exports = Router;