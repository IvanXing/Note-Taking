const fs = require('fs');
const path = require('path');


// 写的操作 没有文件会自动创建，文件中如果已经有内容 会清空文件
const copy = (source, target, callback) => {
    const SIZE = 3;
    const buffer = Buffer.alloc(SIZE);
    let readOffset = 0;
    let writeOffset = 0;
    fs.open(source, 'r', (err, rfd) => { // fd 这个文件描述符是一个数字 linux 规定的  windows 3,mac
        if (err) return callback(err);
        // w 默认就覆盖 writeFile
        fs.open(target,'a',(err,wfd)=>{ // wfd 是写文件的描述符 
            if(err) return callback(err);
            // 读和写的操作 都耦合在一起了 实现一个方法 可用一行搞定 pipe
            const next = () =>{
                fs.read(rfd,buffer,0,SIZE,readOffset,(err,bytesRead)=>{ // bytesRead 读取到的个数
                    // 读取到几个就往文件中写几个
                    if (err) return callback(err);
                    readOffset += bytesRead; // 更改读取的偏移量
                    fs.write(wfd,buffer,0,bytesRead,writeOffset,(err,written)=>{
                        if (err) return callback(err);
                        writeOffset += written// 更改写入的的偏移量
                        if(bytesRead == SIZE){ // 本次读取完毕后 可能还有结果
                            next();
                        }else{
                            fs.close(rfd,()=>{});
                            fs.close(wfd,()=>{});
                            callback(); // 完成后
                        }
                    })
                })
            }
            next();
        })
    });
}
// 不会淹没系统的可用内存 ，合理读写 （边读边写如的方式）
copy(path.resolve(__dirname, 'name.txt'), path.resolve(__dirname, 'copy.txt'), (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('拷贝成功')
})