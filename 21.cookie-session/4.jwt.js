// session 

// 登录
// 校验是否登录过




// 内置了 设置cookie的方法
const Koa = require('koa');
const Router = require('@koa/router');
const app = new Koa();
const crypto = require('crypto');
const bodyparser = require('koa-bodyparser');
// const jwt = require('jwt-simple')
const router = new Router();

app.use(bodyparser());

let jwt = {
    toBase64Url(base64) {
        return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    },
    toBase64(content) {
        return this.toBase64Url(Buffer.from(JSON.stringify(content)).toString('base64'))
    },
    sign(content, secret) {
        let r = require('crypto').createHmac('sha256', secret).update(content).digest('base64');
        return this.toBase64Url(r)
    },
    encode(payload, secret) {
        // 对head 和内容进行签名
        let header = this.toBase64({ typ: 'JWT', alg: 'HS256' });
        let content = this.toBase64(payload);
        let sign = this.sign([header, content].join('.'), secret)
        return [header, content, sign].join('.');
    },
    base64urlUnescape(str){
        str += new Array(5 - str.length % 4).join('=');
        return str.replace(/\-/g, '+').replace(/_/g, '/');
    },
    decode(token,secret){
        let [header,content,sign] = token.split('.');
        let newSign = this.sign([header,content].join('.'),secret);
        if(sign === newSign){ // 校验了签名
            // 将base64在转化成 字符串
            return Buffer.from(this.base64urlUnescape(content),'base64').toString();
        }else{
           throw new Error('被篡改')
        }
    }
}

// 获取用户权限 



router.post('/login', async (ctx) => {
    let { username, password } = ctx.request.body;
    // jsonwebtoken  jwt-simple
    if (username === 'admin' && password == 'admin') {
        let token = jwt.encode({
            username:username,
            expires:new Date(Date.now()+10*1000).toGMTString()
        }, 'zfpx');

        ctx.cookies.set('tokenm','token')
        ctx.body = {
            err: 0,
            username,
            token
        }
    }
})



router.get('/validate', async (ctx) => {

    let authoraztion = ctx.headers['authorization'];
    try {
        let r = jwt.decode(authoraztion,'zfpx'); // 这个r 表示就是你上次传入的payload

        if(r.expires < Date.now()){
            ctx.body = '过期了'
        }

        ctx.body = {
            err: 0,
            username:r
        }
    } catch (e) {
        console.log(e)
        ctx.body = {
            err: 1,
            message: '错误'
        }
    }
})



app.use(router.routes());
app.listen(3000);


// {"err":0,"username":"admin","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluIg.6dCDavcMt0DglL8wQI0qsO
// PknNDPts"}*