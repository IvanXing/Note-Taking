const Koa = require('koa');
const body = require('./koa-bodyparser');
const static = require('koa-static');
const path = require('path')
const app = new Koa();

app.use(static(path.resolve(__dirname,'public')));
app.use(body(path.resolve(__dirname,'upload')));
app.use(async (ctx, next) => {
    if(ctx.path == '/login' && ctx.method === 'POST'){
        ctx.body = ctx.request.body
    }
});

// koa2-multer
app.on('error',function (err) {
    console.log('err',err);
})
app.listen(3000);