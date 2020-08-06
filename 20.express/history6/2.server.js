const express = require('./express');
const app = express();  // 调用这句方法时 不会创建路由系统，什么时候使用什么时候创建
// 路由的中间件  将处理逻辑 拆分成一个个的模块
app.put('/',function (req,res,next) {
    res.end('get ok')
})
app.delete('/',function (req,res,next) {
    res.end('get ok')
})
app.post('/',function (req,res,next) {
    res.end('get ok')
})
app.options('/',function (req,res,next) {
    res.end('get ok')
});
// app.post('/',function (req,res,next) {
//     res.end('post ok')
// });
app.listen(3000);


// 当我const app = express() 