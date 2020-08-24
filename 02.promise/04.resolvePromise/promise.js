
const RESOLVED = 'RESOLVED'; // 成功
const REJECTED = 'REJECTED'; // 失败
const PENDING = 'PENDING'; // 等待态

/*
** resolvePromise 所有的promise都要兼容 bluebird库 q库 es6-promise库，库之间可以相互调用
*/
const resolvePromise = (promise2, x, resolve, reject) => {

    /*
    **  1.循环引用 自己等待自己完成 错误的实现，没有调用成功失败，一直pending
    **    规范规定报类型错误，用一个类型错误 结束掉promise
    */ 
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }

    // 后续的条件要严格判断 保证代码能和别的库一起使用
    // called的作用是在下方判断，成功或者失败只能走一个，初始化定义为undefined
    let called;
    /* 
    ** 规范规定：对象和函数才有可能是一个promise
    ** 否则是普通值，直接成功
    ** null也是一个对象，排除此种 typeof null
    */
    if ((typeof x === 'object' && x != null) || typeof x === 'function') { 
        // 函数也不一定是promise，要继续判断
        try {  // 取值可能会报错，捕获异常，看最下面例子
            let then = x.then; // 规范：let then be x.then
            if (typeof then === 'function') { // 只能认为是一个promise了
                // 不要写成x.then（x调用then，then的this就是x）  直接then.call就可以了 因为x.then 会再次取值，兼容别人写的promise不一定
                // x传this，y是成功参数，e失败参数
                // 根据promise的状态决定是成功y还是失败e
                // 根据 called 判断只能走一个
                then.call(x, y => { 
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject); // 递归解析的过程
                }, e => {
                    if (called) return;
                    called = true;
                    reject(e); // 只要失败就失败
                });
            } else { 
                // {then:'23'} 普通对象，普通值，直接resolve，不是函数
                resolve(x);
            }
        } catch (e) { 
            if (called) return; // called防止失败了再次进入成功
            called = true;
            reject(e); // 取值出错
        }
    } else {
        // 不是函数，或者对象，那就是普通值，直接成功
        resolve(x);
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = []; //  专门用来存放成功的回调
        this.onRejectedCallbacks = []; // 专门用来存放失败的回调
        let resolve = (value) => { // 调用此方法就是成功
            if (this.status === PENDING) {
                this.value = value;
                this.status = RESOLVED;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }
        try {
            executor(resolve, reject); // 立即执行
        } catch (e) { // 错误处理 需要直接走错误逻辑
            reject(e);
        }
    }

    // 1. promise 成功和失败的回调的返回值 可以传递到外层的下一个then
    // 2. 如果返回的是普通值的话 (传递到下一次的成功中,不是错误不是promise就是普通值) ，出错的情况(一定会走到下一次的失败),可能还要promise的情况(会采用promise的状态，决定走下一次的成功还是失败 )
    // 3.错误处理 如果离自己最近的then 没有错误处理(没有写错误函数) 会向下找
    // 4. 每次执行完promise.then方法后返回的都是一个“新的promise" (promisey一旦成功或者失败就不能修改状态)
    then(onFulfilled, onRejected) {

        /*
        ** 成功失败可选参数，值穿透的处理
        */
        // onFulfilled是不是函数，不是的话，穿透值，传入v返回v  (v)=>{return v}
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };

        let promise2 = new Promise((resolve, reject) => { // 为了实现链式调用
            if (this.status === RESOLVED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        // x可能是一个proimise
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    // todo...
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
                this.onRejectedCallbacks.push(() => {
                    // todo...
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            }
        });
        return promise2;
    }
}
/*
** 测试promise
*/
// promise的延迟对象
// resolve 和 reject放到一个对象中
Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd
}
// npm install promises-aplus-test -g
// 运行 promises-aplus-test promise.js 进行测试
module.exports = Promise




// 别人定义的promise，一取then时候就报错
// Object.defineProperty(x, 'then', {
//     get() {
//         throw new Error();
//     }
// })