const http = require('http');
const Router = require('./router')
// 2.应用和路由的分离
function Application() { // 每次创建一个应用 路由系统 应该是毫无关系，创建一个全新的路由系统
    // this.routers = [{
    //     path: '*',
    //     method: 'all',
    //     handler(req, res) { // 默认路由
    //         res.end(`Cannot my ${req.method} ${req.url}`);
    //     }
    // }];
    this._router = new Router();
}
Application.prototype.get = function(path, handler) {
    // this.routers.push({
    //     path,
    //     method: 'get',
    //     handler
    // });
    this._router.get(path,handler);

}
Application.prototype.listen = function() {
    const server = http.createServer((req, res) => {
        function done(){
            res.end(`Cannot my ${req.method} ${req.url}`);
        }
        this._router.handle(req,res,done);
        // let { pathname } = url.parse(req.url);
        // let requestMethod = req.method.toLowerCase();
        // for (let i = 1; i < this.routers.length; i++) {
        //     let { path, method, handler } = this.routers[i];
        //     if (path == pathname && method == requestMethod) {
        //         return handler(req, res); // res.end() res.end()
        //     }
        // }
        // return this.routers[0].handler(req, res)
    });
    server.listen(...arguments)
}
module.exports = Application;