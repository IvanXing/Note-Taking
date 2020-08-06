function Layer(path,handler){
    this.path = path;
    this.handler = handler;
}

Layer.prototype.match = function (pathname) {
    // 这里可以扩展
    // todo...
    return this.path === pathname
}
Layer.prototype.handle_request = function (req, res, next) {
    // todo...
    this.handler(req,res,next)
}
module.exports = Layer;