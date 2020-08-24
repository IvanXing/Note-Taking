const Promise = require('./promise');

let p = new Promise((resolve, reject) => {
    resolve(1);
});

let promise2 = p.then(data => {
    reject('123')
});
promise2.then((data) => {
    console.log('成功', data)
}, err => {
    console.log('fail', err); 
})


/*
** promise2 返回了一个 promise2 没有调用成功或者失败，会自己等自己完成
** 规范规定报错 类型错误 TypeError: Chaining cycle detected for promise #<Promise>
*/

// let promise2 = p.then(data => {
//     return promise2
// });
// promise2.then((data) => {
//     console.log('成功', data)
// }, err => {
//     console.log('fail', err); // TypeError: Chaining cycle detected for promise #<Promise>
// })

