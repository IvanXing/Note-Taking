/*
 ** Promise race用法
 */

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

// 可迭代对象 interable类型 => Array Set Map
Promise.race([
  readFile('./data/user.json'),
  readFile('./data/userCourse.json'),
  readFile('./data/course.json'),
])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// 谁先完成就返回，无论fullfilled还是rejected
// 不传参数 是pending状态
