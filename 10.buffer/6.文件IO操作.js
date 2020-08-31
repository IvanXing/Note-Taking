/*
** 文件系统中内置了操作文件的方法（精确的读取文件中的部分内容）
*/

const fs = require('fs');

// i/o操作 => 输入 和 输出 
// 读取 输入还是输出？  
// 读取 把内容写入到内存中
// 写入 把内容取出来，读取出来 

/*
** 先读取三个到内存中，一共9个
*/ 

// 读操作
const buffer = Buffer.alloc(3);
// flags参数：r读取  w写入  a追加文件
fs.open('./name.txt', 'r', function(err, fd) { // fd类型是number， file descriptor 文件描述器
    // buffer的第0个位置开始写入 写入到buffer中3个，文件的读取位置是多少
    fs.read(fd, buffer, 0, 3, 0,function (err, bytesRead) { // bytesRead真正的读取个数
        console.log(bytesRead, buffer)  // 关闭文件
    })
})

// 写操作
const wBuffer = Buffer.from('珠峰架构') 

// d  r(4) w(2) x(1)   (当前所属人)  r-x(我家里的人)  r-x（别人有什么权限）
// d是文件夹 r读取 w写 x可执行
// mode权限 chmod  -R  777 最大权限 777是一个八进制   每一个7都是可读可写可执行
// 438是权限 可读可写

fs.open('./age.txt', 'w', 438, function (err, fd) {
    // fd是当前文件描述符
    // 0代表就是从buffer0的位置开始读取 ，读取6个 写入到文件的哪个位置中
    fs.write(fd, wBuffer, 0, 12, 0,function (err, written) {
        if(err){
            console.log(err)
        }
        console.log('成功');
    })
})

// w 表示的是写入 默认会先清空在写入

// 通过这个open 方法和fs.read 和fs.write 实现一个拷贝的功能如何实现？
// 解耦 发布订阅
