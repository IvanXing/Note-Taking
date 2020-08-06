const http = require('http');
const querystring = require('querystring')
http.createServer((req, res) => {
    // 通过服务端去写入cookie
    if (req.url == '/read') {
        // 读取cookie
        res.end(JSON.stringify(querystring.parse(req.headers.cookie, '; ', '=')));
    } else if (req.url == '/write') {
        // domain 域名设置  .zf.cn    a.zf.cn  b.zf.cn  默认就是当前域名 (cookie 特点就是默认发送)
        // path /任意路径  同（express中间件）  限制写入时 cookie的路径
        // exipres 绝对时间 / max-age  相对时间
        // httpOnly 是否客户端可以操作cookie
        // 设置cookie
        res.setHeader('Set-Cookie', [`name=zf; httpOnly=true; max-age=10`, 'age=11']);
        res.end('write Ok')
    } else {
        res.end('Not Found')
    }
}).listen(3000);