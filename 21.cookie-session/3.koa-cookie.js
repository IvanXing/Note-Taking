// 内置了 设置cookie的方法
const Koa = require('koa');
const Router = require('@koa/router');
const app = new Koa();
const crypto = require('crypto');
const uuid = require('uuid');

const session = require('koa-session'); // koa-generic koa-session

// console.log(crypto.createHmac('sha1','zfpx').update('visit=123125').digest('base64'))
// 4YOljJqyv1z6+V96XzLvJipIBIM=
// 4YOljJqyv1z6-V96XzLvJipIBIM
let router = new Router();
app.keys = ['zfpx'];

// 办卡的例子  给你一个固定的卡号
// const session = {};
// const cardName = 'zf.sid'; // 卡的名字 店铺名
app.use(session({
    maxAge:10*1000,
},app));  // router static views ....



router.get('/visit',async(ctx,next)=>{
   let visit =  ctx.session.visit || 0;
   ctx.session.visit++;
   ctx.body =`你是第${ctx.session.visit}此次访问我的`
});

// router.get('/visit', async (ctx, next) => {
//     let cardId = ctx.cookies.get(cardName);
//     if (cardId && session[cardId]) {
//         session[cardId].count --;
//         ctx.body = '你有'+session[cardId].count+'机会';
//     } else {
//         let cardId = uuid.v4();
//         session[cardId] = { count: 3 }; // redis 也可以设置存储的过期时间
//         ctx.cookies.set(cardName, cardId,{maxAge:10*1000});
//         ctx.body = `你有${session[cardId].count}次机会`
//     }
// })

// session


// router.get('/visit',async (ctx,next)=>{
//     let visit = ctx.cookies.get('visit') || 0;
//     visit++;
//     ctx.cookies.set('visit',`${visit}`,{httpOnly:true,signed:true})
//     ctx.body = `你当前第${visit}次访问我`
// })


app.use(router.routes());
app.listen(3000);