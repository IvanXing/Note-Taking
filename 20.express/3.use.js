const express = require('./express');
const app = express();
// 中间件的特点 ，可以决定是否向下执行 ， 可以扩展属性和方法， 可以权限校验, 中间的放置位置在路由之前
// 1.路径为 / 表示任何路径都能匹配到
// 2.如果以这个路径(配开头一段路径)也可以匹配到
// 3.和路由的路径完全一样，也可以匹配到

// 中间件不具备方法 (只针对路径拦截)，也不具备传递多个参数
// 中间件 肯定得基于路径来做 （扩展属性，扩展方法）

app.use((req, res, next) => { // 路径参数默认为/ 路径
    console.log(1)
    // 执行某一步出错了，统一规定 调用next传递的参数就是错误信息
    next('error');
})
app.use((req, res, next) => { // 路径参数默认为/ 路径
    console.log(2);
    next();
})
app.use((req, res, next) => { // 路径参数默认为/ 路径
    console.log(3);
    next();
})
app.get('/', (req, res, next) => {
    console.log(4);
    next();
}, (req, res, next) => {
    res.end('出错了 *** ')
})
app.use((err,req,res,next)=>{ // 错误处理中间件，里面必须要有四个参数(取函数的长度)
   next();
})




// app.post('/', (req, res, next) => {
//     res.end('ok')
// })

app.listen(3000);

