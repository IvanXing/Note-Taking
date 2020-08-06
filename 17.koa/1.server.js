// Koa 对http的一个封装 实现了一个node框架 =》 根据这个框架去实现自己的mvc框架

// 每个人用koa的方式都不大一样  无法做到约定性  =》 egg 基于koa封装的约定性的框
// npm install koa
// koa 
// lib
// application 创建应用
// context 上下文
// request koa中的自己实现的request的对象 path
// response koa 中的自己实现的response的对象
const Koa = require('./koa/lib/application');
const app = new Koa();

// 1.实现基本的逻辑 
// 2.ctx是什么东西？
app.use((ctx) => { // defineProperty不能单独定义 setter =》 proxy
    // ctx 中整合了 request response  req和res
    // koa自己实现的request response
    // http原生的req和res
    //    console.log(ctx.req.url);
    //    console.log(ctx.request.req.url)

    // ----------------------------
    //    console.log(ctx.request.url); // 内部使用了url模块进行了解析
    //    console.log(ctx.url);  // ctx.__proto__.___proto__ = proto
    ctx.body = 'hello'; // 给响应写入一个结果 ctx.response
    // console.log(ctx.body);
    // 以后使用ctx变量时 很少会使用原生的req和 res （一般使用都是request,response，或者直接使用的方式）

});
app.on('error', (err) => {
    console.log(err);
});
app.listen(3000);


