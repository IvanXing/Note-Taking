// 实现一个http服务器 客户端会发送请求 GET？ / POST(请求体) 
// 要处理不同的请求体的类型 (表单格式 a=1&b=2 formData) (JSON "{"name":"zf"}")  文件格式 二进制
// ajax (跨域问题) 提交数据 表单格式 (可以直接通信)

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const { createContext } = require('vm');
let server = http.createServer()

server.on('request', (req, res) => {
    let { pathname } = url.parse(req.url);
    // 需要配置跨域头 你访问我 如果不支持跨域
    // cors  允许跨域 允许携带header
    console.log(req.method)
    // 1) 配置跨域 当前请求我的源是谁
    // res.setHeader('Access-Control-Allow-Origin',req.headers.origin); // 我允许你 任何网站来访问我
    // res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    // // 默认支持 get 和 post  新增哪些方法可以访问
    // res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT');

    // // 可以设置 当前options 的发送频率  一般30分钟
    // res.setHeader('Access-Control-Max-Age','30')


    // 预检请求 ： 先发一个尝试的请求 ， 如果能跑通在发送真正的请求

    // 如果碰到options请求 直接成功即可
    // if(req.method === 'OPTIONS'){
    //     res.statusCode = 200;
    //     res.end(); // 内部会自己判断 是否增加了跨域头
    // }

    // 2) 解析请求体 
    const arr = [];
    req.on('data', function(chunk) {
        arr.push(chunk);
    })
    req.on('end', function() {
        let result = Buffer.concat(arr).toString();
        let obj;
        if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            // username=aaa&&&&password=bb => {username:'aaa',password:bbb}
            obj = querystring.parse(result, '&', '=');
            res.setHeader('Content-Type', 'application/json')
         
        }else if(req.headers['content-type'] === 'application/json'){
             obj = JSON.parse(result);
        }

        // 3) 根据不同路径返回对应内容 路由
        if (pathname === '/login' && req.method == 'POST') {
            console.log(obj);
            res.end('login')
        }
        if (pathname === '/reg' && req.method == 'PUT') {
            // 表单格式不会出现跨域问题
            console.log(obj);
            res.end(JSON.stringify(obj));
        }
    })
});


server.listen(3000);