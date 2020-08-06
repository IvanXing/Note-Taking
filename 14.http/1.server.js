// node中的核心模块 http 可以快速的创建一个web服务

const http = require('http');
const url = require('url'); // 处理url 路径

// req => request 客户端的所有信息 
// res => response 可以给客户端写入数据
const server = http.createServer();
// 基本的服务
server.on('request',(req,res)=>{
    // 请求的方法 
    // console.log(req.method); //  方法名字是大写的

    // 进行处理url   pathname 路径   query 查询参数
    // let {pathname,query} = url.parse(req.url,true);

    //  request是一个可读流
    const arr = []
    req.on('data',function (chunk) { // 必须有请求体 内部才会解析触发data事件
        arr.push(chunk);
    })
    req.on('end',function () { // 请求发送过来 后一定会触发end事件
        let str = Buffer.concat(arr).toString();
        console.log(str);
    });
    // console.log(req.httpVersion);
    // console.log(req.headers); // 所有的header获取时都是小写

    // 可写流 write end 可写流的方法
    res.statusCode = 200;
    res.statusMessage = 'ok';

    res.setHeader('a',1);
    res.setHeader('Content-Type','text/html;charset=utf8')
    res.end('你好');
    // res.write('ok'); // write after end 表示文件已经关闭但是又进行了写入操作
}); 


// listen 是一个 订阅模式 ，等会开启后会触发对应的回调方法 
let port = 4000;
server.listen(port,()=>{
    console.log('server start',port)
});
// events 模块 node中基本上所有的模块都继承于eventEmitter
server.on('error',(err)=>{
    if(err.errno === 'EADDRINUSE'){
        server.listen(++port); // 端口号被占用自动重启
    }
});

// nodemon  node monitor 可以监视自动重启 自动打包  (pm2)
// 需要实现文件变化后自动重新运行 