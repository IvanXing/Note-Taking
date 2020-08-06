// 整合
let articleRouter = require('./articleRouter');
let userRouter = require('./userRouter');
let combineRoutes = require('koa-combine-routers');

// 自己思考咋实现的
module.exports = combineRoutes(articleRouter,userRouter)

// koa-combine-routers  => react combineReducers
