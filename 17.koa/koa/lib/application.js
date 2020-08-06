const EventEmitter = require('events');
const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');
const Stream = require('stream')
class Application extends EventEmitter {
    constructor() {
        super(); // 为了防止 多个实例共享 response、request、context 我都需要进行拷贝
        this.response = Object.create(response);
        this.request = Object.create(request);
        this.context = Object.create(context);
        this.middlewares = []; // 存储用户所有的callback
    }
    use(callback) { // 将用户传递的callback 全部组合起来 （redux compose）  reduce实现compose
        this.middlewares.push(callback)
    }
    createContext(req, res) {
        // 每次请求都创建全新的上下文
        let context = Object.create(this.context);
        let request = Object.create(this.request);
        let response = Object.create(this.response);
        // 上下文中有一个request对象 是自己封装的的对象
        context.request = request;
        context.response = response;
        // 上下文中还有一个 req属性 指代的是原生的req
        // 自己封装的request对象上有req属性
        context.request.req = context.req = req;
        context.response.res = context.res = res;
        return context;
    }
    compose(ctx) {
        // 在数组中取出第一个，第一个执行后执行第二个
        const dispatch = i => { // 一个promise 返回一个promise会有等待效果
            if(i === this.middlewares.length) return Promise.resolve();
            let middleware = this.middlewares[i];
            // 中间件如果不是async
            return Promise.resolve(middleware(ctx, () => dispatch(i + 1))); // next方法指代的是这个箭头函数
        }
        return dispatch(0); // reduce如何实现
    }
    handleRequest(req, res) {
        let ctx = this.createContext(req, res); // 创建一个上下文
        this.compose(ctx).then(()=>{
            let body = ctx.body; //当组合后的promise完成后，拿到最终的结果 响应回去

            if(typeof body == 'string' || Buffer.isBuffer(body)){
                res.end(body);
            }else if(body instanceof Stream){
                res.setHeader('Content-Disposition',`attachement;filename=${encodeURIComponent('下载1111')}`)
                body.pipe(res);
            }else if(typeof body == 'object'){
                res.end(JSON.stringify(body));
            }
            // ....
        })
    }
    listen(...args) {
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(...args)
    }
}
module.exports = Application;

// 每次请求都应该有一个全新的context
// 每次请求应该都是毫无关系的


// 回去自己看看koa源码  （状态码的处理） （文件找不到怎么处理）