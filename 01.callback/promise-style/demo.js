/*
 ** Promise基本综述
 */

// Promise只是解决异步流程化的一种手段
// Promise是一个构造函数 需要new
// Promise的参数是一个执行器 excutor，传入两个参数，resolve和reject
// excutor在new的时候调用

// excutor是同步执行的

// then有两个参数，resolve和reject，then是异步的

// then的第二个参数或者catch

let promise = new Promise((resolve, reject) => {
  console.log('BeforeResolve');
  resolve('成功1');
  console.log('AfterResolve');
});

promise
  .then(
    (res) => {
      console.log('Then');
      console.log(res);
    },
    (err) => {
      console.log('then-error', err);
    }
  )
  .catch((err) => {
    console.log('catch-error', err);
  });

console.log('Global');

// 结果 ==>
// BeforeResolve
// AfterResolve
// Global
// Then
// 成功
