const Koa = require('koa');
const body = require('./koa-bodyparser');
const app = new Koa();

app.use(body()); // 这是使用中间件（函数）的方式 

app.use(async (ctx, next) => {
    // 当路径是 /login  get
    // ctx 包含了 request response / req res
    if (ctx.path == '/login' && ctx.method === 'GET') {
        ctx.body = `
            <form action="/login" method="post">
                用户名 <input type="text" name="username"/> <br/>
                密码 <input type="text" name="password"/> <br/>
                <button>提交</button>
            </form>
        `
    }else{
       return next();
       // 后续代码就不执行了 ，一般情况没有后续逻辑 直接return即可
    }
});
// koa中不能用回调的方式来实现，因为async 函数执行的时候 不会等待回调完成
// 1.koa中所有的异步都必须是promise 只有promise才会有等待效果
// 2. 必须所有的next方法前 需要有 await 、 return 否则没有等待效果
app.use(async (ctx, next) => {
    if (ctx.path == '/login' && ctx.method === 'POST') {
        ctx.body = ctx.request.body
        // 我希望等待这俩个方法执行完毕 在继续
        // await new Promise((resolve,reject)=>{
        //     const arr = [];
        //     ctx.req.on('data',function (chunk) { // 处理结果是异步的
        //         arr.push(chunk);
        //     });
        //     ctx.req.on('end',function () {
        //         const result = Buffer.concat(arr).toString();
        //         ctx.body = result; // ctx.body 仅仅是赋值而已
        //         resolve();
        //     });
        // })
    }else{
        await next();
    }
});



app.on('error',function (err) {
    console.log('err',err);
})
app.listen(3000);