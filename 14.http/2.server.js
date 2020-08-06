const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');



const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    // 有路径 / 需要用到join
    const filePath = path.join(__dirname, pathname);

    // 处理请求是单线程  (代码尽量采用异步的 否则会阻塞主线程)
    // 先判断文件是否存在  fs.access  fs.stat

    // 默认情况 下 我希望 如果直接访问public 路径 可以直接访问到index.html
    fs.stat(filePath,(err,statObj)=>{
        if(err){
            res.end('Not Found');
        }else{
            if(statObj.isFile()){
                fs.createReadStream(filePath).pipe(res)
            }else{
                let file = path.join(filePath,'index.html');
                fs.stat(file,(err,statObj)=>{
                    if(err){
                        res.end('Not Found');
                    }else{
                       fs.createReadStream(file).pipe(res)
                    }
                })
            }
        }
    })

    // fs.readFile(filePath,(err,data)=>{
    //     console.log(err)
    //     res.end(data);
    // })
    // if (pathname === '/sum') {
    //     let sum = 0
    //     for (let i = 0; i < 10000000000; i++) {
    //         sum += i;
    //     }
    //     res.end(sum+'');
    // }else{
    //     res.end('ok')
    // }
});

server.listen(3000);