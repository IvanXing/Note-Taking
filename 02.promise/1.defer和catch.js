const fs = require('fs');
const Promise = require('./promise');

/*
** 1. 引入promise是为了解决嵌套，现在还是直接套了一个Promise
*/
function read1(filename) {
    return new Promise((resolve, reject)=> {
        fs.readFile(filename, 'utf8', (err, data)=> {
            if(err) reject(err);
            resolve(data);
        })
    })
}

/*
** 2. 用defer延迟对象，解决嵌套
*/
function read2(filename) {
    let dfd = Promise.defer();
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err)  dfd.reject(err);
        dfd.resolve(data);
    })
    return dfd.promise
}

// 调用read
fs.read('./name.txt').then(data=>{
    return fread(data)
}).then((data)=>{
    console.log(data);
}).catch(err=>{
    console.log(err,'---');
})

// catch实现
new Promise((resolve,reject)=>{
    reject(1)
}).then((data)=>{
    console.log(data);
}).catch(err=>{
    console.log(err,'---');
})
