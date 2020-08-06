// 通过fs模块想实现拷贝功能 
// 同步的拷贝 

const fs = require('fs');

// 读取默认不指定编码都是buffer类型
// let r = fs.readFileSync('./name.txt');
// 默认会将二进制转化成字符串写到文件中  虽然看到的是字符串但是 内部存储的都是二进制
// fs.writeFileSync('./age.txt',r);

// 不会阻塞主线程 node是单线程的吗？ libuv  内部工作原理是多线程的
// fs.readFile('./name.txt',function (err,data) {
//     if(err){
//         return console.log(err);
//     }
//     fs.writeFile('./age.txt',data,function (err,data) {
//         console.log('写入成功')
//     });
// })

// copyFile 会默认把药拷贝的文件“整个”读取一遍 。特点不能读取比内存大的文件 （会占用很多可用内存） stream  边读边写 （采用 分块读取写入的方式 来实现拷贝）