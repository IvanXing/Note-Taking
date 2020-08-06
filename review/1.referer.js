// referer 来源 iframe img  。。。

// 表示这个资源被谁引用过 防盗链

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const mime = require('mime');

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url, true);
    const absPath = path.join(__dirname, pathname);
    fs.stat(absPath, (err, statObj) => {
        if (err) {
            return res.end('Not Found')
        }
        if (statObj.isFile()) {
            // 只对图片进行防盗链
            if(/\.jpg/.test(absPath)){ // 如果请求路径是 .jpg结尾 要判断引用的来用
                // http://localhost:3000/index.html
                let referer = req.headers['referer'] || req.headers['referrer'];
                if(referer){
                    let host = req.headers.host; // a.zf.cn:3000
                    referer = url.parse(referer).host;
                    if(host !== referer){
                        fs.createReadStream(path.resolve(__dirname,'2.jpg')).pipe(res);
                        return;
                    }
                }
            }
            res.setHeader('Content-Type',mime.getType(absPath))
            fs.createReadStream(absPath).pipe(res);
        } else {
            return res.end('Not Found')
        }
    })

}).listen(3000);

