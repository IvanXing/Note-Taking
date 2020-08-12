// promise就是一个类 
// 1.promise 有三个状态： 成功态（resolve） 失败态（reject） 等待态（pending） (又不成功又不失败)
// 2.用户自己决定失败的原因和成功的原因  成功和失败也是用户定义的
// 3.promise 默认执行器时立即执行
// 4.promise的实例都拥有一个then方法 , 一个参数是成功的回调，另一个失败的回调
// 5.如果执行函数时发生了异常也会执行失败逻辑
// 6.如果promise一旦成功就不能失败 ， 反过来也是一样的 (只有等待态的时候才能去更改状态)
console.log('my');
const RESOLVED = 'RESOLVED'; // 成功
const REJECTED = 'REJECTED'; // 失败
const PENDING = 'PENDING'; // 等待态
class Promise {

    constructor(executor) {

        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;

        // then的执行需要考虑promise中的异步情况
        this.onResolvedCallbacks = []; //  专门用来存放成功的回调
        this.onRejectedCallbacks = []; // 专门用来存放失败的回调

        let resolve = (value) => {
            if(this.status === PENDING){
                this.value = value;
                this.status = RESOLVED;
                this.onResolvedCallbacks.forEach(fn=>fn());  // 执行成功才回调then中方法
            }
        }
        let reject = (reason) => {
            if(this.status === PENDING){
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectedCallbacks.forEach(fn=>fn()); // 执行失败回调
            }
        }

        try{
            executor(resolve,reject); 
        }catch(e){ 
            reject(e);
        }
    }

    then(onFulfilled,onRejected){
        if(this.status ===RESOLVED){
            onFulfilled(this.value);
        }
        if(this.status ===REJECTED ){
            onRejected(this.reason)
        }

        // 异步pending等待
        if(this.status === PENDING){
            this.onResolvedCallbacks.push(()=>{
                // AOP切片 todo...新逻辑 与 公共逻辑 切片
                onFulfilled(this.value);
            });
            this.onRejectedCallbacks.push(()=>{
                // todo...新逻辑
                onRejected(this.reason);
            });
        }
    }
}
module.exports = Promise
