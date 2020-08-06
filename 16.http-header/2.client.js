// 中间层的方式 

const http = require('http');
// http.get 默认发送get请求
// http.request 支持其他请求格式 post
let client = http.request({
    path:'/login',
    hostname:'localhost',
    port:3000,
    method:'POST',
    headers:{
        'Content-Type':'application/json'，
        // 'Content-Type':"application/x-www-form-urlencoded"
    }
},function (res) { // 3000 端口响应的内容
    const arr = []
    res.on('data',function (data) {
        arr.push(data);
    })
    res.on('end',function () {
        // Buffer.concat(arr).toString()
    })
});
client.end(`{"name":"zf"}`);
// 爬虫，我可以启动一个node服务 去访问别人的页面 ，把结果保存起来，展示给我们自己的页面

