/*
**  Promise的两个静态方法（不是规范里的）
*/

// Promise.resolve(); // 快速创建一个成功的promise
// Promise.reject(); // 快速的创建一个失败的promise
// 区别在于 resolve会等待里面的promise执行完毕（resolve加判断实现） reject 不会有等待效果

// 用法
let Promise = require('./promise')
Promise.resolve(new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve('ok');
    }, 1000);
})).then(data=>{
    console.log(data)
})

/*
** finally,不管前面是成功还是失败，都执行
** finally也可以返回promise
*/

// finally表示不是最终的意思 而是无论如何都会执行的意思
// 如果返回一个promise 会等待这个promise 也执行完毕，（如果是失败的promise 会用他的失败原因传给下一个人）
/*
** 实现
*/
Promise.prototype.finally = function (callback) {
    return this.then((value)=>{
        return Promise.resolve(callback()).then(()=>value)  // then里返回一个promise，就会等待直到普通值
    },(reason)=>{
        return Promise.resolve(callback()).then(()=>{throw reason})
    })  
}
// 用法
Promise.resolve(456).finally(()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve()
        }, 3000);
    })
}).then(data=>{
    console.log(data,'success')
}).catch(err=>{
    console.log(err,'error')
})