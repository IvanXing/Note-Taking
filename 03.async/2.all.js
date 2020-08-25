// promise 可以解决的问题 
// 1.回调嵌套的问题 .then.then，把嵌套扁平化
// 2.可以同步多个异步请求的结果，多个异步并发

const fs = require('fs').promises



// 将node的api 快速的转化成 promise的形式
const isPromise = value => typeof value.then === 'function';
Promise.all = function(promises) { // 全部成功才成功
    return new Promise((resolve, reject) => {
        // 异步 ：并发 （使用for循环迭代执行） 和 串行（借助回调 第一个完成后调用第二个）
        // 遍历数组 依次拿到执行结果
        let arr = [];
        let index = 0;
        const processData = (key, data) => {
            arr[key] = data; // 不能使用数组的长度来计算
            if(++index === promises.length){
                resolve(arr);
            }
        }
        for (let i = 0; i < promises.length; i++) {
            let result = promises[i];
            if (isPromise(result)) {
                result.then((data) => {
                    processData(i, data)
                }, reject)
            } else {
                processData(i, result)
            }
        }
    });
}
// promise 缺陷默认无法中断，只是不采用返回的结果 ， fetch api
Promise.all([fs.readFile('name1.txt', 'utf8'), fs.readFile('age.txt', 'utf8'), 1]).then(data => {
    console.log(data);
}).catch(err=>console.log(err))