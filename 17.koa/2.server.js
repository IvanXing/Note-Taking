const Koa = require('koa');

const app = new Koa();
// 调用next 表示执行下一个中间件 

const log = () =>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('logger');
            resolve()
        }, 3000);
    })
}
// 1 3 2 logger  5 6 4

// fn1()  1  3 2  响应结果 
// koa 中要求 每个next方法前面都必须增加await 否则不存在等待效果

// 会取 中间件第一个执行完的结果
app.use(async (ctx,next)=>{ // fn1
    console.log(1); 
    ctx.a = 100;
   await next();
    console.log(2);
    ctx.body = 'hello 1'; // res.end(hello 1)
})
app.use(async (ctx,next)=>{ // fn2
    console.log(3); 
    console.log(ctx.a)
    await log();// -- 等待
    ctx.body = 'hello2'
    next();
    console.log(4)
})
app.use(async (ctx,next)=>{ // fn3
    console.log(5)
    ctx.body = 'hello 3';
    next();
    console.log(6)
});

// koa的中间件原理 会将所有的中间件 组合成一个大的promise，当这个promise执行完毕后，会采用当前的ctx.body 进行结果的响应 （next 前面必须有await 或者return 否则执行顺序可能达不到预期）
// 如果都是同步执行 加不加await都无所谓 ， 我不知道后续是否有异步逻辑，写的时候都要加await

// next() 1.可以把多个模块通过next方法来链接起来  2.可以决定是否向下执行(可以实现后台权限)
// 3.可以封装一些方法 在中间件中，封装后向下执行
app.listen(3000);