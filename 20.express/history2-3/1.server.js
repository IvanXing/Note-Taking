const express = require('./express'); // 导入express

const app = express(); // 创建一个应用 

app.listen(3000, () => {
    console.log(`server start 3000`);
});

// 调用回调时 会将原生的req和res传入 （res和req在内部也被扩展了）
app.get('/', (req, res) => { // 内部不会将回调函数包装成promise
    res.end('ok');
});

app.get('/add', (req, res) => { // 内部不会将回调函数包装成promise
    res.end('add');
});



// 1.要先自己想一下原理是怎么样实现的 http模块
// 源码目录结构
// index.js 入口文件 没有main入口
// 默认通过 index => lib/express
// middleware 中间件 内置了中间件 
// router 路由系统
// application.js  应用
// request,response 用来扩展req和res的
// view 模板引擎
// util工具方法