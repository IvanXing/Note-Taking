const Koa = require('./koa');
const app = new Koa();
const fs = require('fs');
const log  = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('logger');
            resolve()
        }, 3000);
    })
}
app.use(async (ctx, next) => { 
    ctx.body = fs.createReadStream('./2.server.js');
})
app.listen(3000);