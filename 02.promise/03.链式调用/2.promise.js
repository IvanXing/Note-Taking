let fs = require('fs');
let Promise = require('./promise'); // 引入自己的promise

// 调用 p1.resolve(100) 传递到=> p1.then(data) 中，data就是100
//      p2.resolve(1)   1传到p2 =>  p2.then(data)
let p1 = new Promise((resolve, reject) => {
    resolve(100);
    // reject(200);
})
let p2 = p1.then((data) => {
    return 1000
}, err => {
    return 2000
})
p2.then((data) => {
    console.log(data, '*****');
}, err => {

})