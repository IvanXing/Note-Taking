// 流：有方向的 先读出来 => 再写  
// node中实现了stream模块
// 文件也想实现流 ，所以内部文件系统继承了stream模块 

const fs = require('fs');
const path = require('path');
const ReadStream = require('./readStream');

// 创建一个可读流(可读流对象)  这个方法默认并不会读取内容
// 内部的实现原理：还是fs.open  fs.read  fs.close，进行了封装
// let rs = fs.createReadStream()
let rs = new ReadStream( path.resolve(__dirname, 'name.txt'), {
    flags: 'r', // r 代表的是读取
    encoding: null, // 默认buffer编码
    mode: 0o666, // 模式 可读可写
    autoClose: true, // fs.close，读取完毕关掉
    start: 2, // 2 - 8 读取文件位置包前又包后
    end: 8,
    highWaterMark: 3 // 每次读取的个数  3 3 1（2-8是7个，那就 3-3-1读取）
});
/*
** 为了多个异步方法可以解耦， 可以采用发布订阅模式
*/
// 可读流继承了events模块，这里的名字必须叫data  rs.emit('data')
// 如果监听了data 内部会拼命读取文件的内容 ，触发对应的回调

// Buffer.concat() 每次接收到的buffer拼接起来
let bufferArr = []

rs.on('open', (fd) => {
    console.log(fd,'文件打开事件')
})

// 读和写 先读取 =》 像文件中写入  pause()  resume()

rs.on('data', (data) => { // 默认会直到文件读取完毕

    //  rs.pause(); // 让可读流暂停触发data事件
    // // console.log('暂停')
    // setTimeout(() => {
    //     rs.resume(); // 再次触发data事件
    // }, 1000);

    console.log('触发')
    bufferArr.push(data);
});
rs.on('end', () => {
    console.log(Buffer.concat(bufferArr).toString(),'end'); // 拼接数据
});
rs.on('error', (err) => {
    console.log(err)
});
rs.on('close',()=>{
    console.log('close')
})

// on('data') on('end') pause() resume()


/*
** 文件流有两个特殊的事件 ，不是文件流 是普通的流 就没有这两个事件
*/