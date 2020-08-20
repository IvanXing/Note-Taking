/*
 ** Promise all用法
 */
// 合并三个文件内部的内容为一个数组，并且按照顺序排列，如果读取一个失败，就返回失败
// Promise.all接收一个interable可迭代对象 类型的数据，可迭代对象中可以传递promise也可以不是

const fs = require('fs');

const readFile = (path, isSetError) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err || isSetError) {
        reject('出错了');
      }
      const resData = JSON.parse(data);
      resolve(resData);
    });
  });
};

// readFile('./data/user.json').then((res) => {
//   console.log('first==>', res);
// });

// readFile('./data/userCourse.json').then((res) => {
//   console.log('second==>', res);
// });

// readFile('./data/course.json').then((res) => {
//   console.log('third==>', res);
// });

// 可迭代对象 interable类型 => Array Set Map
Promise.all([
  readFile('./data/user.json'),
  readFile('./data/userCourse.json', true),
  readFile('./data/course.json'),
])
  .then((res) => {
    console.log(res);
  })

  .catch((err) => {
    console.log(err);
  });

// 用多个异步任务并发运行，等待所有任务结果完成
// iterable内部元素传递的是promise对象，如果不是promise对象，直接resolve
// iterable内部没有元素，则返回空数组
// 有一个promise是reject，则rejected，只到第一个错误

// 一个语法糖
readFile('./data/user.json')
  .then((res) => {
    console.log(res);
    return Promise.resolve('res请求成功，打印');
    // 语法糖: return new Promise((resolve, reject)=>{ resolve('成功')})
  })
  .then((res) => {
    console.log(res);
  });
