
const url = require('url');
function Router(){
    this.stack = []; // 维护所有的路由的
}
Router.prototype.get = function (path,handler) {
    this.stack.push({
        path,
        method:'get',
        handler
    })
}
Router.prototype.handle = function (req,res,done) {
    let { pathname } = url.parse(req.url);
    let requestMethod = req.method.toLowerCase();
    for(let i = 0; i< this.stack.length;i++ ){
        let {path,method,handler} = this.stack[i];
        if(method == requestMethod && path == pathname){
            return handler(req,res);
        }
    }
    done(); // 无法处理来找我
}
module.exports = Router;