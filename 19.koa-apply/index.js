const Koa = require('koa');
const Router = require('koa-router')
const app = new Koa();
const router = require('./routes/index');
const views = require('koa-views');

const cors = require('koa-cors');



app.use(cors());

app.use(views(__dirname + '/views', { // await ctx.render()
    map: {
        html: 'ejs' // 内部会自动引入 ejs模板
    }
}));

app.use(router());
app.listen(3000);

// const router = new Router();

// router.get('/',async (ctx,next)=>{  // vue   二级路由  /user /add /remove /get
//     ctx.body = 'hello'
// })
// router.post('/add',async (ctx,next)=>{ // /article  /add / remove /get
//     ctx.body = 'add'
// })

// // 使用路由中间件  服务器只支持post 你发了一个get请求 405
// app.use(router.routes()).use(router.allowedMethods()); //  路由的装载
// app.listen(3000);