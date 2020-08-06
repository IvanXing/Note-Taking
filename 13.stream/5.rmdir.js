// 异步 串行 并发
const fs = require('fs');
const path = require('path');
// 1.删除文件 fs.unlinkSync  fys.rmdirSnc  fs.readdirSync (子目录)  fs.statSync (isFile,isDirectory)  文件操作的api

// let dirs = fs.readdirSync('m')
// dirs = dirs.map(item=>path.join('m',item))
// dirs.forEach(item => {
//     let statObj = fs.statSync(item); // 获取文件的状态信息 （文件的创建时间  修改时间.. ）
//     if(statObj.isFile()){
//         fs.unlinkSync(item);
//     }else{
//         fs.rmdirSync(item);
//     }
// });
// fs.rmdirSync('m');


// 同步删除目录 先序 深度 广度 同步写法  同步阻塞
// function rmdirSync(dir) { 
//     // 1. 判断dir是不是一个目录
//     let statObj = fs.statSync(dir);
//     if (statObj.isDirectory()) {
//         let dirs = fs.readdirSync(dir); // 递归考虑两层情况
//         // dirs = dirs.map((d) =>); //a a/b  a/a.js
//         dirs.forEach(d => rmdirSync(path.join(dir, d)));
//         fs.rmdirSync(dir);
//     } else {
//         fs.unlinkSync(dir);
//     }
// }
// rmdirSync('a');

// 如何使用后续遍历 删除文件夹。 path.dirname


// 异步串行删除  把所有的异步逻辑串成一根线之下
// function rmdir(dir, cb) {
//     fs.stat(dir, (err, statObj) => { // 判断a是不是文件夹
//         if (statObj.isDirectory()) { // 如果是文件夹就读取a文件列表读取出来
//             fs.readdir(dir, (err, dirs) => {
//                 // 获取当前目录的所有的目录的集合 
//                 dirs = dirs.map(item=>path.join(dir,item));
//                 let index = 0; // 这个索引每次递归时 都会创建一个 ，代表的是当前这一层节点的索引
//                 function next(){
//                     if(index == dirs.length) return fs.rmdir(dir,cb);
//                     let current = dirs[index++];
//                     rmdir(current,next);
//                 }
//                 next();
//             })
//         } else {
//             fs.unlink(dir, cb); // 删除文件即可
//         }
//     })
// };
// rmdir('a', (err) => {
//     console.log('删除成功');
// });


function rmdir(dir, cb) {
    fs.stat(dir, (err, statObj) => { // 判断a是不是文件夹
        if (statObj.isDirectory()) { // 如果是文件夹就读取a文件列表读取出来
            fs.readdir(dir, (err, dirs) => {
                // 获取当前目录的所有的目录的集合 
                dirs = dirs.map(item => path.join(dir, item));
                if (dirs.length == 0) { // 先看有没有子目录 
                    return fs.rmdir(dir, cb); // 如果没有直接删除即可
                }
                let index = 0;
                function done() { // Promise.all
                    if (++index == dirs.length) {
                        fs.rmdir(dir, cb);
                    }
                }
                for (let i = 0; i < dirs.length; i++) { // 并发删除子目录
                    let dir = dirs[i];
                    rmdir(dir, done); // 每个删除完毕后 累加删除的数量
                }
            })
        } else {
            fs.unlink(dir, cb); // 删除文件即可
        }
    })
}
rmdir('a', () => {
    console.log('异步并发删除')
});

// 思考 使用 1.后序遍历  2.层序遍历 也可以实现

// exec('rm -rf  a')