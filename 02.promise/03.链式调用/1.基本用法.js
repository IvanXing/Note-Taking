let fs = require('fs');

// promise 可以解决 越来越宽的问题

// error first语法 错误第一语法 err在data前面
// err first 因为异步方法无法通过try、catch捕获异常，所以预留第一个位置给err

// 异步嵌套逐渐变宽
// fs.readFile('./name.txt','utf8',(err,data)=>{
//     if(err){}  // 错误处理也很麻烦
//     fs.readFile(data,'utf8',(err,data)=>{
//         if(err){}
//         console.log(data);
//     })
// });



/*
**  then用法规则
*/
// 1.promise 成功和失败的回调的返回值，可以传递到 外层的下一个then
// 2.如果返回的值是 普通值（除了错误 和 promise，都是普通值，比如数字, undefined，对象），无论是成功还是失败，只要return 普通值，都会传递到下一次成功中
// 3.出错的情况，以及throw error/data，一定会走到下一次的失败
// 4.返回promise的情况，会采用promise的状态，决定走下一次的成功还是失败
// 5.如果离自己最近的错误处理没有，会向下找

// 每次执行完promise.then方法后，返回的都是一个新的promise，这是链式调用的基础


// readFile封装成promise
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

read('./name.txt').then((data) => {

   return read(data);  // 返回一个promise，根据返回结果往下走

    //read(data); // 没有返回值，相当于return undefined，普通值，向下传递成功状态

}).then((data)=>{
    console.log('-----success-----',data);
},(err)=>{
    console.log('-----error-----',err+'错误');
    // return 100; //抛错，但是返回普通值，会向下传递成功状态
})

// 出错，没有去捕获，就报错



