const url = require('url');
const Layer = require('./layer');
const Route = require('./route');

function Router() {
    this.stack = [];
}
Router.prototype.route = function(path) {
    let route = new Route(); // 产生route
    // 产生layer 让layer和route进行关联

    // v8垃圾回收 引用计数
    let layer = new Layer(path, route.dispatch.bind(route));

    // 这里是标识而已 
    layer.route = route; // 每个路由都具备一个route属性，稍后路径匹配到后会调用route中的每一层
    this.stack.push(layer); // 类扩展性强
    return route;
}
Router.prototype.get = function(path, handlers) {
    // 1.用户调用get时 需要保存成一个layer 放到栈中
    // 2.产生一个Route实例和 当前的layer创造关系
    // 3.要将route的dsiaptch方法存到layer上
    let route = this.route(path);
    // 用户调用get方法时 传入的handler 就不一定是一个了
    route.get(handlers); // 让route记录用户传入的handler并且标记这个handler是什么方法
}
Router.prototype.handle = function(req, res, out) {
    // 1.需要取出路由系统中Router 存放的layer 依次执行 ，next
    let { pathname } = url.parse(req.url);
    let idx = 0;
    let next = () => {
        if (idx >= this.stack.length) return out(); // 遍历完后还是没找到，那就直接走出路由系统即可
        let layer = this.stack[idx++];

        // 需要查看 layer上的path 和 当前请求的路径是否一致，如果一致调用dispatch方法
        if (layer.match(pathname)) { // 我们的原则是让layer
            // 路径匹配到了 需要让layer上对应的dispatch执行
            layer.handle_request(req, res, next); // 将遍历路由系统中下一层的方法传入
        } else {
            next();
        }
    }
    next();
}
module.exports = Router;