let fs = require('fs');


// error first 错误第一语法 err在data前面
// 因为异步方法无法通过try、catch捕获异常
// promise 可以解决 越来越宽的问题

// fs.readFile('./name.txt','utf8',(err,data)=>{
//     if(err){}
//     fs.readFile(data,'utf8',(err,data)=>{
//         if(err){}
//         console.log(data);
//     })
// });


// 封装成promise
function read(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if(err)  {
                return reject(err);
            }
            resolve(data);
        })
    })
}

// 用法规则
// 1.promise 成功和失败的回调的返回值，可以传递到下一个then
// 2.如果返回的值是普通值（不是错误，不是promise，就是普通值），无论是成功还是失败，只要return 普通值，都会传递到下一次成功中
// 3.出错的情况，throw data 会走到下一次的失败
// 4.返回promise的情况，会采用promise的状态，决定走下一次的成功还是失败
// 5.如果离自己最近的错误处理没有，会向下找

// 每次执行完promise.then方法后，返回的都是一个新的promise，这是链式调用的基础

read('./name.txt').then((data) => {

   return read(data);  // 返回一个promise

//    read(data);
//    return undefined;  有问题，read(data)异步没执行完，就返回了普通值undeined

}).then((data)=>{
    console.log('-----success-----',data);
},err=>{
    console.log('-----error-----',err+'错误');
})



