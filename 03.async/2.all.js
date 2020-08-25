// promise 可以解决的问题 
// 1.回调嵌套的问题 .then.then，把嵌套扁平化
// 2.可以同步多个异步请求的结果，多个异步并发

// 之前实现all的思路
// after函数，每次一个请求返回+1，都返回再去读，但是不知道是谁先完成的

/*
** all的实现
*/

// 异步 
// 1.并发（使用for循环迭代执行），for是同步的，会立即都执行
// 2.串行（借助回调 第一个完成后调用第二个）,第二个依赖第一个的结果

// 用来判断传入参数是不是promise，是promise再执行，普通值直接返回
// 看看值有没有then方法，普通值.then的结果是undefined
const isPromise = value => typeof value.then === 'function';

// all是全部成功才成功，有一个失败就失败了，有失败的没法拿到结果，但是会执行

// promises 参数 是promise 或者 普通值都可以
Promise.all = function(promises) { 
    return new Promise((resolve, reject) => {

        let arr = [];
        let index = 0;
        // 根据传入索引，重组数据
        const processData = (key, data) => {
            arr[key] = data; // 不能使用数组的长度来计算，一个空数组，给第100项赋值，a[99] = 1,长度100，前99项空的
            // index索引 验证长度，全部成功才成功
            if(++index === promises.length){
                resolve(arr);
            }
        }
        // 遍历数组 依次拿到每个参数的执行结果
        // for 是同步的，会立即都执行
        for (let i = 0; i < promises.length; i++) {
            let result = promises[i];
            if (isPromise(result)) {
                result.then((data) => {
                    processData(i, data)  // 但是返回值必须根据传入顺序，不根据异步返回顺序返回，根据传入索引i重组数据
                }, reject)
                // err => reject(err) reject本身就是一个函数，直接写
            } else {
                processData(i, result) // 普通值
            }
        }
    }); 
}

// promise缺陷：
// 默认无法中断，只是不采用返回的结果， 有一个失败了，不采用结果，但是后面的会执行
Promise.all([1, 2, fs.readFile('name1.txt', 'utf8'), fs.readFile('age.txt', 'utf8'), 1]).then(data => {
    console.log(data);
}).catch(err=>console.log(err))