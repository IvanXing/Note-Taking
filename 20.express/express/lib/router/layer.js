function Layer(path,handler){
    this.path = path;
    this.handler = handler;
}
Layer.prototype.handle_error = function (err,req,res,next) {
    if(this.handler.length === 4){
        return this.handler(err,req,res,next); // 这里调用错误处理中间件
    }
    next(err); // 普通的中间件
}
Layer.prototype.match = function (pathname) {
    // 这里可以扩展
    // todo...
    if(this.path === pathname){
        return true;
    }
    if(!this.route){ // 中间件
        if(this.path == '/'){
            return true;
        }
        // /aaaa/b     /aaaa
        return pathname.startsWith(this.path + '/'); // 中间件的匹配规则
    }
    return false
}
Layer.prototype.handle_request = function (req, res, next) {
    // todo...
    this.handler(req,res,next)
}
module.exports = Layer;