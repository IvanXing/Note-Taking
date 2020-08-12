// promise 的特点以及概念
// https://promisesaplus.com/ promisea+ 规范 都通过这个规范来实现的

// promise es6 内部已经实现了。 ie以下不支持promise, 需要polyfill ==> es6-promise库

// promise 为什么会产生 ==> 解决异步问题
// 1.多个异步请求并发 （希望同步最终的结果） Promise.all
// 2.链式异步请求的问题（越来越宽） 上一个人的输出是下一个人的输入  Promise的链式调用可以解决这个问题
// 3.缺陷：还是基于回调的

// promise就是一个类 
// 1.promise 有三个状态： 成功态（resolve） 失败态（reject） 等待态（pending） (又不成功又不失败)
// 2.用户自己决定失败的原因和成功的原因，resolve('原因')  成功和失败的条件也是用户定义的
// 3.promise 默认执行器executor时立即执行，执行器就是传入的函数
// 4.promise的实例都拥有一个then方法 , 一个参数是成功的回调（成功的原因），另一个失败的回调（失败的原因）
// 5.如果执行函数时发生了异常也会执行失败逻辑
// 6.如果promise一旦成功就不能失败 ， 反过来也是一样的 (只有等待态的时候才能去更改状态)



// 01. 简单查看输出
// let promise = new Promise((resolve, reject) => {
//     // 什么都不写 打印 Promise {<pending>}
//     // resolve('成功')  // 打印 Promise {<fulfilled>: "成功"}
//     // reject('失败')  // 打印 Promise {<rejected>: "失败"}
// })
// console.log(promise)




// 02. 输出 1 2 promise执行器默认立即执行
// let promise = new Promise((resolve, reject) => {
//     console.log(1)
// })
// console.log(2)




let Promise = require('./promise')   //引入自己实现简版

let promise = new Promise((resolve, reject) => {
    // resolve('成功');
    // throw new Error('失败了')  // 如果执行函数时发生了异常也会执行失败逻辑
    //  reject('失败')
});
promise.then((data) => {
    console.log('success', data)
}, (err) => {
    console.log('faild', err)
});


