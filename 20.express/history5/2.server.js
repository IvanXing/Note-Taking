const express = require('./express');
const app = express();
// 路由的中间件  将处理逻辑 拆分成一个个的模块
app.get('/', function(req, res, next) {
    console.log(1)
    setTimeout(() => {
        next();
        console.log('xxx')
    }, 1000);
}, function(req, res, next) {
    next();
    console.log(11)
}, function(req, res, next) {
    next();
    console.log(111);

})
app.get('/', function(req, res, next) {
    console.log('2');
    res.end('end')
})
app.listen(3000, () => {
    console.log('server start 3000');
})