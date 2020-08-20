// npm i node-fetch -S

// 使用函数时候 逃离 回调函数的 形式

const fetch = require('node-fetch');

function getData() {
  return fetch('http://study.jsplusplus.com/xiaomi/getXiaomiDatas?phone=true')
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

// await是一个操作符，等待一个Promise对象产出结果的操作手段，不等待就是pending状态
// 功能是暂停async函数的执行，等待promise处理后的结果
// 如果结果是rejected状态，会抛出异常
// async函数是通过一个隐式的Promise返回pending的状态
// async的意思是当前这个异步函数与同一作用域下的程序是异步的关系

async function logData() {
  const data = await getData();
  console.log(data);
}

logData();

console.log('Global'); // 先打印Global后打印logData的数据

// // 还是回调
// getData().then((res) => {
//   console.log(res);
// });
