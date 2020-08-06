const fs = require('fs');
const path = require('path');


// 内部也是基于Events模块，如果文件不存在会创建文件，默认会清空文件并写入

// fs.open fs.write
let ws = fs.createWriteStream(path.resolve(__dirname,'name.txt'),{
    flags:'w',
    encoding:'utf8',
    mode:0o666,
    autoClose:true,
    start:0,
    highWaterMark:3 // （预期占用的内存） 16k (指代的不是每次写多少) 不会影响内容的写入
    // 达到或者超过预期后返回的值就是false
});
// 写入的内容必须是string or buffer
// 内部会维护一个变量，这个变量会统计写入的个数，当达到highWaterMark时 会返回false，内容写入后，会在统计的数量的基础上减少，
let flag = ws.write('h');
flag =  ws.write('e');
// drain 触发的条件是 1. 必须达到预期或者过预期 2，内存中的内容全部清空后会触发drain事件
ws.on('drain',()=>{
    console.log('drain')
})


// ws.end('!!!',()=>{
//     console.log('成功3')
// });



// ws.write 写入的内容 
// ws.end 可以关闭文件
// ws.on('drain',()=>{});

// ws.open();
// ws.close();
