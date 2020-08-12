// promise就是一个类 
// 1.promise 有三个状态： 成功态（resolve） 失败态（reject） 等待态（pending） (又不成功又不失败)
// 2.用户自己决定失败的原因和成功的原因  成功和失败的条件也是用户定义的
// 3.promise 默认执行器（executor）时立即执行
// 4.promise的实例都拥有一个then方法 , 一个参数是成功的回调，另一个失败的回调
// 5.如果执行函数时发生了异常也会执行失败逻辑
// 6.如果promise一旦成功就不能失败 ， 反过来也是一样的 (只有等待态的时候才能去更改状态)

console.log('my');

const RESOLVED = 'RESOLVED'; // 成功
const REJECTED = 'REJECTED'; // 失败
const PENDING = 'PENDING'; // 等待态

class Promise { 

    constructor(executor) {
        this.status = PENDING;     // 当前等待态
        this.value = undefined;    // 成功的原因
        this.reason = undefined;   // 失败的原因
         
        // resolve和reject是原型方法，非实例方法，不需要this.resolve，
        // 是每创建一个promise都会提供的两个方法，执行器中执行
        // 不是promisex.then这种实例方法，写在构造器中

        let resolve = (value) => {  // 调用此方法就是成功
            if(this.status === PENDING){  // 等待态才能改变状态
                this.value = value;
                this.status = RESOLVED;
            }
        } 
        let reject = (reason) => {  // 调用失败，传入原因
            if(this.status === PENDING){
                this.reason = reason;
                this.status = REJECTED;
            }
        }

        // 捕获错误，错误也是失败逻辑
        try{
            executor(resolve, reject); //  立即执行，传入成功失败参数函数
        }catch(e){ // 错误处理 需要直接走错误逻辑
            // console.log(e);
            reject(e);
        }
    }

    then(onFulfilled, onRejected){
        if(this.status === RESOLVED){
            onFulfilled(this.value);
        }
        if(this.status === REJECTED ){
            onRejected(this.reason)
        }
    }
}
module.exports = Promise
