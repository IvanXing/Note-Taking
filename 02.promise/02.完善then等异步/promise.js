/*
** then中pending订阅，等resolve或者reject异步执行完成，发布
*/

const RESOLVED = 'RESOLVED'; // 成功
const REJECTED = 'REJECTED'; // 失败
const PENDING = 'PENDING'; // 等待态
class Promise {

    constructor(executor) {

        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;

        /*
        ** then的执行需要考虑promise中的异步情况, 以及可以多次分别then的情况
        */
        this.onResolvedCallbacks = []; //  专门用来存放成功的回调
        this.onRejectedCallbacks = []; // 专门用来存放失败的回调

        let resolve = (value) => {
            if(this.status === PENDING){
                this.value = value;
                this.status = RESOLVED;
                this.onResolvedCallbacks.forEach(fn=>fn());  // 执行成功才回调then中方法，执行每一个函数
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

            // this.onResolvedCallbacks.push(onFulfilled(this.value)); // 这样是立即执行，push返回值，
            // this.onResolvedCallbacks.push(onFulfilled); // 这样可以push函数，但是有加逻辑的需求，包裹函数AOP，

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
