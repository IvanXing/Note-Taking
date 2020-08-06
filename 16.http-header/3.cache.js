// 后端的缓存 配置强制缓存 和  协商缓存 

// 强制：以后的请求都不需要访问服务器 200

// 协商：你每次来我都判断一下，告诉你是否需要找缓存  304
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    const filePath = path.join(__dirname, pathname);

    // expires 老版本浏览器支持的 绝对时间
    // cache-control 相对时间

    // 默认强制缓存 不缓存首页 （如果已经断网 那这个页面应该访问不到，所以首页时不会被强制缓存） 
    // 引用的资源可以被缓存下来 后续找缓存，不会像服务器发请求 200
    res.setHeader('Expires',new Date(Date.now()+10*1000).toGMTString());
    res.setHeader('Cache-Control','max-age=10'); 


    // res.setHeader('Cache-Control','no-cache'); // 错误理解:不缓存  正确：缓存但是每次都会发请求
    // res.setHeader('Cache-Control','no-store'); // 不在浏览器中进行缓存，每次请求服务器、


    // 强制缓存不会像服务器发送请求，会导致页面修改后，视图依旧采用老的

    // 对比缓存  
    fs.stat(filePath, (err, statObj) => {
        if (err) return res.statusCode = 404, res.end('Not Found');
        if(statObj.isFile()){
            fs.createReadStream(filePath).pipe(res);
        }else{
            res.statusCode = 404, res.end('Not Found');
        }
    })



}).listen(5000);