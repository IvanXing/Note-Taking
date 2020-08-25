/*
** promisify promise化 的实现
*/

// promise 可以解决的问题 
// 1.回调嵌套的问题 .then.then   
// 2.可以同步多个异步请求的结果


// 1.把异步api fs.readFile 封装成promise
// 还是复杂，复用性不高
// 如何 将node的api 快速的转化成 promise的形式
const fs = require('fs');
function read() {
    return new Promise((resolve, reject) => {
        fs.readFile(name, 'utf8', function(err, data){
            if (err) {
                reject(err);
            }
            resolve(data);
        })
    })
}

// 2. 但是是一个实验性语法
// node提供了一个.promises方法，把fs的方法返回成promise，此时 fs.readFile() 返回promise
const fs = require('fs').promises

// 3.util也提供了一个能力, util.promisify，把方法封装成promise
const util = require('util');
let read = util.promisify(fs.readFile);
read('name.txt', 'utf8').then(data=>{console.log(data)})



// 4. promise化的实现
const fs = require('fs');

const promisify2 = (fn) => {
    return (...args) => {

    }
}

// promisify 只能转化于Node api，因为知道node api里的参数是什么
// 思路：传入一个异步方法，返回一个promise，这个返回值还可以接收参数
const promisify = fn => (...args) => new Promise((resolve, reject) => {
    fn(...args, function(err, data) {
        if (err) reject(err);
        resolve(data);
    })
});

let read = promisify(fs.readFile);
// 将node的api 快速的转化成 promise的形式

read('name.txt', 'utf8').then((data) => {
    console.log(data);
})