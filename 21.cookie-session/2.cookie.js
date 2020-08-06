const http = require('http');
const querystring = require('querystring');
const crypto = require('crypto');
const secret = 'adsadbAvhnrgreu657i76lu;oi3r'
const sign = (value)=>{
    let str = crypto.createHmac('sha256',secret).update(value).digest('base64');
    return str.replace(/\/|\=|\+/,'')
}
// jwt 就是signed  cookie不能存敏感信息  ctx.cookie()
http.createServer((req, res) => {
    req.getCookie = function (key,options = {}) {
        let cookieObj = querystring.parse(req.headers.cookie, '; ', '=');
        if(options.signed){
            let [value,s] = (cookieObj[key]||'').split('.');
            let newSign = sign(value);
            if(newSign === s){
                return value; // 签名一致 说明这次的内容是没有被改过的
            }else{
                return undefined; // 签名被篡改了 不能使用了
            }
        }
        return cookieObj[key];
    }
    let arr = [];
    res.setCookie = function (key,value,options = {}) {
        let opts = [];
        if(options.domain){
            opts.push(`domain=${options.domain}`);
        }
        if(options.path){
            opts.push(`path=${options.path}`)
        }
        if(options.maxAge){
            opts.push(`max-age=${options.maxAge}`)
        }
        if(options.httpOnly){
            opts.push(`httpOnly=${options.httpOnly}`)
        }
        if(options.signed){
            value = value + '.' + sign(value);
        }
        arr.push(`${key}=${value}; ${opts.join('; ')}`);
        res.setHeader('Set-Cookie',arr);
    }
    // 通过服务端去写入cookie
    if (req.url == '/read') {
        // 读取cookie
        res.end(req.getCookie('name',{signed:true}) || 'empty');
    } else if (req.url == '/write') {
        // domain 域名设置  .zf.cn    a.zf.cn  b.zf.cn  默认就是当前域名 (cookie 特点就是默认发送)
        // path /任意路径  同（express中间件）  限制写入时 cookie的路径
        // exipres 绝对时间 / max-age  相对时间
        // httpOnly 是否客户端可以操作cookie
        // 设置cookie

        // 当给浏览器设置cookie时 可以增加签名 根据数据内容创建一个唯一的签名  MD5
        // 加盐算法 根据内容 和秘钥算出一个签名 （不能反解）  相同的秘钥签名的结果是相同
        res.setCookie('name','zf',{ // 1.可以对设置一个字段 zf.sign
            httpOnly:true,
            maxAge:200,
            signed:true
        });
        res.setCookie('age','100');
        res.end('write Ok')
    } else {
        res.end('Not Found')
    }
}).listen(3000);