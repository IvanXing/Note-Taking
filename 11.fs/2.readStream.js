// 流 有方向的 读 => 写  node中实现了stream模块
// 文件也想实现流 ，所以内部文件系统集成了stream模块 

const fs = require('fs');
const path = require('path');
const ReadStream = require('./readStream');
// 创建一个可读流(可读流对象)  这个方法默认并不会读取内容
// fs.open  fs.read  fs.close
let rs = new ReadStream(path.resolve(__dirname, 'name.txt'), {
    flags: 'r', // r代表的是读取
    encoding: null, // 默认buffer
    mode: 0o666, // 模式 可读可写
    autoClose: true, // fs.close
    start: 2, // 2 - 8 包前又包后
    end: 8,
    highWaterMark: 3 // 每次读取的个数  3 3 1
});
// 为了多个异步方法可以解耦， 发布订阅模式
// 可读流继承了events模块，这里的名字必须叫data  rs.emit('data'), 如果监听了data 内部会拼命读取文件的内容 ，触发对应的回调

// Buffer.concat()
let bufferArr = []
rs.on('open', (fd) => {
    console.log(fd,'---')
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
    console.log(Buffer.concat(bufferArr).toString(),'end');
});
rs.on('error', (err) => {
    console.log(err)
});
rs.on('close',()=>{
    console.log('close')
})
// on('data') on('end') pause() resume()
// 文件流有两个特殊的事件 ，不是文件流 是普通的流 就没有这两个事件