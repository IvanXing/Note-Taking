/*
** 1.race的实现 
*/

const fs = require('fs').promises
const isPromise = value => typeof value.then === 'function';
Promise.race = function(promises) { 
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            let result = promises[i];
            if(isPromise(result)){
                result.then(resolve,reject)
                // data => resolve(data) 的简写
            }else{
                resolve(result);
            }
        }
    });
}
// 赛跑 谁跑的快用谁的 （多个接口 请求，我希望采用快的那个）
// 都会执行得到结果，但是只采用最快的，成功或者失败，只要最快的
Promise.race([fs.readFile('name.txt', 'utf8'), fs.readFile('age.txt', 'utf8')]).then(data => {
    console.log(data);
}).catch(err=>console.log(err));

/*
** 2.中断promise 
*/

// 中断promise  一个promise正在走向成功 3000 之后成功 ，如果超过2s 就认为失败了，放弃结果，但是还是会执行

let promise = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve('ok 成功了')
    }, 10000);
});

// 实现
const wrap = promise => {
    let abort;
    let myP = new Promise((resolve,reject)=>{
        abort = reject;
    })
    let p = Promise.race([promise,myP]);
    p.abort = abort;
    return p;
}

// 包装一下，用包装后的
let p = wrap(promise);
p.then(data=>{
    console.log(data);
},(err)=>{
    console.log(err)
})

// 2s后调用 中断
setTimeout(() => {
    p.abort('promise 超时'); // 2s还未返回，中断请求
}, 2000);

// Promise.try

// 中断promise链
Promise.resolve(100).then().then((data)=>{
     return new Promise(()=>{
         // 这个地方 什么都没写，结束
     })
}).then(data=>{
    console.log(data);
},err=>{
    console.log(err);
});

