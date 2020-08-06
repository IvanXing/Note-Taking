const url = require('url')
const request = {
    get url() {
        // 属性访问器 ctx.request.url  Object.defineProperty
        // (ctx.request).url
        return this.req.url
    },
    get path() {
        return url.parse(this.req.url).pathname
    },
    get query() {
        return url.parse(this.req.url, true).query
    }
    // .... 扩展属性
}
module.exports = request;
