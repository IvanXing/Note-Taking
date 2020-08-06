// 我希望写入10个数  只占用一个字节的内存


const fs = require('fs');
const WriteStream  = require('./writeStream');
const path = require('path');
let ws = new WriteStream(path.resolve(__dirname,'name.txt'),{
    highWaterMark:3 // 是预期 可以根据这个值来控制写入的速率
});
let index = 0;
function write() {
    let flag = true; // 标识 是否可以写入
    while (flag && index < 10) {
        flag = ws.write(index+'');
        index++;
    }
    // if(index == 10){
    //     ws.end('!!'); // 文件的关闭操作  ws.write + fs.close()
    // }
}
write();
ws.on('drain',()=>{
    console.log('drain')
    write();
});

ws.on('close',()=>{
    console.log('close')
});
