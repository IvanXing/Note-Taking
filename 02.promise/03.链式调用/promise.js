/*
** 拿到p1的返回结果，根据结果 操作p2，抽离方法处理 x 是promise or 普通值
*/

const RESOLVED = "RESOLVED"; // 成功
const REJECTED = "REJECTED"; // 失败
const PENDING = "PENDING"; // 等待态

/*
** 解析promise，处理promise2 x的关系
** 注意 promise2 不存在，调用时异步生成，加定时器
** 外部try catch无法捕获异步代码，因为捕获时，异步代码还未执行完，在异步代码自身加 try catch
*/
const resolvePromise = (promise2, x, resolve, reject) => {
  console.log(promise2, x, resolve, reject);
};

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = []; //  专门用来存放成功的回调
    this.onRejectedCallbacks = []; // 专门用来存放失败的回调
    let resolve = (value) => {
      // 调用此方法就是成功
      if (this.status === PENDING) {
        this.value = value;
        this.status = RESOLVED;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject); // 立即执行
    } catch (e) {
      // 错误处理 需要直接走错误逻辑
      reject(e);
    }
  }

  // 1. promise 成功和失败的回调的返回值 可以传递到外层的下一个then
  // 2. 如果返回的是普通值的话 (传递到下一次的成功中,不是错误不是promise就是普通值) ，出错的情况(一定会走到下一次的失败),可能还要promise的情况(会采用promise的状态，决定走下一次的成功还是失败 )
  // 3.错误处理 如果离自己最近的then 没有错误处理(没有写错误函数) 会向下找
  // 4. 每次执行完promise.then方法后返回的都是一个“新的promise" (promisey一旦成功或者失败就不能修改状态)

  then(onFulfilled, onRejected) {

    /* 
    ** 每次then都返回promise => 递归 promise2
    ** promise2 是 new的过程中 生成的，但是过程中还用到了promise2
    ** 加定时器，可以new完之后再执行 => 前端事件环
    */
    let promise2 = new Promise((resolve, reject) => {

      if (this.status === RESOLVED) {
        // 定时器的作用是等待promise2 new完之后，才存在，否则undefined，传递入resolvePromise是undefined
        // 外部try catch无法捕获 未执行完的异步方法，try catch放自身部分中
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            /*
            ** 1. 普通值处理 直接 resolve(x)
            ** resolve(x)
            ** 2. 但是，x可能是一个proimise
            ** 决定promise2成功还是失败的是x，用x去决定下一个then的成功或者失败
            ** 传入promise2的resolve（成功）以及reject（失败）
            */
            //抽离 x非普通值 解析promise
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e); // 捕获 异步代码中 的错误
          }
        }, 0);
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);  // 上一个的失败返回普通值，也是传入下一个成功
            // resolve(x)
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
              // resolve(x)
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
              // resolve(x)
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
module.exports = Promise;
